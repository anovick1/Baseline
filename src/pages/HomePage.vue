<template>
  <div>home</div>
  <ChartCardVue />
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
    charts: []
  }),
  mounted: async function () {
    await this.getCharts()
  },
  methods: {
    async getCharts() {
      const res = await GetCharts()
      console.log(res)
      this.charts = res
    }
  }
}
</script>

<style></style>
