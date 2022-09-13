<template>
  <NavBarVue />
  <main>
    <router-view header="NBA-APP" v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>

    <!-- <router-view header="NBA-APP" v-if="mobile"> </router-view> -->

    <!-- <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view> -->
  </main>
  <FooterComp />
</template>

<script>
import NavBarVue from './components/NavBar.vue'
import FooterComp from './components/FooterComp.vue'
// import ViewCharts from './pages/ViewCharts'
// import HomePage from './pages/HomePage.vue'
// import CreateChart from './pages/CreateChart'
export default {
  name: 'App',
  components: {
    NavBarVue,
    FooterComp
  },
  data: () => ({
    mobile: window.innerWidth < 600
  })
}
</script>

<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
</style>
