<script>
import axios from 'axios'
import { setIntervalAsync } from 'set-interval-async'
import { useLoggerStore } from '@/stores/Auth.js'

const LoggerStore = useLoggerStore()

export default {
  name: 'forums',
  data() {
    return {
      isAdmin: false,
      Advanced: 'where status = 1',
      forumsDataList: [],
      TempName: 'Undefined'
    }
  },
  methods: {
    async updateForums() {
      try {
        if (LoggerStore.isLogged) {
          axios
            .get('https://spas-alert.local', {
              params: {
                Action: 'get',
                Table: 'users',
                Advanced: 'where public_key = "' + LoggerStore.publicKey + '"'
              }
            })
            .then((response) => {
              if (response.data[0].role == 2 || response.data[0].role == 3) {
                this.isAdmin = true
                this.Advanced = ''
              } else {
                this.Advanced = 'where status = 1'
              }
              axios
                .get('https://spas-alert.local', {
                  params: {
                    Action: 'get',
                    Table: 'forums',
                    Advanced: this.Advanced
                  }
                })
                .then((response) => {
                  try {
                    this.forumsDataList = response.data
                  } catch (error) {
                    console.error('Something went wrong')
                  }
                })
                .catch((error) => {
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
                })
            })
        } else {
          axios
            .get('https://spas-alert.local', {
              params: {
                Action: 'get',
                Table: 'forums',
                Advanced: this.Advanced
              }
            })
            .then((response) => {
              try {
                this.forumsDataList = response.data
              } catch (error) {
                console.error('Something went wrong')
              }
            })
            .catch((error) => {
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
            })
        }
      } catch (error) {
        console.error(error)
      }
    },
    async GetUser(userID) {
      let name = 'Undefined'
      if (userID == null) {
        return name
      }
      try {
        const response = axios.get('https://spas-alert.local', {
          params: {
            Action: 'get',
            Table: 'users',
            Advanced: 'where id = ' + userID
          }
        })
        if (response) {
          console.log(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
  },
  async created() {
    this.updateForums()
    setIntervalAsync(async () => {
      this.updateForums()
      // console.log(this.forumsDataList);
    }, 10000)
  }
}
</script>

<template>
  <div class="forums">
    <div class="forum">
      <template v-for="(item, index) in forumsDataList">
        <router-link class="card" v-bind:to="{ name: 'forum', params: { id: item.id } }">
          <div class="board">
            <img width="75lvw" :src="item.path" alt="" />
            <h1>{{ item.name }}</h1>
            <div>
              <p class="status">{{ item.status }}</p>
            </div>
            <div v-if="this.isAdmin">
              <router-link
                v-bind:to="{ name: 'edit', params: { id: item.id } }"
                class="btn btn-primary"
                style="width: 10lvw; position: relative; right: -lvw"
              >
                Редактировать
              </router-link>
            </div>
          </div>
        </router-link>
      </template>
    </div>
  </div>
</template>

<style>
.board {
  display: flex;
}
.forums {
  padding-left: 10lvw;
  padding-right: 10lvw;
}
.forum {
  padding-left: 1lvw;
  padding-right: 1lvw;
  border-left: 4px solid rgb(57, 96, 255);
  border-right: 4px solid rgb(57, 96, 255);
}
.board div {
  position: absolute;
  width: 75%;
  text-align: end;
}
</style>
