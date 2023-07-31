<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="authentication">
    <div class="flex flex-grow items-center justify-center">
      <div class="bg-light rounded-sm px-5 md:px-12 py-8 md:py-14 md:min-w-[26rem] w-full md:w-fit h-full md:h-fit">
        <AppLogo class="block md:hidden text-primary-500 md:text-light"></AppLogo>

        <div class="text-2xl/tight font-semibold mt-8 md:mt-0">
          Welcome back!<br>Catch up with vandals.
        </div>

        <div class="grid gap-y-7 gap-x-5 mt-12">
          <AppFormInput
            label="Username"
          >
          </AppFormInput>
          <AppFormInput
            label="Password"
          >
          </AppFormInput>
        </div>

        <div class="grid gap-5 mt-12">
          <!-- Register -->
          <AppButton
            color="secondary-500"
            tone="light"
          >
            Login
          </AppButton>

          <!-- Login -->
          <div class="flex items-center">
            <p>
              <span class="font-semibold text-dark/50">Not a vandal? </span>
              <NuxtLink
                to="/register"
                class="pb-px border-b border-dark font-semibold"
              >
                Register
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>