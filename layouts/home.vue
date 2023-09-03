<script setup lang="ts">
const META = {
  TITLE: "Walls",
  DESCRIPTION: "A digital space where you can about anything under a pseudonym.",
  IMAGE: "https://example.com/image.png",
  URL: "https://example.com",
}

useSeoMeta({
  title: META.TITLE,
  ogTitle: META.TITLE,
  description: META.DESCRIPTION,
  ogDescription: META.DESCRIPTION,
  ogImage: META.IMAGE,
  ogUrl: META.URL,
  twitterCard: 'summary_large_image',
  twitterTitle: META.TITLE,
  twitterDescription: META.DESCRIPTION,
  twitterImage: META.IMAGE,
  keywords: "walls, freedom wall, anonymous, social media, social network, community, message, chat",
});

// Authentication Store
const userStore = useAuthenticationStore();
</script>

<template>
  <div class="flex flex-col min-h-full font-inter font-medium text-dark text-sm">
    <!-- Header -->
		<header class="flex items-center justify-between h-16 bg-primary-500 border-b border-primary-200 px-5 md:px-10">
      <!-- Logo -->
      <AppLogo></AppLogo>

      <!-- Action -->
      <div class="flex gap-x-5">
        <!-- Create -->
        <AppButton
          color="secondary-500"
          tone="light"
        >
          Create
        </AppButton>

        <!-- Profile -->
        <AppAvatar
          :hex-color="userStore.user.user.color || '#d4d4d4'"
          active
        >
        </AppAvatar>
      </div>
    </header>

    <!-- Content -->
    <main class="flex flex-grow bg-primary-500">
      <slot></slot>
    </main>
  </div>
</template>