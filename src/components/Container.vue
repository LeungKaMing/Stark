<template>
    <keep-alive>
        <div :style="data.style">
          <slot></slot>
        </div>
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