<template>
    <keep-alive>
        <button data-id="iambutton" :style="style">i am button.</button>
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
            style: function () {
                return !!this.data ? this.data.style : {}
            }
        },
        craeted () {
        }
    }
</script>