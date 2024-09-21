<template>
  <div>
    <cards-layout :class="optionClasses" @click="handleOptionClick">
      <p>
        {{ option.value }}
      </p>
      <p>
        {{ $t('views.home.titles.price') }} {{ optionPrice }}
        {{ $t('common.currency.eur.symbol') }}
      </p>
      <span v-if="!isSelectable" class="tooltip">
        {{ unselectableReason }}
      </span>
    </cards-layout>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';

import { usePartsStore } from '@/stores/parts';

import { Option } from '@/models/Parts';

import CardsLayout from '@/components/common/layouts/CardsLayout.vue';

const props = defineProps<{
  partId: string;
  characteristicId: string;
  option: Option;
}>();

const partsStore = usePartsStore();

const isSelected = computed(() =>
  partsStore.isOptionSelected(
    props.partId,
    props.characteristicId,
    props.option.id
  )
);

const isSelectable = computed(() =>
  partsStore.isOptionSelectable(props.option)
);

const optionPrice = computed(() => partsStore.getOptionPrice(props.option));

const optionClasses = computed(() => ({
  'is-disabled': !isSelectable.value,
  'is-selectable': isSelectable.value,
  'is-selected': isSelected.value,
}));

const unselectableReason = computed(() =>
  partsStore.getOptionUnselectableReason(props.option)
);

// The `handleOptionClick` function is a method that is called when the user clicks on the card layout
// component. It is responsible for selecting the option associated with the card by calling the
// `selectOption` method on the `partsStore` store. The `selectOption` method takes the `partId`,
// `characteristicId`, and `option` as parameters to identify and select the specific option chosen by
// the user.
function handleOptionClick() {
  partsStore.selectOption(props.partId, props.characteristicId, props.option);
}
</script>
