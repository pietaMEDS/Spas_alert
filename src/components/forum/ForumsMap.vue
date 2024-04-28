<script>
import axios from 'axios'
import { setIntervalAsync, clearIntervalAsync } from 'set-interval-async';

export default {
    name: "forums",
    data() {
        return{
            forumsDataList: []
        }
    },
    methods: {
        async updateForums(){
            try {
                const response = await axios.get('/src/Data/forums.json');
                if (typeof response.data == "object") {
                    this.forumsDataList = response.data;
                } else {
                    try {
                        this.forumsDataList = JSON.parse(response.data);
                    } catch (error) {
                        this.forumsDataList = {
                            "1": {
                                "id": 0,
                                "creator": null,
                                "name": "Произошли технические ошибки, Попытайтесь зайти позже",
                                "tags": "",
                                "Created": null,
                                "status": "ERROR PARSE: "+error
                            }
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        },
    },
    async created() {
        // setIntervalAsync(async() => {
        this.updateForums();
        setIntervalAsync(async() => {
            this.updateForums();
        },10000)
    }
}
</script>

<template>
    <div class="forums">
        <template v-for="item in forumsDataList">
            <router-link :to="{ name: 'forum', params: { id: item.id } }">
                <div class="name"> 
                    <h1>{{ item.name }}</h1> <p>{{ item.status }}</p>
                    <p>от {{ item.creator }}</p>
                    <p class="tags">{{ item.tags }}</p>
                </div>
            </router-link>
        </template>
    </div>
</template>

<style>
    .forum{
        border: 2px solid black;
        margin-bottom: 1lh;
    }
</style>