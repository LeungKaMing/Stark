<template>
    <keep-alive>
        <button>{{ data.text }}</button>
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
        }
    }
</script>