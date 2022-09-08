<template>
  <NavBarVue />
  <main>
    <router-view header="NBA-APP"></router-view>
  </main>
  <FooterComp />
</template>

<script>
import NavBarVue from './components/NavBar.vue'
import FooterComp from './components/FooterComp.vue'
export default {
  name: 'App',
  components: {
    NavBarVue,
    FooterComp
  }
}
</script>
