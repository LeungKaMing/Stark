<template>
    <keep-alive>
        <button :style="propStyle">
            <i :class="propIcon" v-show="leftHidden"></i>
            {{ propText }}
            <i :class="propIcon" v-show="rightHidden"></i>
        </button>
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
			propStyle () {
				return !!this.data.style.width && !!this.data.style.height && !!this.data.props.text ? this.data.style : {...this.data.style, width: '100%', height: '100px', backgroundColor: '#ccc', fontSize: '20px'}   // 否定条件一定要把原来条件也带上，要不然不会绑定，双向更新数据
			},
			propText () {
				return !!this.data.style.width && !!this.data.style.height && !!this.data.props.text ? this.data.props.text : {...this.data.props, text: 'BUTTON组件需要设置宽高和文案，否则不能正常渲染'}.text   // 否定条件一定要把原来条件也带上，要不然不会绑定，双向更新数据
			},
			propIcon () {
				if (!!this.data.style.float) {
						// 右边显示icon
						this.leftHidden = false
						this.rightHidden = true
				} else {
						// 左边显示icon
						this.leftHidden = true
						this.rightHidden = false
				}
				return this.data.style.icon ? `${this.data.style.icon}` : '';
			}
		}
	}
</script>