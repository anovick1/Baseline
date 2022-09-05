import { createWebHistory, createRouter } from 'vue-router'
import ViewCharts from './pages/ViewCharts'
import HomePage from './pages/HomePage'
import CreateChart from './pages/CreateChart'

const routes = [
  { path: '/', component: HomePage, name: 'HomePage' },
  { path: '/charts', component: ViewCharts, name: 'ViewCharts' },
  { path: '/newchart', component: CreateChart, name: 'NewChart' }
  // { path: '/games/:genre_id', component: ViewGames, name: 'ViewGames' },
  // { path: '/details/:game_id', component: GameDetails, name: 'GameDetails' },
  // { path: '/about', component: AboutPage, name: 'AboutPage' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
