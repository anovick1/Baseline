<template>
  <div class="home_section">
    <h1>Charts</h1>
    <div class="chart-wrapper" v-if="searched">
      <section class="charts" v-for="(c, index) in charts" :key="index">
        <ChartCardVue
          :title="c.title"
          :players="c.player"
          :year="c.y_year"
          :x="c.x"
          :likes="c.likes"
          :comments="c.comments"
          :author="c.author"
          :count="index.toString()"
          :id="c.id"
          @deleteChart="deleteChart"
        />
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
import ChartCardVue from '../components/ChartCard.vue'
import PreviewChart from '../components/PreviewChart.vue'
export default {
  name: 'ViewCharts',
  components: { ChartCardVue, PreviewChart },
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
      this.searched = true
      this.charts = res
    },
    async deleteChart(id) {
      await DeleteChart(id)
      this.searched = false
      await this.getCharts()
    }
  },
  viewChart() {}
}
</script>

<style></style>
