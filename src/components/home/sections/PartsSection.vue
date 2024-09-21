<template>
  <cards-layout>
    <h3 class="title is-2">{{ $t('views.home.titles.parts') }}</h3>
    <PartComponent
      v-for="part in partsStore.partsData"
      :key="part.id"
      :part="part"
    />
  </cards-layout>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { usePartsStore } from '@/stores/parts';

import CardsLayout from '@/components/common/layouts/CardsLayout.vue';
import PartComponent from '@/components/home/parts/PartComponent.vue';

const partsStore = usePartsStore();

onMounted(() => {
  partsStore.getParts();
});
</script>
