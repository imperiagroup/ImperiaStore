<script setup>
  defineProps({
    videoUrl: String,
  })

</script>
<template>
  <section
    class="relative h-screen flex flex-col items-center justify-center text-center text-white py-0 px-3 z-0"
  >
    <div
      class="video-docker absolute top-0 left-0 w-full min-h-full overflow-hidden"
    >
      <video
        class="min-w-full min-h-full absolute object-cover"
        :src="videoUrl"
        type="video/mp4"
        playsinline
        autoplay
        muted
        loop
      ></video>
    </div>
  </section>
</template>
