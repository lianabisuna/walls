<script setup lang="ts">
import { AxiosError } from 'axios';
import * as Yup from 'yup';


definePageMeta({
  layout: false,
});


/** FORM VALIDATION */

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


const { setErrors, isSubmitting, handleSubmit } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values: Record<any, any>) => {
  try {
    const { error, data } = await useBaseFetch('register', {
      method: 'POST',
      body: {
        first_name: values.username, // TO DO: Change to "username"
        last_name: values.username, // TO REMOVE
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
      },
    });

    console.log('data', data.value);

    // Handle error and success response
    const errorResponse = error.value?.data as ErrorResponse<any, RegisterForm>;
    const successResponse = data.value as SuccessResponse;
    
    if (successResponse?.success) {
      // Navigate to login
      navigateTo({ path: '/login' });
      return;
    }

    if (errorResponse?.error) {
      // Get errors
      const errorFields = errorResponse?.error.errors;

      // Set errors
      setErrors({
        username: errorFields?.first_name || errorFields?.last_name,
        email: errorFields?.email,
        password: errorFields?.password,
        password_confirmation: errorFields?.password_confirmation,
      });
    }
  } catch(e) {
    console.error(e);
    console.log('CATCH', e);
  }
});


/** TOGGLE PASSWORD */

const showPassword = ref(false);
const showPasswordConfirmation = ref(false);
</script>

<template>
  <NuxtLayout name="authentication">
    <div class="flex flex-grow items-center justify-center">
      <form @submit="onSubmit">
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
              :disabled="isSubmitting"
              :loading="isSubmitting"
            >
            </AppFormInput>

            <AppFormInput
              name="email"
              label="Email"
              border-color="light"
              :disabled="isSubmitting"
              :loading="isSubmitting"
            >
            </AppFormInput>
            <AppFormInput
              name="password"
              label="Password"
              border-color="light"
              :disabled="isSubmitting"
              :loading="isSubmitting"
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
              :disabled="isSubmitting"
              :loading="isSubmitting"
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
              :disabled="isSubmitting"
              :loading="isSubmitting"
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

<script lang="ts">
// Types
interface RegisterForm {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ErrorResponse<Data = {}, Errors = {}> {
  error: {
    message?: string;
    errors?: Errors;
    data?: Data;
  }
}

export interface SuccessResponse<Data = {}> {
  success: { 
    message: string; 
    data: Data;
  };
}
</script>