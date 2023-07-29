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
    .required('Enter a username.')
    .min(6, 'Use 6 characters or more.')
    .max(30, 'Use no more than 30 characters.'),
  email: Yup
    .string()
    .required('Enter your email.')
    .email('Enter a valid email.'),
  password: Yup
    .string()
    .required('Enter a password.')
    .min(8, 'Use 8 characters or more.')
    .max(128, 'Use no more than 128 characters.'),
    // .matches( /[A-Z]/, 'Password must have at least 1 uppercase letter.')
    // .matches( /[a-z]/, 'Password must have at least 1 lowercase letter.')
    // .matches( /[0-9]/, 'Password must have at least 1 numeric character.')
    // .matches( /[*@!#%&()^~{}]/, 'Password must have at least 1 special character.'),
  password_confirmation: Yup
    .string()
    .required('Retype your password.')
    .oneOf([Yup.ref('password')], "Password doesn't match. Try again."),
});


const { setErrors, isSubmitting, handleSubmit } = useForm({
  validationSchema: schema,
});

const onSubmit = handleSubmit(async (values: Record<any, any>) => {
  try {
    // Run register API
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

    
    /** HANDLE API RESPONSE */

    const successResponse = data.value as SuccessResponse;
    const errorResponse = error.value?.data as ErrorResponse<any, RegisterForm>;

    // Handle success response
    if (successResponse?.success) {
      // TO DO: Add message as toast
      console.log(successResponse.success.message);

      // Navigate to login
      navigateTo({ path: '/login' });
      return;
    }

    // Handle error response
    if (errorResponse?.error) {
      // TO DO: Add message as toast
      console.log(errorResponse.error.message);
      
      // Get errors
      const errorFields = errorResponse.error.errors;

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
  }
});


/** TOGGLE PASSWORD */

const showPassword = ref(false);
const showPasswordConfirmation = ref(false);


/** SUGGEST USERNAME */

// const baseUrl = 'https://api.api-ninjas.com/v1/';

// async function fetchRandomAdjective() {
//   const { data } = useFetch('randomword', {
//     baseURL: baseUrl,
//     method: 'GET',
//     headers: {
//       'X-Api-Key': '6B+pBTJPd7PsKbkE0xsQZw==fleMzEtYk2FXOVd9'
//     },
//     params: {
//       type: 'adjective',
//     }
//   });

//   console.log(data.value);
//   return data.value;
// }

// async function fetchRandomBabyName() {
//   const { data } = useFetch('babynames', {
//     baseURL: baseUrl,
//     method: 'GET',
//     headers: {
//       'X-Api-Key': '6B+pBTJPd7PsKbkE0xsQZw==fleMzEtYk2FXOVd9'
//     },
//   });

//   console.log(data.value);
//   return data.value;
// }

// async function generateRandomUsernameList() {
//   const word = await fetchRandomAdjective();
//   const names = await fetchRandomBabyName();

//   return word.word + names[0];
// }

// onMounted(() => {
//   //
// })
</script>

<template>
  <NuxtLayout name="authentication">
    <div class="flex flex-grow items-center justify-center">
      <form
        @submit="onSubmit"
        class="h-full md:h-fit"
        novalidate
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
            
            <div class="flex flex-grow items-end">
              <AppFormInput
                name="password_confirmation"
                border-color="light"
                :disabled="isSubmitting"
                :loading="isSubmitting"
                :type="showPasswordConfirmation?'text':'password'"
                block
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
          </div>

          <div class="grid md:grid-cols-2 gap-5 mt-12">
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