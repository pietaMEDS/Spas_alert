<script>
import axios from 'axios'

export default {
  data() {
    return {
      regions: {},
      selected_region: '',
      police: false
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
    submit() {
      console.log('sent!')
      this.$router.push('/forum')
    }
  }
}
</script>

<template>
  <div>
    <form>
      <label for="applicant_name">Ваше ФИО:</label><br />
      <input name="applicant_name" type="text" id="applicant_name" /><br />
      <br />
      <label for="missing_name">ФИО пропавшего:</label><br />
      <input name="missing_name" type="text" id="missing_name" /><br />
      <br />
      <label for="missing_sex">Пол пропавшего:</label><br />
      <input type="radio" name="missing_sex" id="male" value="male" />
      <label for="male">Мужской</label>
      <br />
      <input type="radio" name="missing_sex" id="female" value="female" />
      <label for="female">Женский</label>
      <br />
      <br />
      <label for="missing_age">Возраст пропавшего:</label><br />
      <input name="missing_age" type="number" /><br />
      <br />
      <label for="missing_region">Область пропажи:</label><br />
      <select v-model="selected_region" name="missing_region" id="missing_region">
        <option v-for="(item, index) in regions" :key="index" :value="item.name">
          {{ item.name }}
        </option></select
      ><br />
      <div v-if="this.selected_region">
        <label for="missing_city">Город пропажи:</label><br />
        <select name="missing_city" id="missing_city">
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
        <textarea name="missing_city_advanced" cols="30"></textarea><br />
        <br />
      </div>
      <div v-else>
        <h3 style="color: red">Выберите регион!</h3>
        <br />
      </div>
      <label for="missing_date">Дата пропажи:</label><br />
      <input name="missing_date" type="date" /><br />
      <br />
      <label for="missing_time">Время пропажи:</label><br />
      <input name="missing_time" type="time" /><br />
      <br />
      <label for="police">Вы подавали заявление в полицию?</label><br />
      <input v-model="police" type="radio" name="police" id="police_yes" value="true" />
      <label for="police_yes">Да</label><br />
      <input v-model="police" type="radio" name="police" id="police_no" value="false" />
      <label for="police_no">Нет</label><br />
      <div v-if="police == 'true'">
        <label for="police_number">Номер заявления:</label><br />
        <input type="text" name="police_number" id="police_number" /><br />
      </div>
      <br />
      <label for="missing_wear">Во что был одет пропавший:</label><br />
      <textarea name="missing_wear" id="missing_wear" cols="30"></textarea><br />
      <br />
      <label for="missing_special">Особые приметы:</label><br />
      <textarea name="missing_special" id="missing_special" cols="30"></textarea><br />
      <br />
      <label for="missing_special">Дополнительная информация:</label><br />
      <textarea name="missing_special" id="missing_special" rows="10" cols="30"></textarea><br />
      <br />
      <div @click="submit" class="btn btn-primary">Подать заявление</div>
    </form>
  </div>
</template>

<style></style>
