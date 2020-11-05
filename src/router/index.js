import Vue from 'vue'
import VueRouter from 'vue-router'
import Hall from '../views/Hall.vue'
import Room from '../views/Room.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'hall',
    component: Hall
  },
  {
    path: '/room/:id',
    name: 'room',
    component: Room
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
