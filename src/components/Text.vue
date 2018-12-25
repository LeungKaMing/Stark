<template>
    <keep-alive>
        <p :style="style">{{text}}</p>
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
            text () {
                return !!this.data ? this.data.props.text : 'init text'
            }
        }
    }
</script>