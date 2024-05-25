<script>
import axios from 'axios'
import { setIntervalAsync } from 'set-interval-async'

export default {
  name: 'forums',
  data() {
    return {
      forumsDataList: [],
      TempName: "Undefined"
    }
  },
  methods: {
    async updateForums() {
      try {
        axios
          .get('https://spas-alert.local', {
            params: {
              Action: 'get',
              Table: 'forums'
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
      } catch (error) {}
    },
    async GetUser(userID) {
      let name = "Undefined";
      if (userID == null) {
        return name
      }
      // console.log(userID);
      // console.log(name);
    
    try {
    const response = axios.get('https://spas-alert.local', {
          params: {
            Action: 'get',
            Table: 'users',
            Advanced: 'where id = ' + userID
          }
    }
    )
    if (response) {
      // name = response.data[0].name;
      // return name;
    }
    // console.log(typeof response[0]);
    // console.log(response);
    
    // name = response.data[0].name;
    } catch (error) {
    console.error(error);
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
        <router-link v-bind:to="{ name: 'forum', params: { id: item.id } }">
          <div class="board">
            <img width="75lvw" :src="item.path" alt="" />
            <h1>{{ item.name }}</h1>
            <div>
              <p class="status">{{ item.status }}</p>
              <p>от {{ GetUser(item.creator).data }}</p>
              <p class="tags">{{ item.tags }}</p>
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
