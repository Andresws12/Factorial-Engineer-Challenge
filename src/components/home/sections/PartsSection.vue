<template>
  <cards-layout>
    <h3 class="title is-2">{{ $t('views.home.titles.parts') }}</h3>
    <article v-for="part in partsStore.partsData" :key="part.id">
      <cards-layout>
        <h4 class="title is-3">
          {{ part.name }}
        </h4>
        <collapsible-layout>
          <template #title>
            {{ $t('views.home.titles.characteristics') }}
          </template>
          <cards-layout
            v-for="characteristic in part.characteristics"
            :key="characteristic.id"
          >
            <p class="title is-4">
              {{ characteristic.name }}
            </p>
            <collapsible-layout>
              <template #title>
                {{ $t('views.home.titles.options') }}
              </template>
              <div class="options-list">
                <cards-layout
                  v-for="option in characteristic.options"
                  :key="option.id"
                  :class="optionClasses(option, part.id, characteristic.id)"
                  @click="selectOption(part.id, characteristic.id, option)"
                >
                  <p>
                    {{ option.value }}
                    <span v-if="!isOptionSelectable(option)" class="tooltip">
                      {{ getOptionUnselectableReason(option) }}
                    </span>
                  </p>
                  <p>
                    {{ $t('views.home.titles.price') }}
                    {{ getOptionPrice(option) }}
                  </p>
                </cards-layout>
              </div>
            </collapsible-layout>
          </cards-layout>
        </collapsible-layout>
      </cards-layout>
    </article>

    <!-- Build Summary -->
    <div class="build-summary">
      <h3>Your Bike Build:</h3>
      <ul>
        <li v-for="(characteristics, partId) in selectedOptions" :key="partId">
          <strong>{{ getPartName(partId) }}:</strong>
          <ul>
            <li
              v-for="(option, characteristicId) in characteristics"
              :key="characteristicId"
            >
              {{ getCharacteristicName(partId, characteristicId) }} -
              {{ option.value }} ({{ getOptionPrice(option) }})
            </li>
          </ul>
        </li>
      </ul>
      <p>
        <strong>Total Price: {{ totalPrice }}</strong>
      </p>
    </div>
  </cards-layout>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive } from 'vue';
import { usePartsStore } from '@/stores/parts';

import CardsLayout from '@/components/common/layouts/CardsLayout.vue';
import CollapsibleLayout from '@/components/common/layouts/CollapsibleLayout.vue';

import { Option, Dependency } from '@/models/Parts';

const partsStore = usePartsStore();

// Reactive state for selected options
const selectedOptions = reactive<Record<string, Record<string, Option>>>({});
const selectedOptionKeys = reactive(new Set<string>());

function selectOption(
  partId: string,
  characteristicId: string,
  option: Option
) {
  if (!isOptionSelectable(option)) return;

  // Remove previous selection for this characteristic
  const previousOption = selectedOptions[partId]?.[characteristicId];
  if (previousOption) {
    const previousKey = `${characteristicId}_${previousOption.id}`;
    selectedOptionKeys.delete(previousKey);
  }

  // Update selected options
  selectedOptions[partId] = selectedOptions[partId] || {};
  selectedOptions[partId][characteristicId] = option;
  selectedOptionKeys.add(`${characteristicId}_${option.id}`);

  // Re-evaluate selections
  removeIncompatibleSelections();
}

function isOptionSelected(
  partId: string,
  characteristicId: string,
  optionId: string
) {
  return selectedOptions[partId]?.[characteristicId]?.id === optionId;
}

function isOptionSelectable(option: Option): boolean {
  if (option.stock === 0) return false;

  for (const dep of option.dependencies) {
    const isSelected = isDependencySelected(dep);
    if (
      (dep.type === 'requires' && !isSelected) ||
      (dep.type === 'excludes' && isSelected)
    ) {
      return false;
    }
  }

  return true;
}

function isDependencySelected(dep: Dependency): boolean {
  return selectedOptionKeys.has(`${dep.characteristicId}_${dep.optionId}`);
}

function getOptionPrice(option: Option): number {
  let price = option.basePrice;

  for (const priceRule of option.prices) {
    if (priceRule.dependencies.every(isDependencySelected)) {
      price += priceRule.price;
    }
  }

  return price;
}

const totalPrice = computed(() => {
  return Object.values(selectedOptions).reduce((partTotal, characteristics) => {
    const characteristicTotal = Object.values(characteristics).reduce(
      (charTotal, option) => {
        return charTotal + getOptionPrice(option);
      },
      0
    );
    return partTotal + characteristicTotal;
  }, 0);
});

// Helper functions
function getPartName(partId: string): string {
  const part = partsStore.partsData?.find(p => p.id === partId);
  return part?.name || '';
}

function getCharacteristicName(
  partId: string,
  characteristicId: string
): string {
  const part = partsStore.partsData?.find(p => p.id === partId);
  const characteristic = part?.characteristics.find(
    c => c.id === characteristicId
  );
  return characteristic?.name || '';
}

function removeIncompatibleSelections() {
  for (const partId in selectedOptions) {
    for (const characteristicId in selectedOptions[partId]) {
      const option = selectedOptions[partId][characteristicId];
      if (!isOptionSelectable(option)) {
        // Remove from selectedOptionKeys
        selectedOptionKeys.delete(`${characteristicId}_${option.id}`);
        // Remove from selectedOptions
        delete selectedOptions[partId][characteristicId];
      }
    }
  }
}

function getOptionUnselectableReason(option: Option): string {
  if (option.stock === 0) return 'Out of stock';

  for (const dep of option.dependencies) {
    const isSelected = isDependencySelected(dep);
    const relatedOption = getOptionByIds(dep.characteristicId, dep.optionId);
    const relatedOptionValue = relatedOption?.value || dep.optionId;

    if (dep.type === 'requires' && !isSelected) {
      return `Requires ${relatedOptionValue}`;
    }
    if (dep.type === 'excludes' && isSelected) {
      return `Incompatible with ${relatedOptionValue}`;
    }
  }

  return '';
}

function getOptionByIds(
  characteristicId: string,
  optionId: string
): Option | null {
  for (const part of partsStore.partsData || []) {
    const characteristic = part.characteristics.find(
      c => c.id === characteristicId
    );
    const option = characteristic?.options.find(o => o.id === optionId);
    if (option) return option;
  }
  return null;
}

// Computed property for option classes
function optionClasses(
  option: Option,
  partId: string,
  characteristicId: string
) {
  const selectable = isOptionSelectable(option);
  const selected = isOptionSelected(partId, characteristicId, option.id);
  return {
    'is-disabled': !selectable,
    'is-selectable': selectable,
    'is-selected': selected,
  };
}

onMounted(() => {
  partsStore.getParts();
});
</script>
