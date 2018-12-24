<template>
    <keep-alive>
        <img data-id="iamimg" :style="style" :src="src" />
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
                return !!this.data ? this.data.style : {}
            },
            src () {
                return !!this.data ? this.data.props.imgSrc : {}
            }
        }
    }
</script>