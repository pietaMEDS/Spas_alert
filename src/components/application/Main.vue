<script>
import axios from 'axios'

export default {
    data() {
        return {
            regions:{},
            selected_region: ""
        }
    },
    async created() {
        try {
            const response = await axios.get('/src/Data/regions.json');
            this.regions = response.data;
        } catch (error) {
            console.error(error);
        }
    },
}
</script>

<template>
    <div>
        <form>
            <label for="applicant_name">Ваше ФИО:</label><br>
            <input name="applicant_name" type="text" id="applicant_name"><br>
            <br>
            <label for="missing_name">ФИО пропавшего</label><br>
            <input name="missing_name" type="text" id="missing_name"><br>
            <br>
            <label for="missing_sex">Пол пропавшего</label><br>
            <label for="male">Мужской</label>
            <input type="radio" name="missing_sex" id="male" value="male">
            <br>
            <label for="male">Женский</label>
            <input type="radio" name="missing_sex" id="female" value="female"><br>
            <br>
            <label for="missing_age">Возраст пропавшего</label><br>
            <input name="missing_age" type="number"><br>
            <br>
            <label for="missing_region">Область пропажи</label><br>
            <select v-model="selected_region" name="missing_region" id="missing_region">
                <option v-for="(item, index) in regions" :key="index" :value="item.name">{{ item.name }}</option>
            </select><br>
            <div v-if="this.selected_region">
                <label for="missing_city">Город пропажи</label><br>
                <select name="missing_city" id="missing_city">
                    <option v-for="(item, index) in regions[this.selected_region].city" :key="index" :value="item">{{ item }}</option>
                </select><br>
            </div>
            <div v-else="this.selected_region">
                <h3 style="color: red;">Выберите регион!</h3>
            </div>
            <br>
        </form>
    </div>
</template>

<style>
    
</style>