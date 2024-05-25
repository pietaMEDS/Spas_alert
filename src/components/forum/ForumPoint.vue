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
      parseErr: null,
      TempName: 'Undefined'
    }
  },
  methods: {
    async updateMessages() {
      try {
        axios
          .get('https://spas-alert.local', {
            params: {
              Action: 'get',
              Table: 'messages',
              Advanced: 'where message_From = ' + this.forumId + ' and status = 1'
            }
          })
          .then((response) => {
            try {
              this.forumMessages = response.data
            } catch (error) {
              console.error('Something went wrong')
            }
          })
          .catch((error) => {
            this.forumMessages = {
              1: {
                id: null,
                creator: null,
                message_From: null,
                message_To: null,
                text: '<h1>Something went wrong!<h1>',
                Created: null,
                status: null
              }
            }
          })
      } catch (error) {}
    },
    GetUser(userID) {
      axios
        .get('https://spas-alert.local', {
          params: {
            Action: 'get',
            Table: 'users',
            Advanced: 'where id = ' + userID
          }
        })
        .then((response) => {
          this.TempName = response.data[0].name
        })

      return this.TempName
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
      <div>User: {{ GetUser(item.creator) }}</div>
      <div>message: {{ item.text }}</div>
    </div>
  </template>
</template>
