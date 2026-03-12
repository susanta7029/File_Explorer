<template>
  <div id="layout">
    <SidebarFileExplorer />
    <div class="main-content">
      <img alt="Vue logo" src="./assets/logo.png">
      <h2>Recursive File Explorer</h2>
      <p>Click folders to expand and lazy-load contents.</p>
    </div>
  </div>
</template>

<script>
import SidebarFileExplorer from './components/SidebarFileExplorer.vue'

export default {
  name: 'App',
  components: {
    SidebarFileExplorer
  }
}
</script>

<style>
#layout {
  display: flex;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  padding: 2rem;
  text-align: center;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
