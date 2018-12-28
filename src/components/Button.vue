<template>
    <keep-alive>
        <button :style="style"><i :class="icon" v-show="leftHidden"></i>{{ text }}<i :class="icon" v-show="rightHidden"></i></button>
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
                leftHidden: true,
                rightHidden: true
            }
        },
        computed: {
            style () {
                return !!this.data ? this.data.style : {width: '100%', height: '100%'}
            },
            text () {
                return !!this.data ? this.data.props.text : 'init button'
            },
            icon () {
                !!this.data.style.float ? (this.leftHidden = false,this.rightHidden = true) : (this.rightHidden = false,this.leftHidden = true)
                return !!(this.data.style && this.data.style.icon) ? `${this.data.style.icon}` : '';
            }
        }
    }
</script>