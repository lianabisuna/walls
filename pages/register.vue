<script setup lang="ts">
import { SuccessResponse, ErrorResponse } from 'services/types';
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


const { setErrors, isSubmitting, handleSubmit, meta } = useForm({
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


/** GENERATE RANDOM USERNAME */

const usernameStore = useUsernameStore();
const { addUsername, removeUsername } = usernameStore;
const baseUrl = 'https://api.api-ninjas.com/v1/';
const usernamesComputed = computed(()=>usernameStore.usernames);

// Fetch random word (type: adjective) from API Ninja
async function fetchRandomAdjective() {
  try {
    const { data } = await useFetch('randomword', {
      baseURL: baseUrl,
      method: 'GET',
      headers: {
        'X-Api-Key': '6B+pBTJPd7PsKbkE0xsQZw==fleMzEtYk2FXOVd9'
      },
      params: {
        type: 'adjective',
      }
    });

    return data.value;
  } catch (e) {
    console.error(e);
  }
}

// Fetch random baby name from API Ninja
async function fetchRandomBabyName() {
  try {
    const { data } = await useFetch('babynames', {
      baseURL: baseUrl,
      method: 'GET',
      headers: {
        'X-Api-Key': '6B+pBTJPd7PsKbkE0xsQZw==fleMzEtYk2FXOVd9'
      },
    });

    return data.value;
  } catch(e) {
    console.error(e);
  }
  return;
}

// Generate list of random usernames
async function generateRandomUsernames() {
  if (usernamesComputed.value.length > 1) return;

  try {
    const randomNames = await fetchRandomBabyName() as string[];

    if (!randomNames?.length) return;

    for(let x=0; x<randomNames.length; x++) {
      try {
        const randomWord = await fetchRandomAdjective() as RandomWord;
        const wordCombined = formatUsername(randomWord.word) + formatUsername(randomNames[x]);
        addUsername(wordCombined);
      } catch(e) {
        console.error(e);
      }
    }
  } catch(e) {
    console.error(e);
  }
}

// Capitalize first letter per word
function formatUsername(str: string) {
  let strFormatted = '';
  const strArr = str.split(/[^A-Za-z0-9]/);
  strArr.forEach(strEl => {
    strFormatted += strEl[0].toUpperCase() + strEl.slice(1, strEl.length);
  });
  return strFormatted;
}

const { value: usernameField } = useField('username');

// Get username in first index
function getRandomUsername() {
  const username = usernamesComputed.value[0];
  usernameField.value = username;
  removeUsername(0);
}

watch(usernamesComputed, () => {
  if (usernamesComputed.value.length > 0) return;
  generateRandomUsernames();
}, { deep: true, immediate: true });


/** PASSWORD STRENGTH */

const strengthInPercentage = ref(0);
const strengthInWhole = ref(0);
const { value: passwordField } = useField('password');

watch(passwordField, () => {
  if (!passwordField.value) return;
  checkPasswordStrength();
})

function checkPasswordStrength() {
  strengthInPercentage.value = 0;
  strengthInWhole.value = 0;
  
  const regexValidations = [
    /.{8,}/,
    /[A-Z]/,
    /[a-z]/,
    /[0-9]/,
    /[*@!#%&()^~{}]/
  ];

  for (let x=0; x<regexValidations.length; x++) {
    const passwordStr = passwordField.value as string;
    if (regexValidations[x].test(passwordStr)) {
      strengthInWhole.value = Math.floor(((strengthInWhole.value+1)/regexValidations.length )*5);
    } 
  }

  strengthInPercentage.value = Math.floor((strengthInWhole.value/regexValidations.length)*100);
}
</script>

<template>
  <NuxtLayout name="authentication">
    <div class="flex flex-grow items-center justify-center">
      <form
        @submit="onSubmit"
        class="h-full md:h-fit"
        novalidate
      >
        <div class="bg-secondary-500 rounded-sm px-5 md:px-12 py-8 md:py-14 md:min-w-[40rem] max-w-[40rem] w-full md:w-fit h-full md:h-fit">
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
              <template #append>
                <button
                  class="select-none text-xl leading-[0]"
                  :class="[
                    { 'opacity-75 pointer-events-none': !usernamesComputed.length }
                  ]"
                  :disabled="!usernamesComputed.length"
                  @click.prevent="getRandomUsername"
                >
                  <ClientOnly>
                    <Icon name="ph:repeat"></Icon>
                  </ClientOnly>
                </button>
              </template>
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
                  @click.prevent="()=>showPassword=!showPassword"
                >
                  <ClientOnly>
                    <Icon :name="showPassword?'ph:eye':'ph:eye-closed'"></Icon>
                  </ClientOnly>
                </button>
              </template>
            </AppFormInput>

            <!-- Password Strength -->
            <ClientOnly>
              <Teleport to="[aria-label='Password']">
                <div
                  v-show="passwordField"
                  class="relative"
                >
                  <div class="flex gap-x-0.5">
                    <div
                      v-for="bars in 5"
                      class="h-2 w-2"
                      :class="[
                        {
                          'bg-light/75': true,
                        }
                      ]"
                    >
                    </div>
                  </div>
                  <div class="absolute top-0 left-0 flex gap-x-0.5">
                    <div
                      v-for="strength in strengthInWhole"
                      class="h-2 w-2"
                      :class="[
                        {
                          'bg-error-500': strengthInPercentage > 0 && strengthInPercentage < 26,
                          'bg-alert-500': strengthInPercentage > 25 && strengthInPercentage < 51,
                          'bg-orange-500': strengthInPercentage > 50 && strengthInPercentage < 76,
                          'bg-success-500': strengthInPercentage > 75 && strengthInPercentage <= 100,
                        }
                      ]"
                    >
                    </div>
                  </div>
                </div>
              </Teleport>
            </ClientOnly>
            
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
                    @click.prevent="()=>showPasswordConfirmation=!showPasswordConfirmation"
                  >
                    <ClientOnly>
                      <Icon :name="showPasswordConfirmation?'ph:eye':'ph:eye-closed'"></Icon>
                    </ClientOnly>
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

interface RandomWord {
  word: string;
}
</script>