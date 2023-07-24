<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="authentication">
    <div class="flex flex-grow items-center justify-center">
      <div class="bg-secondary-500 rounded-sm px-10 py-12 md:min-w-[40rem]">
        <div class="text-2xl/tight font-semibold">
          Become a vandal.<br>Write on walls, or create your own!
        </div>

        <div class="grid grid-cols-2 gap-5 mt-12">
          <AppFormInput
            label="Username"
          >
          </AppFormInput>
          <AppFormInput
            label="Email"
          >
          </AppFormInput>
          <AppFormInput
            label="Password"
          >
          </AppFormInput>
          <AppFormInput
            label="Confirm password"
          >
          </AppFormInput>
        </div>

        <div class="grid grid-cols-2 gap-5 mt-10">
          <!-- Register -->
          <AppButton
            color="dark"
          >
            Register
          </AppButton>

          <!-- Login -->
          <div class="flex items-center">
            <p>
              <span class="font-semibold text-neutral-500">Already a vandal? </span>
              <NuxtLink
                to="/login"
                class="pb-px border-b border-dark font-semibold"
              >
                Login
              </NuxtLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
