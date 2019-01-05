<template>
    <keep-alive>
        <p>I am buttonPannel.</p>
        <el-form ref="form" :model="curComponItem" label-width="120px">
            <el-form-item label="宽">
                <el-input v-model="curComponItem.data.style.width" placeholder="200px" style="width: 87%;"></el-input>
            </el-form-item>
            <el-form-item label="高">
                <el-input v-model="curComponItem.data.style.height" placeholder="50px" style="width: 87%;"></el-input>
            </el-form-item>
            <el-form-item label="行高">
                <el-input v-model="curComponItem.data.style.lineHeight" placeholder="50px" style="width: 87%;"></el-input>
            </el-form-item>
            <el-form-item label="背景色">
                <el-input v-model="curComponItem.data.style.backgroundColor" placeholder="#b3df53" style="width: 87%;"></el-input>
            </el-form-item>
            <el-form-item label="字体大小">
                <el-input v-model="curComponItem.data.style.fontSize" placeholder="#b3df53" style="width: 87%;"></el-input>
            </el-form-item>
            <el-form-item label="文字排布">
                <el-input v-model="curComponItem.data.style.textAlign" placeholder="#b3df53" style="width: 87%;"></el-input>
            </el-form-item>
            <el-form-item label="边框">
                <el-input v-model="curComponItem.data.style.border" placeholder="1px solid #eee" style="width: 87%;"></el-input>
            </el-form-item>
            <el-form-item label="圆角">
                <el-input v-model="curComponItem.data.style.borderRadius" placeholder="3px" style="width: 87%;"></el-input>
            </el-form-item>
            <el-form-item label="图标">
                <el-input v-model="curComponItem.data.style.icon" placeholder="el-icon-search" style="width: 87%;"></el-input>
                <el-switch v-model="curComponItem.data.style.float" active-text="靠右" inactive-text="靠左"></el-switch>
            </el-form-item>
            <!-- 通过v-model绑定属性curComponItem，而curComponItem又是通过外部从window.data.compons这个数组中筛选的项传入的，所以这里的改变会实时双向同步到window.data.compons的筛选项 ==> 换句话来说，这里更新方法就没必要了！ -->
            <!-- <el-form-item>
                <el-button type="primary" @click="handleUpdataComp">更新组件</el-button>
            </el-form-item> -->
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
        },
        methods: {
            // 多余了
            // handleUpdataComp () {
            //     console.log('update>>>>', this.curComponItem, this.pannelData)
            // }
        }
    }
</script>