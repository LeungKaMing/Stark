<template>
    <keep-alive>
        <p data-id="iamtext" :style="style">I am text.</p>
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
            }
        }
    }
</script>