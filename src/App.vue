<template>
  <NavBarVue />
  <main>
    <router-view header="Nba"></router-view>
  </main>
</template>

<script>
import NavBarVue from './components/NavBar.vue'
export default {
  name: 'App',
  components: {
    NavBarVue
  }
}
</script>
