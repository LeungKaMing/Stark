<template>
    <keep-alive>
        <p>I am imagePannel.</p>
		<el-form ref="form" :model="curComponItem" label-width="120px">
			<el-form-item label="宽">
				<el-input v-model="curComponItem.data.style.width" placeholder="200px" style="width: 87%;"></el-input>
			</el-form-item>
			<el-form-item label="高">
				<el-input v-model="curComponItem.data.style.height" placeholder="50px" style="width: 87%;"></el-input>
			</el-form-item>
			<el-form-item label="图片来源">
				<el-input v-model="curComponItem.data.props.imgSrc" style="width: 87%;"></el-input>
			</el-form-item>
		</el-form>
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
			curComponItem () {
				return this.pannelData
			}
        },
        created () {
        }
    }
</script>