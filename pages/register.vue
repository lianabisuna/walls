<script setup lang="ts">
import * as Yup from 'yup';


definePageMeta({
  layout: false,
});


/** FORM VALIDATION */

// Data
const schema = Yup.object({
  username: Yup
    .string()
    .required('Username is required.'),
  email: Yup
    .string()
    .required('Email is required.')
    .email('Enter a valid email.'),
  password: Yup
    .string()
    .required('Password is required.')
    .min(8, 'Password must be at least 8 characters.')
    .matches( /[A-Z]/, 'Password must have at least 1 uppercase letter.')
    .matches( /[a-z]/, 'Password must have at least 1 lowercase letter.')
    .matches( /[0-9]/, 'Password must have at least 1 numeric character.')
    .matches( /[*@!#%&()^~{}]/, 'Password must have at least 1 special character.'),
  password_confirmation: Yup
    .string()
    .required('Confirm password is required.')
    .oneOf([Yup.ref('password')], 'Password must match.'),
});

// Function
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


/** TOGGLE PASSWORD */

// Data
const showPassword = ref(false);
const showPasswordConfirmation = ref(false);
</script>

<template>
  <NuxtLayout name="authentication">
    <div class="flex flex-grow items-center justify-center">
      <Form
        @submit="handleSubmit"
        :validation-schema="schema"
        as=""
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
              :type="showPassword?'text':'password'"
            >
              <template #append>
                <button
                  class="select-none text-xl leading-[0]"
                  @click="showPassword = !showPassword"
                >
                  <Icon
                    :name="showPassword?'ph:eye':'ph:eye-closed'"
                  >
                  </Icon>
                </button>
              </template>
            </AppFormInput>
            
            <AppFormInput
              name="password_confirmation"
              label="Confirm password"
              border-color="light"
              :type="showPasswordConfirmation?'text':'password'"
            >
              <template #append>
                <button
                  class="select-none text-xl leading-[0]"
                  @click="showPasswordConfirmation = !showPasswordConfirmation"
                >
                  <Icon
                    :name="showPasswordConfirmation?'ph:eye':'ph:eye-closed'"
                  >
                  </Icon>
                </button>
              </template>
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
