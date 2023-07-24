<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="authentication">
    <div class="flex flex-grow items-center justify-center">
      <div class="bg-secondary-500 rounded-sm px-12 py-14 md:min-w-[40rem]">
        <div class="text-2xl/tight font-semibold">
          Become a vandal.<br>Write on walls or create your own!
        </div>

        <div class="grid grid-cols-2 gap-5 mt-12">
          <AppFormInput
            label="Username"
            background-color="light"
          >
          </AppFormInput>
          <AppFormInput
            label="Email"
            background-color="light"
          >
          </AppFormInput>
          <AppFormInput
            label="Password"
            background-color="light"
          >
          </AppFormInput>
          <AppFormInput
            label="Confirm password"
            background-color="light"
          >
          </AppFormInput>
        </div>

        <div class="grid grid-cols-2 gap-5 mt-12">
          <!-- Register -->
          <AppButton
            color="dark"
          >
            Register
          </AppButton>

          <!-- Login -->
          <div class="flex items-center">
            <p>
              <span class="font-semibold text-dark/50">Already a vandal? </span>
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
