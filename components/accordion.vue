<script setup>
import { convertSchemaToHtml } from "@thebeyondgroup/shopify-rich-text-renderer";

  defineProps({
    payment: String,
    product_sustainability: String,
    free_shipping_free_returns: String,
  })

</script>
<style scope>
.collapse-content p {
  @apply py-1;
}

.collapse-content h2 {
  @apply space-y-2
}

</style>

<template>
  <div class="_accordion px-2 z-40">
    <details class="collapse collapse-arrow uppercase">
      <summary class="collapse-title text-[12px] font-medium"> <p>PRODUCT SUSTAINABILITY</p> </summary>
      <div class="collapse-content text-[12px]"> 
        <div v-html="product_sustainability"></div>
      </div>
    </details>
    <details class="collapse collapse-arrow uppercase">
      <summary class="collapse-title text-[12px] font-medium">Free Shipping, Free Returns</summary>
      <div class="collapse-content text-[12px]"> 
          <div v-html="free_shipping_free_returns"></div>
      </div>
    </details>
    <details class="collapse collapse-arrow uppercase">
      <summary class="collapse-title text-[12px] font-medium">PAYMENT</summary>
      <div class="collapse-content text-[12px]"> 
        <div v-html="payment"></div>
      </div>
    </details>
  </div>
</template>
