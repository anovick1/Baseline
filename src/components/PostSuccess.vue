<template>
  <div class="post-success">
    <img src="https://i.gifer.com/1oWK.gif" />
    <div class="options">
      <router-link to="/charts" class="post_chart">View Charts</router-link>
      <div class="post_chart" @click="toggleCreate">Create Chart</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostSuccess',
  props: {},
  methods: {
    toggleCreate() {
      this.$emit('toggleCreate')
    }
  }
}
</script>

<style></style>
