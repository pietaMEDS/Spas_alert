<script>
import axios from 'axios'
import { setIntervalAsync } from 'set-interval-async'
import { useLoggerStore } from '@/stores/Auth.js'

const LoggerStore = useLoggerStore()

export default {
  data() {
    return {
      forumId: this.$route.params.id,
      forumData: '',
      tags: [],
      parseErr: null,
      TempName: 'Undefined',

      file: '',
      regions: {},
      selected_region: '',
      police: false,
      applicant_name: '',
      missing_name: '',
      missing_sex: '',
      missing_age: 0,
      missing_city: '',
      missing_date: '',
      missing_time: '',
      police_number: '',
      missing_wear: '',
      missing_special: '',
      missing_extension: '',
      ext_city: ''
    }
  },
  methods: {
    submit() {
      axios
        .get('https://spas-alert.local', {
          params: {
            Action: 'edit',
            Table: 'forums',
            Advanced:
              'Set selected_region = "' +
              this.selected_region +
              '", police = "' +
              this.police +
              '", applicant_name = "' +
              this.applicant_name +
              '", missing_name = "' +
              this.missing_name +
              '", missing_sex = "' +
              this.missing_sex +
              '", missing_age = "' +
              this.missing_age +
              '", missing_city = "' +
              this.missing_city +
              '", missing_date = "' +
              this.missing_date +
              '", missing_time = "' +
              this.missing_time +
              '", police_number = "' +
              this.police_number +
              '", missing_wear = "' +
              this.missing_wear +
              '", missing_special = "' +
              this.missing_special +
              '", missing_extension = "' +
              this.missing_extension +
              '", ext_city = "' +
              this.ext_city +
              '"  where id = ' +
              this.forumId
          }
        })
        .then((response) => {
          console.log(response.data)
          if (response.data[0] == 'Fine') {
            this.$router.push('/forum')
          }
        })
    }
  },
  mounted() {
    if (LoggerStore.isLogged) {
      axios
        .get('https://spas-alert.local', {
          params: {
            Action: 'get',
            Table: 'users',
            Advanced: 'where public_key = ' + LoggerStore.publicKey
          }
        })
        .then((response) => {
          console.log(response.data)
        })
    } else {
      this.$router.push('/404')
    }
  },
  async created() {
    //Информация о форуме
    try {
      const response = await axios.get('/src/Data/regions.json')
      this.regions = response.data
    } catch (error) {
      console.error(error)
    }

    axios
      .get('https://spas-alert.local', {
        params: {
          Action: 'get',
          Table: 'forums',
          Advanced: 'where id = ' + this.forumId
        }
      })
      .then((response) => {
        // this.file = '',
        // this.regions = {},
        this.selected_region = response.data[0].selected_region
        this.police = response.data[0].police
        this.applicant_name = response.data[0].applicant_name
        this.missing_name = response.data[0].missing_name
        this.missing_sex = response.data[0].missing_sex
        this.missing_age = response.data[0].missing_age
        this.missing_city = response.data[0].missing_city
        this.missing_date = response.data[0].missing_date
        this.missing_time = response.data[0].missing_time
        this.police_number = response.data[0].police_number
        this.missing_wear = response.data[0].missing_wear
        this.missing_special = response.data[0].missing_special
        this.missing_extension = response.data[0].missing_extension
        this.ext_city = response.data[0].ext_city
      })
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

  <div>
    <form>
      <label for="applicant_name">Ваше ФИО:</label><br />
      <input v-model="applicant_name" name="applicant_name" type="text" id="applicant_name" /><br />
      <br />
      <label for="missing_name">ФИО пропавшего:</label><br />
      <input v-model="missing_name" name="missing_name" type="text" id="missing_name" /><br />
      <br />
      <!-- <div>
        <label for="path"></label>
        <input type="file" @change="handleFileChange" />
      </div> -->
      <label for="missing_sex">Пол пропавшего:</label><br />
      <input v-model="missing_sex" type="radio" name="missing_sex" id="male" value="male" />
      <label for="male">Мужской</label>
      <br />
      <input v-model="missing_sex" type="radio" name="missing_sex" id="female" value="female" />
      <label for="female">Женский</label>
      <br />
      <br />
      <label for="missing_age">Возраст пропавшего:</label><br />
      <input v-model="missing_age" name="missing_age" type="number" /><br />
      <br />
      <label for="missing_region">Область пропажи:</label><br />
      <select v-model="selected_region" name="missing_region" id="missing_region">
        <option v-for="(item, index) in regions" :key="index" :value="item.name">
          {{ item.name }}
        </option></select
      ><br />
      <div v-if="this.selected_region">
        <label for="missing_city">Город пропажи:</label><br />
        <select v-model="missing_city" name="missing_city" id="missing_city">
          <option
            v-for="(item, index) in regions[this.selected_region].city"
            :key="index"
            :value="item"
          >
            {{ item }}
          </option></select
        ><br />
      </div>

      <div v-if="this.selected_region">
        <label for="missing_city_advanced">Дополнительные данные о местности пропажи:</label><br />
        <textarea v-model="ext_city" name="missing_city_advanced" cols="30"></textarea><br />
        <br />
      </div>
      <div v-else>
        <h3 style="color: red">Выберите регион!</h3>
        <br />
      </div>
      <label for="missing_date">Дата пропажи:</label><br />
      <input v-model="missing_date" name="missing_date" type="date" /><br />
      <br />
      <label for="missing_time">Время пропажи:</label><br />
      <input v-model="missing_time" name="missing_time" type="time" /><br />
      <br />
      <label for="police">Вы подавали заявление в полицию?</label><br />
      <input v-model="police" type="radio" name="police" id="police_yes" value="true" />
      <label for="police_yes">Да</label><br />
      <input v-model="police" type="radio" name="police" id="police_no" value="false" />
      <label for="police_no">Нет</label><br />
      <div v-if="police == 'true'">
        <label for="police_number">Номер заявления:</label><br />
        <input v-model="police_number" type="text" name="police_number" id="police_number" /><br />
      </div>
      <br />
      <label for="missing_wear">Во что был одет пропавший:</label><br />
      <textarea v-model="missing_wear" name="missing_wear" id="missing_wear" cols="30"></textarea
      ><br />
      <br />
      <label for="missing_special">Особые приметы:</label><br />
      <textarea
        v-model="missing_special"
        name="missing_special"
        id="missing_special"
        cols="30"
      ></textarea
      ><br />
      <br />
      <label for="missing_extension">Дополнительная информация:</label><br />
      <textarea
        v-model="missing_extension"
        name="missing_extension"
        id="missing_extension"
        rows="10"
        cols="30"
      ></textarea
      ><br />
      <br />
      <div @click="submit" class="btn btn-primary">Сохранить изменения</div>
    </form>
  </div>
</template>
