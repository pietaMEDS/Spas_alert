<script>
import axios from 'axios'

export default {
    data() {
        return {
            phrase:""
        }
    },
    async created() {
        try {
            const response = await axios.get('/src/Data/landing.json');

            this.phrase = response.data.phrase;
        } catch (error) {
            console.error(error);
        }
    }
}
</script>

<template>
    <div>
        <h1>{{ phrase }}</h1><br>
        <pre>Поисково-Спасательный отряд "Спасатели" поможет найти тех кто был близок</pre>
        <router-link to="application">Оставить заявку!</router-link>
    </div>
</template>

<style>
    
</style>