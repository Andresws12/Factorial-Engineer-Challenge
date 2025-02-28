<template>
  <RouterView />
  <button-translation />
  <github-button />
</template>

<script lang="ts" setup>
import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
import GithubButton from '@/components/common/GithubButton.vue';
</script>

<style lang="scss" scoped>
// App styles
</style>
