<script setup lang="ts">
definePageMeta({
  layout: false,
});
</script>

<template>
  <NuxtLayout name="authentication">
    <div class="flex flex-grow items-center justify-center">
      <div class="bg-secondary-500 rounded-sm px-5 md:px-12 py-8 md:py-14 md:min-w-[40rem] w-full md:w-fit h-full md:h-fit">
        <AppLogo class="block md:hidden text-primary-500 md:text-light"></AppLogo>

        <div class="text-2xl/tight font-semibold mt-8 md:mt-0">
          Become a vandal.<br>Write on walls or create your own!
        </div>

        <div class="grid md:grid-cols-2 gap-5 mt-12">
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

        <div class="grid md:grid-cols-2 gap-5 mt-12">
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
