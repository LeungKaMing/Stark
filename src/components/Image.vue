<template>
    <keep-alive>
        <img :style="propStyle" :src="propSrc" :alt="propSrc" />
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
			propStyle () {
				return !!this.data.style.width && !!this.data.style.height && !!this.data.props.imgSrc ? this.data.style : {...this.data.style, width: '100%', height: '100px', backgroundColor: '#ccc', fontSize: '20px'}   // 否定条件一定要把原来条件也带上，要不然不会绑定，双向更新数据
			},
			propSrc () {
				return !!this.data.style.width && !!this.data.style.height && !!this.data.props.imgSrc ? this.data.props.imgSrc : {...this.data.props, imgSrc: 'IMAGE组件需要设置宽高和文案，否则不能正常渲染'}.imgSrc   // 否定条件一定要把原来条件也带上，要不然不会绑定，双向更新数据
			}
        }
    }
</script>