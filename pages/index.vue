<script setup lang="ts">
definePageMeta({
  middleware: ['authentication'],
  layout: false,
});
</script>

<template>
  <NuxtLayout name="dashboard">
    <div class="flex-grow bg-light px-5 md:px-10">
      Home
    </div>
  </NuxtLayout>
</template>
