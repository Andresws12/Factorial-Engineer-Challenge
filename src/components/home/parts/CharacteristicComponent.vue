<template>
  <cards-layout class="mb-3" data-cy="home-parts-characteristic">
    <p data-cy="home-parts-characteristic-name" class="title is-4">
      {{ characteristic.name }}
    </p>
    <collapsible-layout>
      <template #title>
        <span data-cy="home-parts-characteristic-option-title">
          {{ $t('views.home.titles.options') }}
        </span>
      </template>
      <div class="options-list columns is-multiline">
        <OptionComponent
          v-for="option in characteristic.options"
          :key="option.id"
          class="column is-4"
          :option="option"
          :part-id="partId"
          :characteristic-id="characteristic.id"
        />
      </div>
    </collapsible-layout>
  </cards-layout>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

import { CharacteristicWithOptions } from '@/models/Parts';

import CollapsibleLayout from '@/components/common/layouts/CollapsibleLayout.vue';
import CardsLayout from '@/components/common/layouts/CardsLayout.vue';
import OptionComponent from './OptionComponent.vue';

defineProps<{
  partId: string;
  characteristic: CharacteristicWithOptions;
}>();
</script>
