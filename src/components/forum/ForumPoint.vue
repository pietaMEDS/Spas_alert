<script>
import axios from 'axios'
import { setIntervalAsync } from 'set-interval-async'

export default {
  data() {
    return {
      forumId: this.$route.params.id,
      forumData: '',
      forumMessages: [],
      tags: [],
      parseErr: null
    }
  },
  methods: {
    async updateMessages() {
      try {
        const response = await axios.get('/src/Data/messages.json')
        if (typeof response.data == 'object') {
          this.parseErr = false
          let responseData = []
          for (let index = 1; index < Object.keys(response.data).length + 1; index++) {
            if (response.data[index].message_From == this.forumId) {
              responseData.push(response.data[index])
            }
          }
          this.forumMessages = responseData
        } else {
          try {
            this.forumsDataList = JSON.parse(response.data)
          } catch (error) {
            this.parseErr = error
          }
        }
      } catch (error) {
        this.forumData = null
        console.error(error)
      }
    }
  },
  async created() {
    //Информация о форуме
    try {
      const response = await axios.get('/src/Data/forums.json')
      this.forumData = response.data[this.forumId]
    } catch (error) {
      this.forumData = null
      console.error(error)
    }

    this.updateMessages()

    setIntervalAsync(async () => {
      this.updateMessages()
    }, 4000)
  },
  computed: {
    checkTag() {
      if (typeof this.forumData.tags == 'object') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<template>
  <div>
    <h1>{{ this.forumData.name }}</h1>
    <p class="tags" v-if="checkTag" :key="item" v-for="item in this.forumData.tags">{{ item }}</p>
  </div>
  <br />

  <div v-if="this.parseErr" style="color: rgb(0, 189, 126)">
    <h1>Возникли технические ошибки при обновлении, попытайтесь позже!</h1>
    <pre> ERROR PARSE: {{ parseErr }}</pre>
  </div>

  <template v-for="(item, index) in this.forumMessages" :key="index">
    <div>
      <div>User: {{ item.creator }}</div>
      <div>message: {{ item.text }}</div>
    </div>
  </template>
</template>
