import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useI18n } from 'vue-i18n';

import { Parts, Option, Dependency, DependencyType } from '@/models/Parts';

import { getAllParts } from '@/webservices/bikeParts/BikePartsWebservice';

export const usePartsStore = defineStore('parts', () => {
  const partsData = ref<Parts>([]);
  const selectedOptions = ref<Record<string, Record<string, Option>>>({});
  const selectedOptionKeys = ref(new Set<string>());

  const totalPrice = computed(() => {
    return Object.values(selectedOptions.value).reduce(
      (partTotal, characteristics) => {
        const characteristicTotal = Object.values(characteristics).reduce(
          (charTotal, option) => {
            return charTotal + getOptionPrice(option);
          },
          0
        );
        return partTotal + characteristicTotal;
      },
      0
    );
  });

  const { t } = useI18n();

  /**
   * Asynchronously retrieves all parts and updates the partsData store.
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the parts data has been successfully retrieved and updated.
   * @throws Will log an error to the console if the retrieval fails.
   */
  const getParts = async (): Promise<void> => {
    try {
      const response: Parts = await getAllParts();
      partsData.value = response;
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Selects an option for a given part and characteristic.
   *
   * @param partId - The ID of the part for which the option is being selected.
   * @param characteristicId - The ID of the characteristic for which the option is being selected.
   * @param option - The option to be selected.
   */
  function selectOption(
    partId: string,
    characteristicId: string,
    option: Option
  ) {
    if (!isOptionSelectable(option)) return;

    // Remove previous selection for this characteristic
    const previousOption = selectedOptions.value[partId]?.[characteristicId];
    if (previousOption) {
      const previousKey = `${characteristicId}_${previousOption.id}`;
      selectedOptionKeys.value.delete(previousKey);
    }

    // Update selected options
    if (!selectedOptions.value[partId]) {
      selectedOptions.value[partId] = {};
    }
    selectedOptions.value[partId][characteristicId] = option;
    selectedOptionKeys.value.add(`${characteristicId}_${option.id}`);

    // Re-evaluate selections
    removeIncompatibleSelections();
  }

  /**
   * Checks if a specific option is selected for a given part and characteristic.
   *
   * @param partId - The ID of the part.
   * @param characteristicId - The ID of the characteristic.
   * @param optionId - The ID of the option to check.
   * @returns `true` if the option is selected, otherwise `false`.
   */
  function isOptionSelected(
    partId: string,
    characteristicId: string,
    optionId: string
  ) {
    return selectedOptions.value[partId]?.[characteristicId]?.id === optionId;
  }

  /**
   * Determines if a given option is selectable based on its stock and dependencies.
   *
   * @param {Option} option - The option to check for selectability.
   * @returns {boolean} - Returns `true` if the option is selectable, otherwise `false`.
   */
  function isOptionSelectable(option: Option): boolean {
    if (option.stock === 0) return false;

    return option.dependencies.every(dependency => {
      const isSelected = isDependencySelected(dependency);
      if (dependency.type === DependencyType.Requires) {
        return isSelected;
      } else if (dependency.type === DependencyType.Excludes) {
        return !isSelected;
      }
      return true;
    });
  }

  /**
   * Checks if a given dependency is selected.
   *
   * @param {Dependency} dependency - The dependency to check.
   * @returns {boolean} - Returns `true` if the dependency is selected, otherwise `false`.
   */
  function isDependencySelected(dependency: Dependency): boolean {
    return selectedOptionKeys.value.has(
      `${dependency.characteristicId}_${dependency.optionId}`
    );
  }

  /**
   * Calculates the total price of an option based on its base price and additional price rules.
   *
   * @param {Option} option - The option for which the price is being calculated.
   *                          It contains a base price and an array of price rules.
   * @returns {number} - The total price of the option after applying all applicable price rules.
   */
  function getOptionPrice(option: Option): number {
    let price = option.basePrice;

    option.prices.forEach(priceRule => {
      const dependenciesMet =
        priceRule.dependencies.every(isDependencySelected);
      if (dependenciesMet) {
        price += priceRule.price;
      }
    });

    return price;
  }

  /**
   * Retrieves the base price of a given option.
   *
   * @param option - The option object containing the base price.
   * @returns The base price of the option.
   */
  function getOptionBasePrice(option: Option): number {
    const price = option.basePrice;

    return price;
  }

  // Helper functions
  function getPartName(partId: string): string {
    const part = partsData.value.find(p => p.id === partId);
    return part?.name || '';
  }

  /**
   * Retrieves the name of a characteristic for a given part.
   *
   * @param partId - The unique identifier of the part.
   * @param characteristicId - The unique identifier of the characteristic.
   * @returns The name of the characteristic if found, otherwise an empty string.
   */
  function getCharacteristicName(
    partId: string,
    characteristicId: string
  ): string {
    const part = partsData.value.find(p => p.id === partId);
    const characteristic = part?.characteristics.find(
      char => char.id === characteristicId
    );
    return characteristic?.name || '';
  }

  /**
   * Removes incompatible selections from the selected options.
   * @returns {void}
   */
  function removeIncompatibleSelections() {
    for (const [partId, characteristics] of Object.entries(
      selectedOptions.value
    )) {
      for (const [characteristicId, option] of Object.entries(
        characteristics
      )) {
        if (!isOptionSelectable(option)) {
          // Remove from selectedOptionKeys
          selectedOptionKeys.value.delete(`${characteristicId}_${option.id}`);
          // Remove from selectedOptions
          delete selectedOptions.value[partId][characteristicId];
        }
      }
    }
  }

  /**
   * Determines the reason why an option is unselectable.
   *
   * @param {Option} option - The option to evaluate.
   * @returns {string} - A string describing the reason the option is unselectable, or an empty string if it is selectable.
   */
  function getOptionUnselectableReason(option: Option): string {
    if (option.stock === 0) return t('views.home.titles.outStock');

    for (const dependency of option.dependencies) {
      const isSelected = isDependencySelected(dependency);
      const relatedOption = getOptionByIds(
        dependency.characteristicId,
        dependency.optionId
      );
      const relatedOptionValue = relatedOption?.value || dependency.optionId;

      if (dependency.type === DependencyType.Requires && !isSelected) {
        return `${t('views.home.titles.requires')} ${relatedOptionValue}`;
      }
      if (dependency.type === DependencyType.Excludes && isSelected) {
        return `${t('views.home.titles.incompatible')} ${relatedOptionValue}`;
      }
    }

    return '';
  }

  /**
   * Retrieves an option by its characteristic ID and option ID.
   *
   * @param characteristicId - The ID of the characteristic to search for.
   * @param optionId - The ID of the option to search for within the characteristic.
   * @returns The option object if found, otherwise `null`.
   */
  function getOptionByIds(
    characteristicId: string,
    optionId: string
  ): Option | null {
    for (const part of partsData.value) {
      const characteristic = part.characteristics.find(
        c => c.id === characteristicId
      );
      const option = characteristic?.options.find(o => o.id === optionId);
      if (option) return option;
    }
    return null;
  }

  return {
    partsData,
    totalPrice,
    selectedOptions,
    selectedOptionKeys,
    getParts,
    getPartName,
    selectOption,
    getOptionPrice,
    isOptionSelected,
    isOptionSelectable,
    getOptionBasePrice,
    getCharacteristicName,
    getOptionUnselectableReason,
  };
});
