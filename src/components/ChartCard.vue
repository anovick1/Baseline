<template>
  <div class="chart_border">
    <div class="chart_container">
      <canvas id="myChart" width="1vw" height="5vw"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
  name: 'ChardCard',
  components: {},
  props: {},
  mounted() {
    const ctx = document.getElementById('myChart')

    const labels = ['red', 'yellow', 'green']
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'My First Dataset',
          data: [65, 59, 80],
          fill: false,
          borderColor: 'black',
          tension: 0
          // backgroundColor: 'rgb(0,0,0)'
        }
      ]
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
            text: 'Chart.js Line Chart'
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
