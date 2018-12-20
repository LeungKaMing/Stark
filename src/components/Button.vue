<template>
    <keep-alive>
        <button data-id="iambutton" :style="data.style">{{ data.props.text }}</button>
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