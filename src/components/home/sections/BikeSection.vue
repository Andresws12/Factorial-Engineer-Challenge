<template>
  <cards-layout>
    <h3 class="title is-2">{{ $t('views.home.titles.bike') }}</h3>
    <ul>
      <li v-for="(characteristics, partId) in selectedOptions" :key="partId">
        <strong>{{ getPartName(partId) }}</strong>
        <ul>
          <li
            v-for="(option, characteristicId) in characteristics"
            :key="characteristicId"
          >
            {{ getCharacteristicName(partId, characteristicId) }}
            {{ getOptionPrice(option) }}
            {{ $t('common.currency.eur.symbol') }}
          </li>
        </ul>
      </li>
    </ul>
    <p>
      <strong>
        {{ $t('views.home.titles.total') }} {{ totalPrice }}
        {{ $t('common.currency.eur.symbol') }}
      </strong>
    </p>
  </cards-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import CardsLayout from '@/components/common/layouts/CardsLayout.vue';

import { usePartsStore } from '@/stores/parts';

import { Option } from '@/models/Parts';

const partsStore = usePartsStore();

const selectedOptions = computed(() => partsStore.selectedOptions);
const totalPrice = computed(() => partsStore.totalPrice);

/**
 * Retrieves the name of a bike part based on its ID.
 *
 * @param {string} partId - The unique identifier of the bike part.
 * @returns {string} - The name of the bike part.
 */
function getPartName(partId: string): string {
  return partsStore.getPartName(partId);
}

/**
 * Retrieves the name of a characteristic for a given part.
 *
 * @param {string} partId - The unique identifier of the part.
 * @param {string} characteristicId - The unique identifier of the characteristic.
 * @returns {string} - The name of the characteristic.
 */
function getCharacteristicName(
  partId: string,
  characteristicId: string
): string {
  return partsStore.getCharacteristicName(partId, characteristicId);
}

/**
 * Retrieves the price of a given option from the parts store.
 *
 * @param {Option} option - The option for which the price is to be retrieved.
 * @returns {string} - The price of the specified option.
 */
function getOptionPrice(option: Option): string {
  return `${option.value}: ${partsStore.getOptionPrice(option)}`;
}
</script>
