<template>
  <NavBarVue />
  <main>
    <router-view header="NBA-APP"></router-view>
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
