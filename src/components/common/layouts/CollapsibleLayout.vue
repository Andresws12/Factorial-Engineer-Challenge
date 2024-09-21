<template>
  <details class="collapsible-layout">
    <summary class="collapsible-layout__title"><slot name="title" /></summary>
    <slot />
  </details>
</template>

<style lang="scss" scoped>
.collapsible-layout {
  &__title {
    cursor: pointer;
  }
}
</style>
