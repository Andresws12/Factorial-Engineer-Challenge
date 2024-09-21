<template>
  <section class="section" data-cy="home-section">
    <h1 class="title is-1">
      {{ $t('common.titles.home') }}
    </h1>
    <div class="columns is-multiple">
      <div class="column is-6">
        <parts-section />
      </div>
      <div class="column is-6">
        <bike-section />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import PartsSection from '@/components/home/sections/PartsSection.vue';
import BikeSection from '@/components/home/sections/BikeSection.vue';
</script>
