<script setup>
defineProps({
  labelFor: String,
  class: String,
  icon: String,
});
</script>
<template>
  <div class="drawer" :class="class">
    <input :id="labelFor" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content">
      <!-- Page content here -->
      <label :for="labelFor" class="drawer-button">
        <Icon :name="icon" class="text-2xl" />
      </label>
    </div>
    <div class="z-10 drawer-side">
      <label
        :for="labelFor"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <ul class="menu p-4 w-80 min-h-full bg-base-200 text-2xl">
        <!-- Navbar menu content here -->
        <li><a href="/collection">Shop</a></li>
        <li><a>Company</a></li>
        <li><a>Design</a></li>
        <li><a>Couture</a></li>
        <li><a>Audio</a></li>
      </ul>
    </div>
  </div>
</template>
