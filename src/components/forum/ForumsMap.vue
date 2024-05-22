<script>
import axios from 'axios'
import { setIntervalAsync } from 'set-interval-async'

export default {
  name: 'forums',
  data() {
    return {
      forumsDataList: []
    }
  },
  methods: {
    async updateForums() {
      try {
        const response = await axios.get('/src/Data/forums.json')
        if (typeof response.data == 'object') {
          this.forumsDataList = response.data
        } else {
          try {
            this.forumsDataList = JSON.parse(response.data)
          } catch (error) {
            this.forumsDataList = {
              1: {
                id: 0,
                creator: null,
                name: 'Произошли технические ошибки, Попытайтесь зайти позже',
                tags: '',
                Created: null,
                status: 'ERROR PARSE: ' + error
              }
            }
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  async created() {
    // setIntervalAsync(async() => {
    this.updateForums()
    setIntervalAsync(async () => {
      this.updateForums()
    }, 10000)
  }
}
</script>

<template>
  <div class="forums">
    <div class="forum">
      <template v-for="item in forumsDataList">
        <router-link v-bind:to="{ name: 'forum', params: { id: item.id } }">
          <div class="board">
            <img width="75lvw" src="../../assets/ph.png" alt="">
            <h1>{{ item.name }}</h1>
            <div>
              <p class="status">{{ item.status }}</p>
            <!-- <p>от {{ item.creator }}</p> -->
            <p class="tags">{{ item.tags }}</p>
            </div>
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<style>
.board{
  display:flex;
}
.forums{
  padding-left: 10lvw;
  padding-right: 10lvw;
}
.forum {
  padding-left: 1lvw;
  padding-right: 1lvw;
  border-left: 4px solid red;
  border-right: 4px solid red;
}
.board div{
  width: 100%;
  text-align: end;
}
</style>
