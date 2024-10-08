<script setup>
const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
});
</script>
<style>
.swiper-pagination {
  position: initial;
  margin: 10px auto;
}

.swiper-pagination-bullet {
  background-color: #7a7474;
  border-radius: 0px;
  height: 1px;
  width: 20px;
}

.swiper-pagination-bullet-active {
  background-color: #494949 !important;
  width: 40px;
}
#swiper {
  max-height: 90vh;
  z-index: 40;
}
@media screen and (min-width: 768px) {
  .swiper-pagination {
    display: none;
  }
}

@media screen and (max-width: 768px) {
    #swiper {
      width: 100%;
      height: fit-content;
}

}
</style>
<template>
    <Swiper
      id="swiper"
      :modules="[SwiperMousewheel, SwiperPagination]"
      :edge-swipe-detection="true"
      :breakpoints="{
        768: {
          direction: 'vertical',
        },
      }"
      :loop="true"
      :pagination="{
        enabled: true,
        type: 'bullets',
        clickable: true,
      }"
      :mousewheel="{
        eventsTarget: '#swiper',
      }"
    >
      <SwiperSlide v-for="image in images" :key="image" class="">
        <img
          :src="image.src"
          class="object-cover aspect-square md:h-full md:aspect-auto"
        />
      </SwiperSlide>
    </Swiper>
</template>
  