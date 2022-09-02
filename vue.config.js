const { defineConfig } = require('@vue/cli-service')
import dsv from '@rollup/plugin-dsv'
module.exports = defineConfig({
  transpileDependencies: true,
  plugins: [dsv()]
})
