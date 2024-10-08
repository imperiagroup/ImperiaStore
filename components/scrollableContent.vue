<template>
  <div
    id="scrollable"
    class="my-2 pt-6 space-y-4 overflow-x-hidden overflow-y-scroll h-48 text-[10px]"
  >
    <!-- Your content will go here -->
    <slot class="article" />
    <!-- Gradient blur effect at the bottom -->
  </div>
</template>

<style>
#scrollable > div h2 {
  padding: 4px 0px;
  font-size: 12px;
}

#scrollable > div p {
  padding: 4px 0px;
}
</style>