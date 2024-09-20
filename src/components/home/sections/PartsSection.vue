<template>
  <cards-layout>
    <h3 class="title is-2">{{ $t('views.home.titles.parts') }}</h3>
    <article v-for="part in partsStore.partsData" :key="part.id">
      <cards-layout>
        <h4 class="title is-3">
          {{ part.name }}
        </h4>
        <p>{{ $t('views.home.titles.characteristics') }}</p>
        <cards-layout
          v-for="characteristic in part.characteristics"
          :key="characteristic.id"
        >
          <p class="title is-4">
            {{ characteristic.name }}
          </p>
          <p>{{ $t('views.home.titles.options') }}</p>
          <cards-layout
            v-for="option in characteristic.options"
            :key="option.id"
            :class="[
              { 'is-disabled': option.stock === 0 },
              { 'is-selectable': option.stock > 0 },
            ]"
          >
            <p>
              {{ option.value }}
            </p>
            <p>{{ $t('views.home.titles.prices') }} {{ option.basePrice }}</p>
          </cards-layout>
        </cards-layout>
      </cards-layout>
    </article>
  </cards-layout>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { usePartsStore } from '@/stores/parts';

import CardsLayout from '@/components/common/layouts/CardsLayout.vue';

const partsStore = usePartsStore();

onMounted(() => {
  partsStore.getParts();
});
</script>
