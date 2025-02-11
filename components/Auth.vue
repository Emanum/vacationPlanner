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
</style>
