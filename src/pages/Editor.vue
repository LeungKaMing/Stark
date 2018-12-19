<template>
  <div style="display: flex;">
    <!-- 菜单开始 -->
    <draggable style="width: 300px; background: red;" :list="menuList" :options="{group:'people'}">
      <div class="menu__btn" v-for="menuElement in menuList" :key="menuElement.id">
        {{menuElement.name}}
      </div>
    </draggable>
    <!-- 菜单结束 -->
    <!-- 舞台区开始 -->
    <draggable style="display: flex; flex-wrap: wrap; margin: 0 10%; min-width: 500px; height: 300px; background: pink;" :list="contentList" :options="{group:'people'}" @sort="handleContentSort">
      <div style="min-width: 250px; height: 100px;" v-for="contentElement in contentList" :key="contentElement.id">
        <template v-if="contentElement.name === 'container'">
          <ContainerElement :data="containerData">
            <draggable style="display: flex; flex-wrap: wrap; margin: 0 10%; width: 100px; height: 100px; background: red;" :list="containerList" :options="{group:'people'}">
              <div class="menu__btn" v-for="containerElement in containerList" :key="containerElement.id">
                {{containerElement.name}}
              </div>
            </draggable>
          </ContainerElement>
        </template>
        <template v-if="contentElement.name === 'button'">
          <ButtonElement :data="buttonData" />
        </template>
        <template v-if="contentElement.name === 'img'">
          <ImageElement :data="imageData" />
        </template>
        <template v-if="contentElement.name === 'text'">
          <TextElement :data="textData" />
        </template>
      </div>
    </draggable>
    <!-- 舞台区结束 -->
    <!-- 面板开始 -->
    <div style="width: 300px; height: 300px; background: yellow;">
      <el-button @click="demo">提交</el-button>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 面板结束 -->
  </div>
</template>

<style scoped>
  .menu__btn {
    width: 50px;
    height: 50px;
    line-height: 50px;
    background: aquamarine;
    text-align: center;
  }
</style>

<script>
  import draggable from 'vuedraggable'
  import ContainerElement from '../components/Container'
  import ButtonElement from '../components/Button'
  import ImageElement from '../components/Image'
  import TextElement from '../components/Text'

  export default {
    data () {
      return {
        containerData: {
          style: {
            display: 'flex',
            justifyContent: 'space-around'
          }
        },
        buttonData: {
          style: {
            backgroundColor: 'green',
            fontSize: '12px'
          },
          props: {
            text: 'I am button.'
          }
        },
        imageData: {imgSrc: 'https://avatars3.githubusercontent.com/u/18412359?s=40&v=4'},
        textData: {text: 'I am text.'},
        menuList: [
          {
            id: 1,
            name: 'button'
          },
          {
            id: 2,
            name: 'img'
          },
          {
            id: 3,
            name: 'text'
          },
          {
            id: 4,
            name: 'container'
          },
          {
            id: 5,
            name: 'button'
          },
          {
            id: 6,
            name: 'img'
          },
          {
            id: 7,
            name: 'text'
          },
        ],
        contentList: [],
        containerList: [],
        // 右侧属性面版
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    components: {
      draggable,
      ContainerElement: () => import('../components/Container'),
      ButtonElement: () => import('../components/Button'),
      ImageElement: () => import('../components/Image'),
      TextElement: () => import('../components/Text')
    },
    methods: {
      demo () {
        this.$data.buttonData.text = 'I am changed.'
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleContentSort () {
        console.log(this.$data.contentList, '<<<<<<ready to set in datasource')
      }
    }
  }
</script>