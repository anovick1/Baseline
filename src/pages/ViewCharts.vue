<template>
  <div class="home_section">
    <h1>Charts</h1>
    <transition-group
      tag="div"
      name="list"
      appear
      class="chart-wrapper"
      v-if="searched"
    >
      <div class="chart" v-for="(c, index) in charts" :key="index">
        <PreviewChart
          :title="c.title"
          :players="c.player"
          :year="c.y_year"
          :x="c.x"
          :likes="c.likes"
          :comments="c.comments"
          :author="c.author"
          :count="index.toString()"
          :id="c.id"
          :description="c.description"
          @deleteChart="deleteChart"
          :date="c.date"
          :clickable="clickable"
          @disableClick="disableClick"
          @handleChange="handleChange"
          @handleChangePlayer="handleChangePlayer"
          @getCharts="getCharts"
          @toggleView="toggleView"
          :fullChart="fullChart"
          @updateChart="getCharts"
        />
      </div>
    </transition-group>
    <img
      v-if="!searched"
      src="https://thumbs.gfycat.com/ArtisticLastingColt-max-1mb.gif"
    />
    <h2 v-if="!searched">Loading . . . .</h2>
  </div>
</template>

<script>
import data from '../../data/players.json'
import { GetCharts, DeleteChart } from '../Services/ChartServices'
import PreviewChart from '../components/PreviewChart.vue'
export default {
  name: 'ViewCharts',
  components: { PreviewChart },
  data: () => ({
    players: data,
    charts: [],
    searched: false,
    clickable: true,
    fullChart: []
  }),
  mounted: async function () {
    await this.getCharts(0, false)
  },

  methods: {
    disableClick() {
      if (this.clickable) {
        this.clickable = false
      } else {
        this.clickable = true
      }
    },
    async getCharts(count, edit) {
      const res = await GetCharts()
      this.charts = await res
      await this.formatDate()
      this.searched = true
      for (let i = 0; i < this.charts.length; i++) {
        this.fullChart.push(false)
      }
      if (edit) {
        await this.toggleView(count)
        await this.toggleView(count)
      }
    },
    async deleteChart(id) {
      await DeleteChart(id)
      this.searched = false
      await this.getCharts()
    },
    formatDate() {
      for (let i = 0; i < this.charts.length; i++) {
        let newDate = this.charts[i].date.replaceAll('-', '/').slice(0, 10)
        let arr = newDate.split('/').reverse()
        this.charts[i].date = arr.join('/')
      }
      this.searched = true
    },
    handleChange: async function (e, count) {
      if (e.target.name === 'x') {
        let ans = e.target.value.replaceAll(' ', '_')
        ans = ans.replaceAll('Per_Game', 'per_game')
        ans = ans.replaceAll('%', 'percent')
        console.log(ans)
        this.charts[count][e.target.name] = ans
      } else {
        this.charts[count][e.target.name] = e.target.value
      }
    },
    async handleChangePlayer(players, count) {
      console.log(players)
      this.charts[count]['player'] = players
    },
    toggleView(index) {
      if (this.fullChart[index]) {
        this.fullChart[index] = false
        document.body.style.overflow = 'scroll'
      } else {
        this.fullChart[index] = true
        document.body.style.overflow = 'hidden'
      }
    }
  }
}
</script>

<style>
.list-enter-from {
  opacity: 0;
  transform: scale(0.6);
}
.list-enter-to {
  opacity: 1;
  transform: scale(1);
}
.list-enter-active {
  transition: all 0.4s ease;
}
</style>
