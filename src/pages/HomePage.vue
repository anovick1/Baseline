<template>
  <div>home</div>
  <h1>{{ players[5000].player }}</h1>
  <img :src="players[3001].img_url" />
</template>

<script>
import data from '../../data/players.json'
export default {
  name: 'HomePage',
  data: () => ({
    players: data
  }),
  mounted: async function () {
    // await this.setPlayers()
  },
  methods: {}
}
</script>

<style></style>
