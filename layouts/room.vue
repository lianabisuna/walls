<script setup lang="ts">
const META = {
  TITLE: "Walls - Talk behind closed doors",
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
</script>

<template>
  <div class="flex flex-col min-h-screen font-inter font-medium text-dark text-sm">
    <!-- Header -->
		<header class="flex items-center justify-between h-16 bg-light border-b border-primary-200 px-3 md:px-5">
      <div class="flex items-center">
        <!-- Back -->
        <AppButton
          icon
          variant="text"
          tone="light"
        >
          <Icon
            name="ph:arrow-left"
            class="h-5 w-5 text-dark font-semibold"
          >
          </Icon>
        </AppButton>

        <!-- Name -->
        <div>General</div>
      </div>

      <!-- Action -->
      <div class="flex gap-x-5">
        <!-- Edit -->
        <AppButton
          color="secondary-500"
          tone="light"
        >
          Edit
        </AppButton>
      </div>
    </header>

    <!-- Content -->
    <main class="flex flex-grow">
      <!-- Sidebar -->
      <aside class="flex flex-col items-center gap-y-1.5 w-16 border-r border-primary-200 py-3">
        <AppAvatar
          v-for="member in 5"
        >
        </AppAvatar>
      </aside>
      <slot></slot>
    </main>
  </div>
</template>