<template>
  <main class="_body">
    <h1 class="text-center text-[20px] py-4">{{ title }}</h1>
    <img :src="graphic" />
    <div v-html="bodyText">
    </div>
  </main>
</template>
<style scope>
._body h2 {
  @apply py-4;
}

._body img {
  @apply mx-auto py-4 rounded-none;
}
</style>
<script setup>
import { GET_METAOBJECT } from "~/queries/getMetaobject";
import { convertSchemaToHtml } from "@thebeyondgroup/shopify-rich-text-renderer";

const { handle } = useRoute().params;
const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const content = ref([]);
const title = ref("");
const bodyText = ref("");
const graphic = ref("");
onMounted(async () => {
  try {
    const { data } = await $shopifyClient.request(GET_METAOBJECT, {
      variables: {
        handle: handle,
        type: "couture_item",
      },
    });
    content.value = data.metaobject.fields;
    title.value = content.value.find((obj) => obj.key === "title").value;
    bodyText.value = convertSchemaToHtml(content.value.find(
      (obj) => obj.key === "description"
    ).value) 
    graphic.value = content.value.find(
      (obj) => obj.key === "graphic"
    ).reference.image.src;
  } catch (error) {
    console.log(error);
    navigateTo("/couture");
  } finally {
    loading.value = false;
  }
});
</script>
