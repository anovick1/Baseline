<template>
  <div>
    <transition name="edit">
      <img
        src="https://cdn-icons-png.flaticon.com/512/5038/5038256.png"
        @click="toggleView"
        id="exit"
        v-if="loaded"
      />
    </transition>
    <div class="chart_border" id="full_chart_border">
      <div class="edit_titles">
        <input
          @input="handleChange"
          placeholder="Title"
          :value="title"
          name="title"
          type="title"
          id="title_input_edit"
          v-if="edit"
        />
        <select
          :value="x"
          name="x"
          @change="handleChange($event)"
          placeholder="Stat"
          v-if="edit"
          id="stat_edit"
        >
          <option v-for="(s, index) in updateStats" :key="index">
            {{ s }}
          </option>
        </select>
      </div>
      <div class="chart_container" id="full_chart_container">
        <transition name="edit">
          <div
            v-if="
              parseInt(author.id) === parseInt(currentUser.id) &&
              !edit &&
              loaded
            "
            appear
            class="edit_chart"
            @click="toggleEdit()"
          >
            Edit Chart
          </div>
        </transition>
        <transition name="edit">
          <div
            class="edit_chart_true"
            v-if="parseInt(author.id) === parseInt(currentUser.id) && edit"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/929/929430.png"
              @click="toggleEdit()"
            />
            <img
              @click="updateChart(parseInt(id))"
              src="https://cdn-icons-png.flaticon.com/512/148/148764.png"
            />
          </div>
        </transition>

        <canvas :id="count"></canvas>
      </div>
      <div class="chart_info">
        <div class="view_title"><h2>Description</h2></div>
        <p v-if="!edit">{{ description }}</p>
        <div class="description" id="description_edit">
          <textarea
            v-if="edit"
            type="text"
            :value="description"
            @input="handleChange"
            name="description"
            placeholder="Write description here"
            maxLength="255"
          ></textarea>
          <p v-if="edit" id="desc_len">{{ description.length }}/255</p>
        </div>

        <div class="view_title"><h2>Players</h2></div>
        <div class="input_create" id="search_edit" v-if="edit">
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
                <div
                  class="search_action"
                  v-if="
                    !players.some(
                      (p) => p.player_number === parseInt(player.player_id)
                    )
                  "
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/148/148764.png"
                  />
                </div>
                <div
                  class="search_action"
                  v-if="
                    players.some(
                      (p) => p.player_number === parseInt(player.player_id)
                    )
                  "
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/929/929430.png"
                  />
                </div>
              </div>
            </transition-group>
          </div>
          <div class="search_placeholder" v-if="search.length <= 2"></div>
        </div>

        <transition-group
          name="play"
          tag="div"
          class="preview_players"
          v-if="mounted"
        >
          <div v-for="c in players" :key="c.player_number">
            <div class="chart_action_view">
              <div class="chart_action" id="chart_action_view" v-if="edit">
                <img
                  @click="subPlayer(c)"
                  src="https://cdn-icons-png.flaticon.com/512/929/929430.png"
                />
              </div>
              <div class="preview_player">
                <div>
                  <img id="preview_img" :src="c.img_url" />
                </div>
                <p>{{ c.player }}</p>
              </div>
            </div>
          </div>
        </transition-group>
        <div class="author_date">
          <p>{{ name }}</p>
          <p>{{ date }}</p>
        </div>
      </div>
      <div
        class="edit_chart_true_bottom"
        v-if="parseInt(author.id) === parseInt(currentUser.id) && edit"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/929/929430.png"
          @click="toggleEdit()"
        />
        <img
          @click="updateChart(parseInt(id))"
          src="https://cdn-icons-png.flaticon.com/512/148/148764.png"
        />
      </div>
      <div
        class="delete_chart"
        v-if="parseInt(author.id) === parseInt(currentUser.id)"
        @click="deleteChart(id)"
      ></div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import PlayerList from '../../data/players.json'
