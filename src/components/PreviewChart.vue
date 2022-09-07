<template>
  <div class="chart_border" @click="toggleChart">
    <div class="chart_container">
      <div class="preview_title">
        <div class="left_title">
          <h1>{{ title }}</h1>
          <p>{{ x }}</p>
        </div>
        <div class="right_title">
          <p>{{ author.name }}</p>
          <p>{{ date }}</p>
        </div>
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
  </div>
  <div v-if="view">
    <ChartCardVue
      :title="title"
      :players="players"
      :year="y_year"
      :x="x"
      :likes="likes"
      :comments="comments"
      :author="author"
      :id="id"
      :description="description"
      @deleteChart="deleteChart"
      :date="date"
      :count="count"
      @toggleChart="toggleChart"
    />
  </div>
</template>

<script>
import ChartCardVue from '../components/ChartCard.vue'

export default {
  name: 'PreviewChart',
  components: { ChartCardVue },
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
    description: String,
    date: String
  },
  data: () => ({
    currentUser: {
      id: localStorage.id,
      name: localStorage.name,
      email: localStorage.email
    },
    view: false
  }),
  methods: {
    async deleteChart(id) {
      this.$emit('deleteChart', id)
    },
    toggleChart() {
      if (this.view) {
        this.view = false
        document.body.style.overflow = 'scroll'
      } else {
        this.view = true
        document.body.style.overflow = 'hidden'
        // document.getElementById('your_iframes_id').scrolling = 'no'
      }
    }
  },
  mounted() {
    document.body.style.overflow = 'scroll'
  }
}
</script>

<style></style>
