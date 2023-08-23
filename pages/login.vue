<script setup lang="ts">
import { SuccessResponse, ErrorResponse } from 'services/types';
import { UserLoginData } from 'stores/authenticationStore';
import * as Yup from 'yup';


definePageMeta({
  layout: false,
});


/** FORM VALIDATION */

const authenticationStore = useAuthenticationStore();
const { setUser } = authenticationStore;

const schema = Yup.object({
  email: Yup
    .string()
    .required('Enter your email.')
    .email('Enter a valid email.'),
  password: Yup
    .string()
    .required('Enter your password.'),
});


const { setErrors, isSubmitting, handleSubmit, meta } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values: Record<any, any>) => {
  try {
    // Run login API
    await useBaseFetch('login', {
      method: 'POST',
      body: {
        email: values.email,
        password: values.password,
      },
      onResponse({ response }) {
        const _response = response._data as SuccessResponse<UserLoginData>;

        setUser(_response.data);

        // Navigate to login
        navigateTo({ path: '/' });

        // TO DO: Add message as toast
        console.log(_response.message);
      },
      onResponseError({ response }) {
        const _response = response._data as ErrorResponse<any, LoginForm>;

        // TO DO: Add message as toast
        console.error('error', _response.message);

        // Get errors
        const errorFields = _response.errors;

        // Set errors
        setErrors({
          email: errorFields?.email,
          password: errorFields?.password,
        });
      },
    });
  } catch(e) {
    console.error(e);
  }
});


/** TOGGLE PASSWORD */

const showPassword = ref(false);
</script>

<template>
  <NuxtLayout name="authentication">
    <div class="flex flex-grow items-center justify-center">
      <form
        @submit="onSubmit"
        class="flex items-center justify-center w-full h-full md:h-fit"
        novalidate
      >
        <div class="bg-light rounded-sm px-5 md:px-10 py-8 md:py-14 md:min-w-[26rem] md:max-w-[26rem] min-w-full h-full md:h-fit">
          <AppLogo class="block md:hidden text-primary-500 md:text-light"></AppLogo>

          <div class="text-2xl/tight font-semibold mt-8 md:mt-0">
            Welcome back!<br>Catch up with vandals.
          </div>

          <div class="grid gap-y-7 gap-x-5 mt-12">

            <AppFormInput
              name="email"
              label="Email"
              :disabled="isSubmitting"
              :loading="isSubmitting"
            >
            </AppFormInput>

            <AppFormInput
              name="password"
              label="Password"
              :disabled="isSubmitting"
              :loading="isSubmitting"
              :type="showPassword?'text':'password'"
            >
              <template #append>
                <button
                  class="select-none text-xl leading-[0]"
                  @click.prevent="()=>showPassword=!showPassword"
                >
                  <ClientOnly>
                    <Icon :name="showPassword?'ph:eye':'ph:eye-closed'"></Icon>
                  </ClientOnly>
                </button>
              </template>
            </AppFormInput>
          </div>

          <div class="grid gap-5 mt-12">
            <!-- Register -->
            <AppButton
              color="secondary-500"
              tone="light"
              type="submit"
              :disabled="isSubmitting"
              :loading="isSubmitting"
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
      </form>
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
// Types
interface LoginForm {
  email: string;
  password: string;
}
</script>