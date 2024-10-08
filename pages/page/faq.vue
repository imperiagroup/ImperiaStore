<script setup>
import { GET_METAOBJECTS } from "~/queries/getMetaobject";
import { convertSchemaToHtml } from "@thebeyondgroup/shopify-rich-text-renderer";

const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const content = ref([]);
onMounted(async () => {
  try {
    const { data } = await $shopifyClient.request(GET_METAOBJECTS, {
      variables: {
        type: "faq",
      },
    });
    content.value = data.metaobjects.nodes;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

useSeoMeta({
  title: "FAQ - Imperia",
})
</script>
<template>
  <main class="_body space-y-12">
    <div class="text-center space-y-8">
      <h1 class="text-[20px]">FAQ</h1>
    </div>
    <div class="_accordion mx-auto my-4 text-[12px]">
      <details
        v-for="item in content"
        :key="item"
        class="collapse collapse-arrow uppercase"
      >
        <summary class="collapse-title text-[12px] font-medium">
          {{ item.fields[1].value }}
        </summary>
        <div class="collapse-content text-[12px]">
          <div v-html="convertSchemaToHtml(item.fields[0].value)"></div>
        </div>
      </details>
    </div>
  </main>
</template>
