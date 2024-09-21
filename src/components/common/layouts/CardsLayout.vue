<template>
  <div class="card m-3 custom-cards">
    <div class="card-content">
      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-cards {
  &.is-disabled {
    background: #ccc;
    opacity: 0.55;
  }

  &.is-selectable {
    cursor: pointer;
  }

  &.is-selected {
    border: 2px solid var(--bulma-primary);
  }
}
</style>
