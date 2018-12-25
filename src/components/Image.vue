<template>
    <keep-alive>
        <img :style="style" :src="src" />
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
            }
        },
        computed: {
            style () {
                return !!this.data ? this.data.style : {width: '100%', height: '100%'}
            },
            src () {
                return !!this.data ? this.data.props.imgSrc : {}
            }
        }
    }
</script>