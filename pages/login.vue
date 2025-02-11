<script setup lang="ts">

</script>
<template>
  <div class="holy-grail">
    <div class="main">
      <Auth/>
    </div>
    <footer class="footer">
      Vacation Planner - by <a href="https://emanum.dev">Emanum</a> - <a
        href="https://github.com/Emanum/vacationPlanner">GitHub</a>
    </footer>
  </div>
</template>

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

.main {
  display: flex;
  flex: 1;
}

.footer a {
  margin-left: 0.5rem; /* Adjust the margin as needed */
  margin-right: 0.5rem; /* Adjust the margin as needed */

}

</style>
