<script>
import axios from 'axios'
import { useLoggerStore } from '@/stores/Auth.js'

const LoggerStore = useLoggerStore()

export default {
  data() {
    return {
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
  async created() {
    try {
      const response = await axios.get('/src/Data/regions.json')
      this.regions = response.data
    } catch (error) {
      console.error(error)
    }
  },
  methods: {
    //   handleFileChange(event) {
    //   this.file = this.$refs.file.files[0];
    //   let formData = new FormData();
    //   formData.append('file', this.file);

    //   axios.post('https://spas-alert.local',
    //     formData,
    //     {
    //       headers: {
    //           'Content-Type': 'multipart/form-data'
    //       }
    //     }
    //   ).then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch(function(){
    //     console.log('FAILURE!!');
    //   });
    // },
    submit() {
      axios
        .get('https://spas-alert.local', {
          params: {
            Action: 'create',
            Table: 'forums',
            public_key: LoggerStore.publicKey,
            selected_region: this.selected_region,
            police: this.police,
            applicant_name: this.applicant_name,
            missing_name: this.missing_name,
            missing_sex: this.missing_sex,
            missing_age: this.missing_age,
            missing_city: this.missing_city,
            missing_date: this.missing_date,
            missing_time: this.missing_time,
            police_number: this.police_number,
            missing_wear: this.missing_wear,
            missing_special: this.missing_special,
            missing_extension: this.missing_extension,
            ext_city: this.ext_city
          }
        })
        .then((response) => {
          console.log(response.data)
        })
    }
  }
}
</script>

<template>
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
      <div @click="submit" class="btn btn-primary">Подать заявление</div>
    </form>
  </div>
</template>

<style></style>
