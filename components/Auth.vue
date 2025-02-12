<script setup>
const supabase = useSupabaseClient()

const loading = ref(false)
const email = ref('')

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({ email: email.value })
    if (error) throw error
    alert('Check your email for the login link!')
  } catch (error) {
    alert(error.error_description || error.message)
  } finally {
    loading.value = false
  }
}

const signInWithOtp = async () => {
  try{
    loading.value = true
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
      options: {
        emailRedirectTo: window.location.origin + '/confirm',
      }
    })
    if (error) console.log(error)
  }catch(error){
    alert(error.error_description || error.message)
  }finally{
    loading.value = false
  }
}


async function signInWithAzure() {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        scopes: 'email',
        redirectTo: window.location.origin + '/confirm',
      },
    })
  }catch (error) {
    alert(error.error_description || error.message)
  }finally {
    loading.value = false
  }

}

async function signInWithGithub() {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.location.origin + '/confirm',
      },
    })
  }catch (error) {
    alert(error.error_description || error.message)
  }finally {
    loading.value = false
  }
}

</script>

<template>
  <form class="row flex-center flex" @submit.prevent="signInWithOtp">
    <div class="col-6 form-widget">
      <h1 class="header">Vacation Planner</h1>
      <p class="description">Sign in via magic link with your email below</p>
      <div>
        <input class="inputField" type="email" placeholder="Your email" v-model="email" />
      </div>
      <div>
        <input
            type="submit"
            class="button block"
            :value="loading ? 'Loading' : 'Send magic link'"
            :disabled="loading"
        />
      </div>

      <div class="divider-container">
        <hr class="divider" />
        <span class="divider-text">or login with</span>
        <hr class="divider" />
      </div>

      <div class="button-container">
        <button class="button block" @click="signInWithAzure" :disabled="loading">Sign in with Azure</button>
        <button class="button block" @click="signInWithGithub" :disabled="loading">Sign in with Github</button>
      </div>

    </div>
  </form>
</template>


<style scoped>
.divider-container {
  display: flex;
  align-items: center;
  margin: 1rem 0;
}

.divider {
  flex: 1;
  border: none;
  border-top: 1px solid #666;
}

.divider-text {
  margin: 0 1rem;
  color: #666;
  white-space: nowrap;
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Add margin between buttons */
}


html,
body {
  --custom-font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  --custom-bg-color: #101010;
  --custom-panel-color: #222;
  --custom-box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.8);
  --custom-color: #fff;
  --custom-color-brand: #24b47e;
  --custom-color-secondary: #666;
  --custom-border: 1px solid #333;
  --custom-border-radius: 5px;
  --custom-spacing: 5px;

  padding: 0;
  margin: 0;
  font-family: var(--custom-font-family);
  background-color: var(--custom-bg-color);
}

* {
  color: var(--custom-color);
  font-family: var(--custom-font-family);
  box-sizing: border-box;
}

html,
body,
#__next {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}

/* Grid */

