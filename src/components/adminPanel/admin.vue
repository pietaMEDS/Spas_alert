<script>
import axios from 'axios'
import { useLoggerStore } from '@/stores/Auth.js'

const LoggerStore = useLoggerStore()

export default {
  data() {
    return {
      usersCount: 0,
      forumsCount: 0
    }
  },
  created() {
    axios
      .get('https://spas-alert.local', {
        params: {
          Action: 'count',
          Table: 'users'
        }
      })
      .then((response) => {
        this.usersCount = response.data[0]['Count(*)']
      })

    axios
      .get('https://spas-alert.local', {
        params: {
          Action: 'count',
          Table: 'forums'
        }
      })
      .then((response) => {
        this.forumsCount = response.data[0]['Count(*)']
      })
  }
}
</script>

<template>
  <main style="display: flex; justify-content: space-around; margin-top: 2lvh">
    <div style="width: 100%; display: flex; justify-content: space-around" class="cards">
      <div style="height: 25lvh; width: 25lvw; padding-top: 2lvh" class="card">
        <div style="display: flex; justify-content: center">
          <img style="width: 15lvw" src="../../assets/users.png" alt="users" />
        </div>
        <div style="display: flex; justify-content: center">
          <span class="card-title">Количество пользователей: {{ this.usersCount }}</span>
        </div>
      </div>

      <div style="height: 25lvh; width: 25lvw; padding-top: 2lvh" class="card">
        <div style="display: flex; justify-content: center">
          <img style="width: 15lvw" src="../../assets/forums.png" alt="users" />
        </div>
        <div style="display: flex; justify-content: center">
          <span class="card-title">Количество заявок: {{ this.forumsCount }}</span>
        </div>
      </div>
    </div>
  </main>
</template>

<style></style>
