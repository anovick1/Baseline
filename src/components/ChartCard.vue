<template>
  <!-- <transition name="bounce"> -->
  <div>
    <img
      src="https://cdn-icons-png.flaticon.com/512/5038/5038256.png"
      @click="toggleChart"
      id="exit"
    />
    <div class="chart_border" id="full_chart_border">
      <div class="chart_container" id="full_chart_container">
        <div
          class="edit_chart"
          v-if="parseInt(author.id) === parseInt(currentUser.id)"
        >
          Edit Chart
        </div>
        <canvas :id="count" width="1vw" height="5vw"></canvas>
      </div>
      <div class="chart_info">
        <div class="view_title"><h2>Description</h2></div>
        <p>{{ description }}</p>
        <div class="view_title"><h2>Players</h2></div>

        <div class="preview_players">
          <div
            class="preview_player"
            v-for="(c, index) in players"
            :key="index"
          >
            <div>
              <img id="preview_img" :src="c.img_url" />
            </div>
            <p>{{ c.player }}</p>
          </div>
        </div>
        <div class="author_date">
          <p>{{ author.name }}</p>
          <p>{{ date }}</p>
        </div>
      </div>
      <div
        class="delete_chart"
        v-if="parseInt(author.id) === parseInt(currentUser.id)"
        @click="deleteChart(id)"
      ></div>
    </div>
  </div>
  <!-- </transition> -->
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
    author: Object,
    count: String,
    id: Number,
    description: String,
    date: String
  },
  data: () => ({
    currentUser: {
      id: localStorage.id,
      name: localStorage.name,
      email: localStorage.email,
      pfp: localStorage.pfp
    }
  }),
  methods: {
    async deleteChart(id) {
      this.$emit('deleteChart', id)
    },
    toggleChart() {
      this.$emit('toggleChart')
    }
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
        pointBackgroundColor: colors[i],
        tension: 0.1,
        animations: {
          y: {
            duration: 2000,
            delay: i * 400
          }
        }
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
    // let delayed
    const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        radius: 4,
        hoverRadius: 8,
        responsive: true,
        maintainAspectRatio: true,
        animations: {
          y: {
            easing: 'easeInOutElastic',
            from: (ctx) => {
              if (ctx.type === 'data') {
                if (ctx.mode === 'default' && !ctx.dropped) {
                  ctx.dropped = true
                  return 0
                }
              }
            }
          }
        },

        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: this.title,
            font: {
              size: 30
            },
            color: 'black'
          },
          subtitle: {
            display: true,
            text: this.x,
            font: {
              size: 20
            },
            color: 'black'
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
