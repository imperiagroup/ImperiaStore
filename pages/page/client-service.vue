<script setup>
import { GET_METAOBJECT } from "~/queries/getMetaobject";
import { convertSchemaToHtml } from "@thebeyondgroup/shopify-rich-text-renderer";

const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const content = ref([]);
const openTime = ref("")

onMounted(async () => {
  try {
    const { data } = await $shopifyClient.request(GET_METAOBJECT, {
      variables: {
        handle: "client-service",
        type: "client_service",
      },
    });
    content.value = data.metaobject.fields;
    openTime.value = convertSchemaToHtml(content.value[6].value)
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

useSeoMeta({
  title: "Client Services - Imperia",
})

</script>
<template>
  <div class="_body space-y-8">
    <div>
      <h2 class="text-[20px] uppercase text-center">Client Services</h2>
    </div>
    <div class="mx-auto text-center">
      <p class="uppercase font-[12px]">
        {{ content[1]?.value }}
    </p>
    </div>
    <div class="mx-auto w-full text-center space-y-4">
      <div>
        <p class="text-[12px] font-thin">{{ content[4]?.value }}</p>
        <NuxtLink
          :to="content[5]?.value"
          class="btn btn-primary text-[10px] w-full mt-4"
          >See FAQ</NuxtLink
        >
      </div>
      <div>
        <p class="text-[12px] font-thin">{{ content[0]?.value }}</p>
        <div v-html="openTime"></div>
        <NuxtLink
          :to="`tel:${content[7]?.value}`"
          class="btn btn-primary text-[10px] w-full mt-4"
          >+1 (678) 782 8404</NuxtLink
        >
      </div>
      <div class="pt-8">
        <p class="text-[12px] font-thin">{{ content[3]?.value }}</p>
        <NuxtLink
          :to="`mailto:${content[2]?.value}`"
          class="btn btn-primary text-[10px] w-full mt-4"
          >Send A Message</NuxtLink
        >
      </div>
    </div>
  </div>
</template>