const StatList = require('../../data/stats.json')
import { updateChart } from '../Services/ChartServices'
import { getPlayersById } from '../Services/PlayerServices.js'

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
    },
    myChart: new Chart(),
    allStats: StatList,
    edit: false,
    allPlayers: PlayerList,
    search: '',
    loaded: false,
    mounted: false,
    name: ''
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
    async deleteChart(id) {
      this.$emit('toggleView')

      this.$emit('deleteChart', id)
    },
    async toggleView() {
      this.$emit('toggleView')
    },
    async toggleEdit() {
      if (this.edit) {
        this.edit = false
        await this.$emit('getCharts')
        // // await this.$emit('toggleView')
        // await this.$emit('toggleView')
        // this.$emit('updateChart')
        await this.makeChart(false)
        // await location.reload()
      } else {
        this.edit = true
        this.makeChart(true)
      }
    },
    async makeChart(edit) {
      this.loaded = false
      let ans = this.x.replaceAll(' ', '_')
      ans = ans.replaceAll('Per_Game', 'per_game')
      ans = ans.replaceAll('%', 'percent')
      if (ans[0] === '2' || ans[0] === '3') {
        ans = 'x' + ans
      }
      // if (this.myChart !== null) {
      await this.myChart.destroy()
      let ctx = document.getElementById(this.count)
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
        let colors = ['black', 'red', 'blue', 'green', 'orange']
        let data
        if (edit) {
          data = {
            label: this.players[i].player,
            data: stats.reverse(),
            fill: false,
            borderColor: colors[i],
            pointBackgroundColor: colors[i],
            tension: 0.1
          }
        } else {
          data = {
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
      if (!edit) {
        this.myChart = await new Chart(ctx, {
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
                text: this.subTitle,
                font: {
                  size: 20
                },
                color: 'black'
              }
            }
          },
          plugins: [plugin]
        })
        setTimeout(() => {
          this.loaded = true
        }, 3000)
      } else {
        this.myChart = await new Chart(ctx, {
          type: 'line',
          data: data,
          options: {
            radius: 4,
            hoverRadius: 8,
            responsive: true,
            maintainAspectRatio: true,
            animations: false,
            plugins: {
              legend: {
                position: 'top'
              }
            }
          },
          plugins: [plugin]
        })
        this.loaded = true
      }
    },
    deleteSearch() {
      this.search = ''
    },
    updateChart: async function (id) {
      let body = {
        title: this.title,
        author: this.author.id,
        player: this.players,
        y_year: true,
        x: this.x,
        description: this.description
      }
      await updateChart(body, id)
      this.edit = false
      await this.makeChart(false)
    },
    async handleChange(e) {
      await this.$emit('handleChange', e, parseInt(this.count))
      await this.makeChart(true)
    },
    async handleChangePlayer(players) {
      await this.$emit('handleChangePlayer', players, parseInt(this.count))
      await this.makeChart(true)
    },

    togglePlayer: async function (player) {
      let usePlayers = this.players
      if (
        !usePlayers.some((p) => p.player_number === parseInt(player.player_id))
      ) {
        let p = await getPlayersById(player.player_id)
        usePlayers.push(p)
        await this.handleChangePlayer(usePlayers)
      } else {
        let filterPlayers = []
        for (let i = 0; i < usePlayers.length; i++) {
          if (usePlayers[i].player_number !== parseInt(player.player_id)) {
            filterPlayers.push(usePlayers[i])
          }
        }
        usePlayers = filterPlayers
        await this.handleChangePlayer(usePlayers)
      }
    },
    async subPlayer(player) {
      let usePlayers = this.players
      let filterPlayers = []
      for (let i = 0; i < usePlayers.length; i++) {
        if (usePlayers[i].player_number !== parseInt(player.player_number)) {
          filterPlayers.push(usePlayers[i])
        }
      }
      usePlayers = filterPlayers
      await this.handleChangePlayer(usePlayers)
    }
  },
  mounted() {
    this.makeChart(false)
    this.mounted = true
    if (this.currentUser.id == this.author.id) {
      this.name = 'You'
    } else {
      this.name = this.author.name
    }
  }
}
</script>

<style>
.edit-enter-from,
.edit-leave-to {
  opacity: 0;
  transform: scale(0.5);
  transform: translateY(-5vh);
}

.edit-enter-to,
.edit-leave-from {
  opacity: 1;
  transform: scale(1);
}

.edit-enter-active,
.edit-leave-active {
  transition: all 0.4s ease;
}
.play-enter-from,
.play-leave-to {
  opacity: 0;
  transform: scale(0.5);
  transform: translateY(-10vh);
}

.play-move,
.play-enter-active,
.play-leave-active {
  transition: all 0.5s ease;
}
.play-leave-active {
  position: absolute;
}
</style>
