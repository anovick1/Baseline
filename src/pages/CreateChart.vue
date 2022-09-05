<template>
  <div class="home_section">
    <h1>Create Chart</h1>
    <div class="chart_border" id="chart_border_create">
      <div class="chart_container" id="chart_container_create">
        <canvas id="chart" width="1vw" height="5vw"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateChart',
  data: () => ({
    title: String,
    players: Array,
    year: Boolean,
    x: String,
    likes: Array,
    comments: Array,
    author: String,
    count: String
  })
}
</script>

<style></style>
