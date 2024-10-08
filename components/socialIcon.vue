<script setup>
import { GET_METAOBJECT } from "~/queries/getMetaobject";

const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const content = ref([]);

onMounted(async () => {
  try {
    const { data } = await $shopifyClient.request(GET_METAOBJECT, {
      variables: {
        handle: "social-icon",
        type: "social_icon",
      },
    });
    content.value = data.metaobject.fields;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});

</script>
<template>
  <div class="grid grid-flow-col gap-4 mx-auto space-x-1 md:space-x-4 px-10 md:px-48">
    <a :href="content[0]?.value">
      <icon name="fa6-brands:facebook-f" class="text-lg hover:text-gray-700" />
    </a>
    <a :href="content[1]?.value">
      <icon name="fa6-brands:instagram" class="text-lg hover:text-gray-700" />
    </a>
    <a :href="content[4]?.value">
      <icon name="fa6-brands:twitter" class="text-lg hover:text-gray-700" />
    </a>
    <a :href="content[5]?.value">
      <icon name="fa6-brands:youtube" class="text-lg hover:text-gray-700" />
    </a>
    <a :href="content[3]?.value">
      <icon name="fa6-brands:threads" class="text-lg hover:text-gray-700" />
    </a>
    <a :href="content[2]?.value">
      <icon name="fa6-brands:spotify" class="text-lg hover:text-gray-700" />
    </a>
  </div>
</template>
