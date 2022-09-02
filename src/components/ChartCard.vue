<template>
  <div class="chart_border">
    <div class="chart_container">
      <canvas id="myChart" width="1vw" height="5vw"></canvas>
      <h1>{{ title }}</h1>
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
    year: String,
    x: String,
    likes: Array,
    comments: Array,
    author: String
  },
  mounted() {
    const ctx = document.getElementById('myChart')
    console.log(this.players[0].stats[8]['pts_per_game'])
    const labels = ['red', 'yellow', 'green', '2', '4', '4']
    const datasets = []
    // let len =
    for (let i = 0; i < this.players.length; i++) {
      let stats = []
      for (let j = 0; j < this.players[i].stats.length; j++) {
        stats.push(this.players[i].stats[j][this.x])
      }
      let data = {
        label: this.players[i].player,
        data: stats.reverse(),
        fill: false,
        borderColor: 'black',
        tension: 0
      }
      datasets.push(data)
    }
    console.log(this.x)
    const data = {
      labels: labels,
      datasets: datasets
      // datasets: [
      //   {
      //     label: 'My First Dataset',
      //     data: [65, 59, 80],
      //     fill: false,
      //     borderColor: 'black',
      //     tension: 0
      //     // backgroundColor: 'rgb(0,0,0)'
      //   }
      // ]
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
