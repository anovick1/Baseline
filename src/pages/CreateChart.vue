<template>
  <div class="home_section">
    <h1>Create Chart</h1>
    <div class="createchart_page">
      <!-- actual chart -->
      <div class="chart_border" id="chart_border_create">
        <div class="chart_container" id="chart_container_create">
          <canvas id="chart" width="1vw" height="5vw"></canvas>
        </div>
        <transition-group
          name="prev"
          tag="div"
          class="player_img"
          v-if="mounted"
        >
          <div
            class="chart_player_img"
            v-for="p in players"
            :key="p.player_number"
          >
            <div class="chart_action">
              <img
                @click="subPlayer(p)"
                src="https://cdn-icons-png.flaticon.com/512/929/929430.png"
              />
            </div>
            <img :src="p.img_url" />
          </div>
        </transition-group>
      </div>

      <!-- Create chart -->
      <div class="create_chart">
        <div class="input_create">
          <input
            @input="handleChange"
            placeholder="Title"
            :value="title"
            name="title"
            type="title"
            id="title_input"
          />

          <select
            v-model="x"
            :value="x"
            name="x"
            @change="handleChange($event)"
            placeholder="Stat"
          >
            <option v-for="(s, index) in allStats" :key="index">
              {{ s }}
            </option>
          </select>
        </div>
        <div class="description">
          <textarea
            type="text"
            :value="description"
            @input="handleChange"
            name="description"
            placeholder="Write description here"
            maxLength="255"
          ></textarea>
          <p id="desc_len">{{ description.length }}/255</p>
        </div>
        <div class="input_create" id="search">
          <div class="searchbar_delete">
            <input
              type="text"
              v-model="search"
              placeholder="Search Player by Name"
              name="p"
            />
            <img
              id="search_delete"
              @click="deleteSearch"
              src="https://cdn-icons-png.flaticon.com/512/167/167055.png"
            />
          </div>
          <div class="search_results" v-if="search.length > 2">
            <transition-group
              tag="div"
              :css="false"
              @before-enter="onBeforeEnter"
              @enter="onEnter"
              @leave="onLeave"
            >
              <div
                class="search_player"
                v-for="(player, index) in filterPlayers"
                :key="index"
                @click="togglePlayer(player)"
              >
                <div class="search_player_name">
                  <img :src="player.img_url" />
                  <p>{{ player.player }}</p>
                </div>
                <div class="search_action" v-if="!pRender.includes(player)">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/148/148764.png"
                  />
                </div>
                <div class="search_action" v-if="pRender.includes(player)">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/929/929430.png"
                  />
                </div>
              </div>
            </transition-group>
          </div>
          <div class="search_placeholder" v-if="search.length <= 2"></div>
        </div>
      </div>
    </div>
    <div class="post_chart" @click="postChart">Publish Chart</div>
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
    x: 'Points_per_game',
    y_year: true,
    count: 0,
    loaded: false,
    myChart: new Chart(),
    search: '',
    playerAdded: null,
    description: '',
    mounted: false
  }),
  computed: {
    filterPlayers() {
      return this.allPlayers.filter((player) =>
        player.player.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },
  methods: {
    deleteSearch() {
      this.search = ''
    },
    postChart: async function () {
      let body = {
        title: this.title,
        author: this.author.id,
        player: this.players,
        y_year: this.y_year,
        x: this.x,
        description: this.x
      }
      await createChart(body)
      this.title = 'title'
      this.players = []
      this.x = 'pts_per_game'
      this.y_year = true
      this.description = ' '
      this.makeChart()
    },
    handleChange: async function (e) {
      this[e.target.name] = e.target.value
      if (e.target.name === 'p' && e.target.value.length > 0) {
        // window.scrollTo(0, document.body.scrollHeight)
      }

      this.makeChart()
    },
    handleSubmit(e) {
      e.preventDefault()
      this.title = 'Title'
      this.players = []
      this.year = true
      this.x = 'pts_per_game'
      this.makeChart()
    },
    togglePlayer: async function (player) {
      if (!this.pRender.includes(player)) {
        this.pRender.push(player)
        let p = await getPlayersById(player.player_id)
        this.players.push(p)
        this.makeChart()
      } else {
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
      }
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

    async makeChart() {
      this.loaded = false
      this.myChart.destroy()
      const ctx = document.getElementById('chart')
      const labels = []
      const datasets = []
      let len = 0
      for (let i = 0; i < this.players.length; i++) {
        let stats = []
        /// STATS ARRAY
        for (let j = 0; j < this.players[i].stats.length; j++) {
          let Season = this.players[i].stats[j].Season
          let dup = []
          if (j < this.players[i].stats.length - 1) {
            if (Season === this.players[i].stats[j + 1].Season) {
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
          tension: 0.1
          // animations: {
          //   y: {
          //     duration: 2000,
          //     delay: i * 500
          //   }
          // }
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
          // animations: {
          //   y: {
          //     easing: 'easeInOutElastic',
          //     from: (ctx) => {
          //       if (ctx.type === 'data') {
          //         if (ctx.mode === 'default' && !ctx.dropped) {
          //           ctx.dropped = true
          //           return 0
          //         }
          //       }
          //     }
          //   }
          // },

          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: this.title,
              font: {
                size: 20
              },
              color: 'black'
            },
            subtitle: {
              display: true,
              text: this.x,
              font: {
                size: 14
              },
              color: 'black'
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
    this.mounted = true
  }
}
</script>

<style>
.prev-enter-from,
.prev-leave-to {
  opacity: 0;
  transform: scale(0.5);
  transform: translateX(25vw);
}

.prev-move,
.prev-enter-active,
.prev-leave-active {
  transition: all 1s ease;
}
.prev-leave-active {
  position: absolute;
}
</style>
