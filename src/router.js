import { createWebHistory, createRouter } from 'vue-router'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CreateChart from './pages/CreateChart'

const routes = [
  { path: '/', component: HomePage, name: 'HomePage' },
  { path: '/login', component: LoginPage, name: 'LoginPage' },
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
