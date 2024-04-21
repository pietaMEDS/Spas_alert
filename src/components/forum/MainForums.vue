<script setup>
    import axios from 'axios';
        try {
            const response = await axios.get('backend/DataBaseInfo/forums.php');
            console.log(response);
        } catch (error) {
            console.error(error);
        }
</script>

<template>

</template>