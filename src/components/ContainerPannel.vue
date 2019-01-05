<template>
    <keep-alive>
        <p>I am containerPannel.</p>
    </keep-alive>
</template>

<style scoped>

</style>

<script>
    export default {
        props: {
            pannelData: Object
        },
        data () {
            return {
            }
        },
        computed: {
        },
        created () {
            console.log(this.pannelData, 'in containerPannel')
        }
    }
</script>