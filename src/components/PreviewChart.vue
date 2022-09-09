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

  <transition name="fade">
    <ChartCardVue
      v-if="view"
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
      @handleChange="handleChange"
      @handleChangePlayer="handleChangePlayer"
      @getCharts="getCharts"
      @disableClick="disableClick"
      @toggleView="toggleChart"
    />
  </transition>
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
      this.$emit('disableClick')
    },
    disableClick() {
      this.$emit('disableClick')
    },
    getCharts() {
      this.$emit('getCharts')
    },
    handleChange(e, count) {
      this.$emit('handleChange', e, count)
    },
    handleChangePlayer(players, count) {
      this.$emit('handleChangePlayer', players, count)
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
