<script setup lang="ts">
import { object, string } from 'yup';


definePageMeta({
  layout: false,
});


/** FORM VALIDATION */

// Schema
const schema = object({
  username: string().required(),
  email: string().required(),
  password: string().required(),
  password_confirmation: string().required(),
});

// Submission
async function handleSubmit(values: Record<any, any>) {
  console.log('submitted', values);
  // try {
  //   const { data, error, pending, status, refresh } = await useBaseFetch('register', {
  //     method: 'POST',
  //     body: {
  //       username: 'Liana',
  //       email: 'lianabisuna@gmail.com',
  //       password: 'Liana123!',
  //       password_confirmation: 'Liana123!',
  //     },
  //   });
  //   console.log('fetch:error', error.value);
  //   console.log('fetch:data', data.value);
  //   console.log('fetch:pending', pending.value);
  //   console.log('fetch:status', status.value);
  // } catch(e) {
  //   console.error(e);
  // }
};
</script>

<template>
  <NuxtLayout name="authentication">
    <div class="flex flex-grow items-center justify-center">
      <Form
        @submit="handleSubmit"
        :validation-schema="schema"
      >
        <div class="bg-secondary-500 rounded-sm px-5 md:px-12 py-8 md:py-14 md:min-w-[40rem] w-full md:w-fit h-full md:h-fit">
          <AppLogo class="block md:hidden text-primary-500 md:text-light"></AppLogo>

          <div class="text-2xl/tight font-semibold mt-8 md:mt-0">
            Become a vandal.<br>Write on walls or create your own!
          </div>

          <div class="grid md:grid-cols-2 gap-y-7 gap-x-5 mt-12">
            <AppFormInput
              name="username"
              label="Username"
              border-color="light"
            >
            </AppFormInput>

            <AppFormInput
              name="email"
              label="Email"
              border-color="light"
            >
            </AppFormInput>
            
            <AppFormInput
              name="password"
              label="Password"
              border-color="light"
            >
            </AppFormInput>
            
            <AppFormInput
              name="password_confirmation"
              label="Confirm password"
              border-color="light"
            >
            </AppFormInput>
          </div>

          <div class="grid md:grid-cols-2 gap-y-7 gap-x-5 mt-12">
            <!-- Register -->
            <AppButton
              color="dark"
              type="submit"
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
      </form>
    </div>
  </NuxtLayout>
</template>
