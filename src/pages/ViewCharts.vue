<template>
  <div class="home_section">
    <h1>Charts</h1>
    <div class="chart-wrapper" v-if="searched">
      <section class="charts" v-for="(c, index) in charts" :key="index">
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
        />
      </section>
    </div>
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
    searched: false
  }),
  mounted: async function () {
    await this.getCharts()
  },
  methods: {
    async getCharts() {
      const res = await GetCharts()
      this.charts = await res
      await this.formatDate()
      this.searched = true
    },
    async deleteChart(id) {
      await DeleteChart(id)
      this.searched = false
      await this.getCharts()
    },
    formatDate() {
      console.log(this.charts)
      for (let i = 0; i < this.charts.length; i++) {
        let newDate = this.charts[i].date.replaceAll('-', '/').slice(0, 10)
        let arr = newDate.split('/').reverse()
        this.charts[i].date = arr.join('/')
      }
      this.searched = true
    }
  }
}
</script>

<style></style>
