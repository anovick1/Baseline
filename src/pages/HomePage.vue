<template>
  <div class="chart-wrapper" v-if="searched">
    <h2>Charts</h2>
    <section class="charts" v-for="(c, index) in charts" :key="index">
      <ChartCardVue
        :title="c.title"
        :players="c.player"
        :year="c.y_year"
        :x="x"
        :likes="c.likes"
        :comments="c.comments"
        :author="c.author.name"
      />
    </section>
  </div>
</template>

<script>
import data from '../../data/players.json'
import { GetCharts } from '../Services/ChartServices'
import ChartCardVue from '../components/ChartCard.vue'
export default {
  name: 'HomePage',
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
      console.log(res)
      this.charts = res
      this.searched = true
    }
  }
}
</script>

<style></style>
