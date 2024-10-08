<template>
  <main class="._body_fullwidth">
    <div class="md:grid-cols-2 grid gap-4 md:px-36 px-4 py-12">
      <div
        v-for="item in content"
        :key="item"
        class="card bg-base-100 w-full z-0 h-[400px] shadow-xl rounded-none cursor-pointer image-full"
        @click="navigateTo(`/couture/${id}/${item.handle}`)"
      >
        <figure>
          <img
            :src="item.fields[1].reference.image.src"
            :alt="item.fields[2].value"
            class="w-full h-full rounded-none"
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
        type: "couture_item",
      },
    });
    content.value = data.metaobjects.nodes;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
});
</script>
