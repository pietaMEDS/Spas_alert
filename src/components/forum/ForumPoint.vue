<script>
import axios from 'axios'

export default {


    data() {
        return {
            forumData: "",
            forumMessages:[],
            tags: []
        }
    },
    async created() {
        let param = this.$route.params.id

        //Информация о форуме
        try {
            const response = await axios.get('/src/Data/forums.json');
            this.forumData = response.data[param]
        } catch (error) {
            this.forumData = null;
            console.error(error);
        }

        //Ифнормация о сообщениях
        try {
            const response = await axios.get('/src/Data/messages.json');
            for (let index = 1; index < Object.keys(response.data).length+1; index++) {

            if (response.data[index].message_From == param) {
                this.forumMessages.push(response.data[index])
            }
            }
        }
         catch (error) {
            this.forumData = null;
            console.error(error);
        }
    }
}
</script>

<template>
    <div>
        <h1>{{this.forumData.name}}</h1>
        <p class="tags" v-for="item in this.forumData.tags">{{item}}</p>
    </div>
    <br>

    <template v-for="(item, index) in this.forumMessages" :key="index">
        <div>
            <div>User: {{item.creator}}</div>
            <div>message: {{item.text}}</div>
        </div>
    </template>
</template>