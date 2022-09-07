<template>
  <div class="chart_border">
    <div class="chart_container">
      <div class=""></div>
      <div class="left_title">
        <h1>{{ title }}</h1>
        <p>{{ x }}</p>
      </div>
      <p>{{ description }}</p>

      <div class="preview_players">
        <div class="preview_player" v-for="(c, index) in players" :key="index">
          <div>
            <img id="preview_img" :src="c.img_url" />
          </div>
          <p>{{ c.player }}</p>
        </div>
      </div>
    </div>
    <!-- <div
      class="delete_chart"
      v-if="parseInt(author.id) === parseInt(currentUser.id)"
      @click="deleteChart(id)"
    ></div> -->
  </div>
</template>

<script>
export default {
  name: 'PreviewChart',
  props: {
    title: String,
    players: Array,
    year: Boolean,
    x: String,
    likes: Array,
    comments: Array,
    author: Object,
    count: String,
    id: Number,
    description: String
  },
  data: () => ({
    currentUser: {
      id: localStorage.id,
      name: localStorage.name,
      email: localStorage.email
    }
  }),
  methods: {
    async deleteChart(id) {
      this.$emit('deleteChart', id)
    }
  }
}
</script>

<style></style>
