<template>
  <div class="home_section">
    <h1>Create Chart</h1>
    <div class="chart_border" id="chart_border_create">
      <div class="chart_container" id="chart_container_create">
        <canvas id="chart" width="1vw" height="5vw"></canvas>
      </div>
      <div class="player_img" v-if="players.length > 0">
        <div
          class="chart_player_img"
          v-for="(p, index) in players"
          :key="index"
        >
          <div class="chart_action">
            <img
              @click="subPlayer(p)"
              src="https://cdn-icons-png.flaticon.com/512/929/929430.png"
            />
          </div>
          <img :src="p.img_url" />
        </div>
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
      <input type="text" v-model="search" placeholder="Search Player by Name" />
      <div class="search_results" v-if="search.length > 1">
        <div
          class="search_player"
          v-for="(player, index) in filterPlayers"
          :key="index"
        >
          <div class="search_player_name">
            <img :src="player.img_url" />
            <p>{{ player.player }}</p>
          </div>
          <div
            class="search_action"
            v-if="!pRender.includes(player)"
            @click="addPlayer(player)"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/148/148764.png" />
          </div>
          <div
            class="search_action"
            v-if="pRender.includes(player)"
            @click="subPlayer(player)"
          >
            <img src="https://cdn-icons-png.flaticon.com/512/929/929430.png" />
          </div>
        </div>
      </div>
      <select
        v-model="x"
        :value="x"
        name="x"
        @change="handleChange($event)"
        placeholder="Stat"
      >
        <!-- <div v-for="(s, index) in allStats" :key="index"></div> -->
        <option v-for="(s, index) in allStats" :key="index">
          {{ s }}
        </option>
      </select>

      <button @click="postChart">Publish Chart</button>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import PlayerList from '../../data/players.json'
const StatList = require('../../data/stats.json')
import { getPlayersById } from '../Services/PlayerServices.js'
import { createChart } from '../Services/ChartServices.js'
export default {
  name: 'CreateChart',
  data: () => ({
    title: 'Title',
    players: [],
    pRender: [],
    author: {
      id: localStorage.id,
      name: localStorage.name,
      email: localStorage.email,
      pfp: localStorage.pfp
    },
    allPlayers: PlayerList,
    allStats: StatList,
    x: 'x3p_per_game',
    y_year: true,
    count: 0,
    loaded: false,
    myChart: new Chart(),
    search: '',
    playerAdded: null
  }),
  computed: {
    filterPlayers() {
      return this.allPlayers.filter((player) =>
        player.player.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    postChart: async function () {
      let body = {
        title: this.title,
        author: this.author.id,
        player: this.players,
        y_year: this.y_year,
        x: this.x
      }
      await createChart(body)
      this.title = 'title'
      this.players = []
      this.x = 'x3p_per_game'
      this.y_year = true
    },
    handleChange: async function (e) {
      this[e.target.name] = e.target.value
      this.makeChart()
    },
    handleSubmit(e) {
      e.preventDefault()
      this.title = 'Title'
      this.players = []
      this.year = true
      this.x = 'pts_per_game'
    },
    addPlayer: async function (player) {
      this.pRender.push(player)
      let p = await getPlayersById(player.player_id)
      this.players.push(p)
      this.makeChart()
    },
    subPlayer(player) {
      let filterPlayers = []
      for (let i = 0; i < this.players.length; i++) {
        if (
          this.players[i].player_number !== parseInt(player.player_id) &&
          this.players[i].player_number !== parseInt(player.player_number)
        ) {
          filterPlayers.push(this.players[i])
        }
      }
      this.players = filterPlayers
      let filterPredner = []
      for (let i = 0; i < this.players.length; i++) {
        if (
          this.players[i].player_number !== parseInt(player.player_id) &&
          this.players[i].player_number !== parseInt(player.player_number)
        ) {
          filterPredner.push(this.players[i])
        }
      }

      this.pRender = filterPredner
      this.makeChart()
    },
    makeChart() {
      this.myChart.destroy()
      const ctx = document.getElementById('chart')
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
