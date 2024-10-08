<template>
  <main class="._body_fullwidth">
    <div class="md:grid-cols-2 grid gap-4 md:px-36 px-4 py-12">
      <div
        v-for="item in content"
        :key="item"
        class="card bg-base-100 w-full z-0 h-[400px] shadow-xl rounded-none cursor-pointer image-full"
        @click="navigateTo(`/design/${item.handle}`)"
      >
        <figure>
          <img
            :src="item.fields[0].reference.image.src"
            :alt="item.fields[2].value"
            class="w-full h-full"
          />
        </figure>
        <div class="card-body">
          <p class="card-title font-bold text-white m-auto text-center">
            {{ item.fields[2].value }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { GET_METAOBJECTS } from "~/queries/getMetaobject";
const { id } = useRoute().params;
const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const content = ref([]);
console.log(content.value);
onMounted(async () => {
  try {
    const { data } = await $shopifyClient.request(GET_METAOBJECTS, {
      variables: {
        type: "design",
      },
    });
    content.value = data.metaobjects.nodes;
    console.log(content.value);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  } 
});

useSeoMeta({
  title: "Design - Imperia",
})
</script>
