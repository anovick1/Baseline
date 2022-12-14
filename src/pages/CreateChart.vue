<template>
  <div class="home_section">
    <h1 v-if="create">Create Chart</h1>
    <h1 v-if="!create">Chart Published!</h1>
    <transition name="list" appear>
      <PostSuccess v-if="!create" @toggleCreate="toggleCreate" />
    </transition>
    <transition name="list" appear>
      <div class="createchart_page" v-if="create">
        <!-- actual chart -->
        <div class="chart_border" id="chart_border_create">
          <div class="chart_container" id="chart_container_create">
            <canvas id="chart" width="1vw" height="5vw"></canvas>
          </div>
          <!-- WEB VIEW -->
          <transition-group
            name="prev"
            tag="div"
            class="player_img"
            v-if="mounted && !mobile"
          >
            <div
              class="chart_player_img"
              v-for="p in players"
              :key="p.player_number"
            >
              <div class="chart_action">
                <img
                  @click="subPlayer(p)"
                  src="../../public/images/remove.png"
                />
              </div>
              <img id="create_prev_player" :src="p.img_url" />
            </div>
          </transition-group>
        </div>

        <!-- Mobile VIEW -->
        <transition-group
          name="prev"
          tag="div"
          class="player_img"
          v-if="mounted && mobile"
        >
          <div
            class="chart_player_img"
            v-for="p in players"
            :key="p.player_number"
          >
            <div class="chart_action">
              <img @click="subPlayer(p)" src="../../public/images/remove.png" />
            </div>
            <img :src="p.img_url" />
          </div>
        </transition-group>
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
              @change="handleChange"
              placeholder="Stat"
            >
              <option v-for="(s, index) in updateStats" :key="index">
                {{ s }}
              </option>
            </select>
          </div>
          <div class="description">
            <textarea
              type="text"
              :value="description"
              @input="handleDescription"
              name="description"
              placeholder="Write description here"
              maxLength="255"
            ></textarea>
            <p id="desc_len">{{ description.length }}</p>
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
                src="../../public/images/cancel.png"
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
                  @change="handleChange($event)"
                >
                  <div class="search_player_name">
                    <img :src="player.img_url" />
                    <p>{{ player.player }}</p>
                  </div>
                  <div class="search_action" v-if="!pRender.includes(player)">
                    <img src="../../public/images/add.png" />
                  </div>
                  <div class="search_action" v-if="pRender.includes(player)">
                    <img src="../../public/images/remove.png" />
                  </div>
                </div>
              </transition-group>
            </div>
            <div class="search_placeholder" v-if="search.length <= 2"></div>
          </div>
        </div>
      </div>
    </transition>
    <div v-if="create" class="post_chart" @click="postChart">Publish Chart</div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import PlayerList from '../../data/players.json'
const StatList = require('../../data/stats.json')
import { getPlayersById } from '../Services/PlayerServices.js'
import { createChart } from '../Services/ChartServices.js'
import PostSuccess from '../components/PostSuccess.vue'
export default {
  name: 'CreateChart',
  components: { PostSuccess },
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
    x: 'Points Per Game',
    y_year: true,
    count: 0,
    loaded: false,
    myChart: new Chart(),
    search: '',
    playerAdded: null,
    description: '',
    mounted: false,
    mobile: window.innerWidth < 600,
    create: true
  }),
  computed: {
    filterPlayers() {
      return this.allPlayers.filter((player) =>
        player.player.toLowerCase().includes(this.search.toLowerCase())
      )
    },
    subTitle() {
      let ans = this.x.replaceAll('_', ' ')
      ans = ans.replaceAll('per game', 'Per Game')
      ans = ans.replaceAll('percent', '%')
      if (ans[0] === 'x') {
        ans = ans.replace('x', '')
      }
      return ans
    },
    updateStats() {
      let ans = []
      for (let i = 0; i < this.allStats.length; i++) {
        let word = this.allStats[i].replaceAll('_', ' ')
        word = word.replaceAll('per game', 'Per Game')
        word = word.replaceAll('percent', '%')
        if (word[0] === 'x') {
          word = word.replace('x', '')
        }
        ans.push(word)
      }
      return ans
    }
  },
  methods: {
    deleteSearch() {
      this.search = ''
    },
    toggleCreate() {
      if (this.create) {
        this.create = false
      } else {
        // this.create = true
        location.reload()
      }
    },
    postChart: async function () {
      let body = {
        title: this.title,
        author: this.author.id,
        player: this.players,
        y_year: this.y_year,
        x: this.x,
        description: this.description
      }
      console.log(body)
      await createChart(body)
      this.title = 'title'
      this.players = []
      this.x = 'Points Per Game'
      this.y_year = true
      this.description = ' '
      this.search = ' '
      await this.makeChart()
      this.create = false
    },
    handleChange: async function (e) {
      // if (e.target.name === 'x') {
      //   let ans = e.target.value.replaceAll(' ', '_')
      //   ans = ans.replaceAll('Per_Game', 'per_game')
      //   ans = ans.replaceAll('%', 'percent')
      //   this[e.target.name] = ans
      // } else {
      //   }
      this[e.target.name] = e.target.value
      this.makeChart()
    },
    handleDescription: async function (e) {
      this[e.target.name] = e.target.value
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
      this.search = ''
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
      let ans = this.x.replaceAll(' ', '_')
      ans = ans.replaceAll('Per_Game', 'per_game')
      ans = ans.replaceAll('%', 'percent')
      if (ans[0] === '2' || ans[0] === '3') {
        ans = 'x' + ans
      }
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
              dup.push(this.players[i].stats[j][ans])
            } else if (dup.length > 0) {
              const average = (array) =>
                array.reduce((a, b) => a + b) / array.length
              stats.push(average(dup))
            } else {
              stats.push(this.players[i].stats[j][ans])
            }
          } else {
            if (dup.length > 0) {
              const average = (array) =>
                array.reduce((a, b) => a + b) / array.length
              stats.push(average(dup))
            } else {
              stats.push(this.players[i].stats[j][ans])
            }
          }
        }
        if (stats.length > len) {
          len = stats.length
        }
        let colors = [
          'rgb(255, 51, 51)',
          'rgb(51, 153, 255)',
          'rgb(0, 204, 102)',
          'rgb(153, 102, 255)',
          'rgb(255, 153, 51)',
          'rgb(0, 204, 204)'
        ]
        let bColors = [
          'rgba(255, 51, 51, .5)',
          'rgba(51, 153, 255, .5)',
          'rgba(0, 204, 102, .5)',
          'rgba(153, 102, 255, .5)',
          'rgba(255, 153, 51, .5)',
          'rgba(0, 204, 204, .5)'
        ]
        let data = {
          label: this.players[i].player,
          data: stats.reverse(),
          fill: false,
          borderColor: colors[i],
          backgroundColor: bColors[i],
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
          scales: {
            x: {
              title: {
                display: true,
                text: 'Season in the League',
                font: {
                  size: 12
                },
                color: 'black'
              }
            },

            y: {
              title: {
                display: true,
                text: this.x,
                font: {
                  size: 12
                },
                color: 'black'
              }
            }
          },

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
              text: this.subTitle,
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

@media only screen and (max-width: 600px) {
  .prev-enter-from,
  .prev-leave-to {
    opacity: 0;
    transform: scale(0.5);
    transform: translateY(50vh);
  }
}
</style>
