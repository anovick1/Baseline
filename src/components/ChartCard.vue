<template>
  <div class="chart_border">
    <div class="chart_container">
      <canvas :id="count" width="1vw" height="5vw"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'ChardCard',
  components: {},
  props: {
    title: String,
    players: Array,
    year: Boolean,
    x: String,
    likes: Array,
    comments: Array,
    author: String,
    count: String
  },
  mounted() {
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
    const myChart = new Chart(ctx, {
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
    myChart
  }
}
</script>

<style></style>
