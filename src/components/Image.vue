<template>
    <keep-alive>
        <img :style="data.style" :src="imgSrc" />
    </keep-alive>
</template>

<style scoped>

</style>

<script>
    export default {
        props: {
            data: Object
        },
        data () {
            return {
                imgSrc: 'https://avatars3.githubusercontent.com/u/18412359?s=40&v=4'
            }
        }
    }
</script>