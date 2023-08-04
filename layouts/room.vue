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
		<header class="flex items-center justify-between h-16 bg-light border-b border-neutral-200 pr-3 md:pr-5">
      <div class="flex items-center">
        <!-- Back -->
        <div class="flex justify-center w-16">
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
        </div>

        <!-- Name -->
        <div class="text-lg">General</div>
      </div>

      <!-- Action -->
      <div class="flex gap-x-px">
        <!-- Search -->
        <AppButton
          icon
          variant="text"
          tone="light"
        >
          <Icon
            name="ph:flag"
            class="h-5 w-5 text-error-500 font-semibold"
          >
          </Icon>
        </AppButton>

        <!-- Report -->
        <AppButton
          icon
          variant="text"
          tone="light"
        >
          <Icon
            name="ph:magnifying-glass"
            class="h-5 w-5 text-dark font-semibold"
          >
          </Icon>
        </AppButton>

        <!-- Pin -->
        <AppButton
          icon
          variant="text"
          tone="light"
        >
          <Icon
            name="ph:push-pin"
            class="h-5 w-5 text-dark font-semibold"
          >
          </Icon>
        </AppButton>
      </div>
    </header>

    <!-- Content -->
    <main class="flex flex-grow">
      <!-- Sidebar -->
      <aside class="hidden md:flex flex-col items-center gap-y-1.5 min-w-[4rem] bg-light border-r border-neutral-200 py-3 md:py-5">
        <AppAvatar
          v-for="member in 5"
        >
        </AppAvatar>
      </aside>
      <slot></slot>
    </main>
  </div>
</template>