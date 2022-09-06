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
          :author="c.author.name"
          :count="index.toString()"
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
import { GetCharts } from '../Services/ChartServices'
import ChartCardVue from '../components/ChartCard.vue'
export default {
  name: 'ViewCharts',
  components: { ChartCardVue },
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
      this.charts = res
      this.searched = true
    }
  }
}
</script>

<style></style>
