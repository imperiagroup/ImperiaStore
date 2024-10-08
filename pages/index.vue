<script setup>
useSeoMeta({
  title: "Imperia",
});
import { ref } from 'vue';
import { GET_METAOBJECT } from '~/queries/getMetaobject';

// Fetch products data
const { $shopifyClient } = useNuxtApp();
const loading = ref(true);
const content = ref([]);
const videoUrl = ref("");
const lastestNewsImage = ref("");
const lastestNewsLink = ref("");
const lastestNewsTitle = ref("");
const lastestNewsButtonText = ref("");
onMounted(async () => {
  try {
    const {data} = await $shopifyClient.request(GET_METAOBJECT,{
          variables: {
            handle: "home-page",
            type: "homepage"
          }
    });
    
    content.value = data.metaobject.fields;
    videoUrl.value = content.value.find((obj) => obj.key === "hero_video").reference.sources[0].url;
    lastestNewsImage.value = content.value.find((obj) => obj.key === "feature_image").reference.image.src;
    lastestNewsTitle.value = content.value.find((obj) => obj.key === "feature_title").value;
    lastestNewsLink.value = content.value.find((obj) => obj.key === "button_link").value;
    lastestNewsButtonText.value = content.value.find((obj) => obj.key === "button_title").value;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
});

useSeoMeta({
  title: "Imperia",
  description: "Luxury Ready-to-Wear Designed in Atlanta"
})

</script>
<template>
  <main class="pb-1">
    <Hero :videoUrl="videoUrl" />
    <LatestNews :backgroundImg="lastestNewsImage" :heading="lastestNewsTitle" :link="lastestNewsLink" :text="lastestNewsButtonText"/>
    <NewArrival/>
    <Collection />
  </main>
</template>
