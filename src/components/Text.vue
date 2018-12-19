<template>
    <keep-alive>
        <p>{{ text }}</p>
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
                text: 'I am text.'
            }
        }
    }
</script>