.container {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.row {
  position: relative;
  width: 100%;
}

.row [class^="col"] {
  float: left;
  margin: 0.5rem 2%;
  min-height: 0.125rem;
}

.col-1,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-10,
.col-11,
.col-12 {
  width: 96%;
}

.col-1-sm {
  width: 4.33%;
}

.col-2-sm {
  width: 12.66%;
}

.col-3-sm {
  width: 21%;
}

.col-4-sm {
  width: 29.33%;
}

.col-5-sm {
  width: 37.66%;
}

.col-6-sm {
  width: 46%;
}

.col-7-sm {
  width: 54.33%;
}

.col-8-sm {
  width: 62.66%;
}

.col-9-sm {
  width: 71%;
}

.col-10-sm {
  width: 79.33%;
}

.col-11-sm {
  width: 87.66%;
}

.col-12-sm {
  width: 96%;
}

.row::after {
  content: "";
  display: table;
  clear: both;
}

.hidden-sm {
  display: none;
}

@media only screen and (min-width: 33.75em) {

  /* 540px */
  .container {
    width: 80%;
  }
}

@media only screen and (min-width: 45em) {

  /* 720px */
  .col-1 {
    width: 4.33%;
  }

  .col-2 {
    width: 12.66%;
  }

  .col-3 {
    width: 21%;
  }

  .col-4 {
    width: 29.33%;
  }

  .col-5 {
    width: 37.66%;
  }

  .col-6 {
    width: 46%;
  }

  .col-7 {
    width: 54.33%;
  }

  .col-8 {
    width: 62.66%;
  }

  .col-9 {
    width: 71%;
  }

  .col-10 {
    width: 79.33%;
  }

  .col-11 {
    width: 87.66%;
  }

  .col-12 {
    width: 96%;
  }

  .hidden-sm {
    display: block;
  }
}

@media only screen and (min-width: 60em) {

  /* 960px */
  .container {
    width: 75%;
    max-width: 60rem;
  }
}

/* Forms */

label {
  display: block;
  margin: 5px 0;
  color: var(--custom-color-secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
}

input {
  width: 100%;
  border-radius: 5px;
  border: var(--custom-border);
  padding: 8px;
  font-size: 0.9rem;
  background-color: var(--custom-bg-color);
  color: var(--custom-color);
}

input[disabled] {
  color: var(--custom-color-secondary);
}

/* Utils */

.block {
  display: block;
  width: 100%;
}

.inline-block {
  display: inline-block;
  width: 100%;
}

.flex {
  display: flex;
}

.flex.column {
  flex-direction: column;
}

.flex.row {
  flex-direction: row;
}

.flex.flex-1 {
  flex: 1 1 0;
}

.flex-end {
  justify-content: flex-end;
}

.flex-center {
  justify-content: center;
}

.items-center {
  align-items: center;
}

.text-sm {
  font-size: 0.8rem;
  font-weight: 300;
}

.text-right {
  text-align: right;
}

.font-light {
  font-weight: 300;
}

.opacity-half {
  opacity: 50%;
}

/* Button */

button,
.button {
  color: var(--custom-color);
  border: var(--custom-border);
  background-color: var(--custom-bg-color);
  display: inline-block;
  text-align: center;
  border-radius: var(--custom-border-radius);
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-align: center;
  font-size: 0.9rem;
  text-transform: uppercase;
}

button.primary,
.button.primary {
  background-color: var(--custom-color-brand);
  border: 1px solid var(--custom-color-brand);
}

/* Widgets */

.card {
  width: 100%;
  display: block;
  border: var(--custom-border);
  border-radius: var(--custom-border-radius);
  padding: var(--custom-spacing);
}

.avatar {
  border-radius: var(--custom-border-radius);
  overflow: hidden;
  max-width: 100%;
}

.avatar.image {
  object-fit: cover;
}

.avatar.no-image {
  background-color: #333;
  border: 1px solid rgb(200, 200, 200);
  border-radius: 5px;
}

.footer {
  position: absolute;
  max-width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-flow: row;
  border-top: var(--custom-border);
  background-color: var(--custom-bg-color);
}

.footer div {
  padding: var(--custom-spacing);
  display: flex;
  align-items: center;
  width: 100%;
}

.footer div>img {
  height: 20px;
  margin-left: 10px;
}

.footer>div:first-child {
  display: none;
}

.footer>div:nth-child(2) {
  justify-content: left;
}

@media only screen and (min-width: 60em) {

  /* 960px */
  .footer>div:first-child {
    display: flex;
  }

  .footer>div:nth-child(2) {
    justify-content: center;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.mainHeader {
  width: 100%;
  font-size: 1.3rem;
  margin-bottom: 20px;
}

.avatarPlaceholder {
  border: var(--custom-border);
  border-radius: var(--custom-border-radius);
  width: 35px;
  height: 35px;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-widget {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-widget>.button {
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: #444444;
  text-transform: none !important;
  transition: all 0.2s ease;
}

.form-widget .button:hover {
  background-color: #2a2a2a;
}

.form-widget .button>.loader {
  width: 17px;
  animation: spin 1s linear infinite;
  filter: invert(1);
}

</style>
