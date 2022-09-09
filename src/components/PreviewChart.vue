<template>
  <div class="chart_border" v-if="clickable" @click="toggleView">
    <div class="chart_container">
      <div class="preview_title">
        <div class="left_title">
          <h1>{{ title }}</h1>
          <p>{{ x }}</p>
        </div>
        <div class="right_title">
          <p>{{ name }}</p>
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
          <p>{{ name }}</p>
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
      v-if="fullChart[parseInt(count)]"
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
      @toggleView="toggleView"
      :fullChart="fullChart"
      @updateChart="updateChart"
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
    clickable: Boolean,
    fullChart: Array
  },
  data: () => ({
    currentUser: {
      id: localStorage.id,
      name: localStorage.name,
      email: localStorage.email
    },
    view: false,
    show: true,
    name: ''
  }),
  methods: {
    async deleteChart(id) {
      this.$emit('deleteChart', id)
    },
    disableClick() {
      this.$emit('disableClick')
    },
    getCharts() {
      this.$emit('getCharts')
    },
    updateChart() {
      this.$emit('updateChart', parseInt(this.count), true)
    },
    handleChange(e, count) {
      this.$emit('handleChange', e, count)
    },
    handleChangePlayer(players, count) {
      this.$emit('handleChangePlayer', players, count)
    },
    toggleView() {
      this.$emit('disableClick')
      this.$emit('toggleView', parseInt(this.count))
    }
  },
  mounted() {
    document.body.style.overflow = 'scroll'
    if (this.currentUser.id == this.author.id) {
      this.name = 'You'
    } else {
      this.name = this.author.name
    }
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
