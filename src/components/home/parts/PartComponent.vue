<template>
  <cards-layout class="mb-3">
    <collapsible-layout>
      <template #title>
        <span class="title is-3">{{ part.name }}</span>
      </template>
      <div
        v-for="characteristic in part.characteristics"
        :key="characteristic.id"
      >
        <CharacteristicComponent
          :part-id="part.id"
          :characteristic="characteristic"
        />
      </div>
    </collapsible-layout>
  </cards-layout>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

import { Part } from '@/models/Parts';

import CollapsibleLayout from '@/components/common/layouts/CollapsibleLayout.vue';
import CardsLayout from '@/components/common/layouts/CardsLayout.vue';
import CharacteristicComponent from './CharacteristicComponent.vue';

defineProps<{ part: Part }>();
</script>
