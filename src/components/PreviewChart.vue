<template>
  <div class="chart_border" v-if="clickable" @click="toggleChart">
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
  <div class="chart_border" v-if="!clickable" id="behind">
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
    <transition-group name="chart" appear>
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
    </transition-group>
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
    date: String,
    clickable: Boolean
  },
  data: () => ({
    currentUser: {
      id: localStorage.id,
      name: localStorage.name,
      email: localStorage.email
    },
    view: false,
    show: true
  }),
  methods: {
    async deleteChart(id) {
      this.$emit('deleteChart', id)
    },
    disableClick() {
      this.$emit('disableClick')
    },
    toggleChart() {
      this.$emit('disableClick')
      if (this.view) {
        this.view = false
        document.body.style.overflow = 'scroll'
      } else {
        this.view = true
        document.body.style.overflow = 'hidden'
      }
    }
  },
  mounted() {
    document.body.style.overflow = 'scroll'
  }
}
</script>

<style>
.chart-enter-from {
  opacity: 0;
  transform: scale(0.2);
  position: 'fixed';
}
.chart-enter-to {
  opacity: 1;
  transform: scale(0.5);
  position: 'fixed';
}
.chart-enter-active {
  transition: all 0.4s ease;
  position: 'fixed';
}
</style>
