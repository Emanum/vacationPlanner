<!-- BaseLayout.vue -->
<template>
  <div class="holy-grail">
    <header class="header">
      <div class="header-content">
        <span>Vacation Planner</span>
        <button @click="signOut" class="sign-out-button">Sign Out</button>
      </div>
    </header>
    <div class="main">
      <nav class="sidebar">
        <ul>
          <li>
            <router-link to="/account">Account</router-link>
          </li>
          <li>
            <router-link to="/calendar">Calendar</router-link>
          </li>
        </ul>
      </nav>
      <section class="content">
        <slot></slot>
      </section>
    </div>
    <footer class="footer">Vacation Planner - by <a href="https://emanum.dev">Emanum</a> - <a href="https://github.com/Emanum/vacationPlanner">GitHub</a></footer>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const router = useRouter();

async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    // Redirect to the login page
    await router.push({name: 'login'});
  } catch (error) {
    alert(error.message);
  }
}
</script>

<style scoped>
.holy-grail {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.header, .footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 1rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sign-out-button {
  background: #ff4b4b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 5px;
}

.main {
  display: flex;
  flex: 1;
}

.sidebar {
  background: #4b4b4b;
  padding: 1rem;
  width: 200px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  cursor: pointer;
  padding: 0.5rem 0;
  color: white;
}

.content {
  flex: 1;
  padding: 1rem;
  background: #3d3d3d;
  color: white;
}

.footer a {
  margin-left: 0.5rem; /* Adjust the margin as needed */
  margin-right: 0.5rem; /* Adjust the margin as needed */

}
</style>
