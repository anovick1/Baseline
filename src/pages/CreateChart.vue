<template>
  <div class="home_section">
    <h1>Create Chart</h1>
    <div class="chart_border" id="chart_border_create">
      <div class="chart_container" id="chart_container_create">
        <canvas :id="count" width="1vw" height="5vw"></canvas>
      </div>
    </div>
    <div class="create_chart">
      <input
        @input="handleChange"
        placeholder="Title"
        :value="title"
        name="title"
        type="title"
      />
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import PlayerList from '../../data/players.json'
import StatList from '../../data/players.json'
export default {
  name: 'CreateChart',
  data: () => ({
    title: 'Title',
    players: [],
    year: true,
    x: '',
    author: {
      name: localStorage.name,
      email: localStorage.email,
      pfp: localStorage.pfp
    },
    allPlayers: PlayerList,
    allStats: StatList,
    count: 0,
    loaded: false,
    myChart: new Chart()
  }),
  methods: {
    handleChange: async function (e) {
      console.log(this.title)

      this[e.target.name] = e.target.value
      this.makeChart()
    },
    handleSubmit(e) {
      e.preventDefault()
      this.title = 'Title'
      this.players = []
      this.year = true
      this.x = ''
    },
    updateChart() {},
    makeChart() {
      this.myChart.destroy()
      // console.log(this.count)
      // this.count++
      const ctx = document.getElementById(this.count)
      const labels = []
      const datasets = []
      let len = 0
      for (let i = 0; i < this.players.length; i++) {
        let stats = []
        /// STATS ARRAY
        for (let j = 0; j < this.players[i].stats.length; j++) {
          let season = this.players[i].stats[j].season
          let dup = []
          if (j < this.players[i].stats.length - 1) {
            if (season === this.players[i].stats[j + 1].season) {
              dup.push(this.players[i].stats[j][this.x])
            } else if (dup.length > 0) {
              const average = (array) =>
                array.reduce((a, b) => a + b) / array.length
              stats.push(average(dup))
            } else {
              stats.push(this.players[i].stats[j][this.x])
            }
          } else {
            if (dup.length > 0) {
              const average = (array) =>
                array.reduce((a, b) => a + b) / array.length
              stats.push(average(dup))
            } else {
              stats.push(this.players[i].stats[j][this.x])
            }
          }
        }
        if (stats.length > len) {
          len = stats.length
        }
        let colors = ['black', 'red', 'blue', 'green', 'orange']
        let data = {
          label: this.players[i].player,
          data: stats.reverse(),
          fill: false,
          borderColor: colors[i],
          tension: 0
        }
        datasets.push(data)
      }
      for (let i = 1; i <= len; i++) {
        labels.push(i)
      }
      const data = {
        labels: labels,
        datasets: datasets
      }
      const plugin = {
        beforeDraw: (chart) => {
          const { ctx } = chart
          ctx.save()
          ctx.globalCompositeOperation = 'destination-over'
          ctx.fillStyle = 'white'
          ctx.fillRect(0, 0, chart.width, chart.height)
          ctx.restore()
        }
      }
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: true,

          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: this.title
            }
          }
        },
        plugins: [plugin]
      })
      this.myChart
      this.loaded = true
    }
  },
  mounted() {
    this.makeChart()
  }
}
</script>

<style></style>
