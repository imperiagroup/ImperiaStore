<template>
    <main class="_body">
        <h1 class="text-center text-[20px] py-4">{{ title }}</h1>
            <div class="article">
        <div v-html="bodyText"></div>
      </div>
    </main>
</template>
<style scope>
._body h2 {
  @apply py-2;
}

._body .article > div {
  @apply space-y-2
}

._body .article p {
  @apply py-2
}
._body img {
  @apply mx-auto py-4 rounded-none;
}

</style>
<script setup>
import { GET_METAOBJECT } from "~/queries/getMetaobject";
import { convertSchemaToHtml } from '@thebeyondgroup/shopify-rich-text-renderer'

const { id } = useRoute().params;
const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const content = ref([]);
const title = ref("");
const bodyText = ref("");
onMounted(async () => {
  try {
    const { data } = await $shopifyClient.request(GET_METAOBJECT, {
      variables: {
        handle: id,
        type: "custom_page",
      },
    });
    content.value = data.metaobject.fields;
    title.value = content.value.find((obj) => obj.key === "title").value;
    bodyText.value = convertSchemaToHtml( content.value.find((obj) => obj.key === "content").value)
} catch (error) {
    console.log(error);
    navigateTo("/")
} finally {
    loading.value = false;
  }
});
useSeoMeta({
  title: () => title.value,
  description: () => title.value
})
</script>
