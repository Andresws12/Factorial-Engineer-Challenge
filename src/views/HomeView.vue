<template>
  <section class="section" data-cy="home-section">
    <h1 class="title is-1">
      {{ $t('common.titles.home') }}
    </h1>
    <container class="container columns is-multiple">
      <parts-section class="column is-6" />
      <bike-section class="column is-6" />
    </container>
  </section>
</template>

<script lang="ts" setup>
import PartsSection from '@/components/home/sections/PartsSection.vue';
import BikeSection from '@/components/home/sections/BikeSection.vue';
</script>
