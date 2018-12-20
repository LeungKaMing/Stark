<template>
  <div style="display: flex;">
    <!-- 菜单开始 -->
    <div class="menu__bar" >
      <draggable class="render__btn" v-model="menuList" :options="{group:'people'}" @sort="handleMenuSort">
        <div v-for="menuElement in menuList" :key="menuElement.id">
          {{menuElement.name}}
        </div>
      </draggable>
    </div>
    <!-- 菜单结束 -->
    <!-- 舞台区开始 -->
    <draggable class="stage__bar" v-model="contentList" :options="{group:'people'}" @sort="handleContentSort">
      <div class="stage__bar--btn" v-for="contentElement in contentList" :key="contentElement.id">
        <template v-if="contentElement.name === 'container'">
          <ContainerElement/>
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
    <div class="panel__bar">
      <!-- <el-button>提交</el-button> -->
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
  .render__btn {
    line-height: 50px;
    background: aquamarine;
    text-align: center;
  }
  
  /* 菜单 */
  .menu__bar {
    width: 300px; 
    background: red;
  }
  /* 舞台 */
  .stage__bar {
    display: flex; 
    flex-direction: column;
    margin: 0 10%; 
    max-width: 500px; 
    width: 500px;
    height: 300px; 
    background: pink;
  }
  /* .stage__bar--btn {
    width: 100%; 
    height: 100px;
  } */
  /* 面板 */
  .panel__bar {
    width: 300px; 
    height: 300px; 
    background: yellow;
  }
</style>

<script>
  import draggable from 'vuedraggable'
  import ContainerElement from '../components/Container'
  import ButtonElement from '../components/Button'
  import ImageElement from '../components/Image'
  import TextElement from '../components/Text'
  const nanoid = require('nanoid')

  // mock datasource
  window.datasource = {
    global: {},
    layers: {},
    pages: {},
    events: {},
    compons: []
  }

  export default {
    data () {
      return {
        initMenuList: [],
        buttonData: {
          style: {
            display: 'block',
            width: '100%',
            height: '100px',
            backgroundColor: 'green',
            fontSize: '12px'
          },
          props: {
            text: 'I am button.'
          }
        },
        imageData: {
          style: {
            width: '100%',
            height: '100px',
            backgroundColor: 'green',
            fontSize: '12px'
          },
          props: {
            imgSrc: 'https://avatars3.githubusercontent.com/u/18412359?s=40&v=4'
          }
        },
        textData: {
          style: {
            width: '100%',
            height: '100px',
            lineHeight: '100px',
            backgroundColor: 'green',
            fontSize: '12px',
            textAlign: 'center'
          },
          props: {
            text: 'I am text.'
          }
        },
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
          }
        ],
        contentList: [],
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
    created () {
      this.$data.initMenuList = this.$data.menuList
    },
    methods: {
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
      // core
      // 从菜单拖动任意组件时，都立即生成一个全新的菜单      
      handleMenuSort () {
        let temp = []
        this.$data.initMenuList.map((item) => {
          temp.push({
            id: nanoid(),
            name: item.name
          })
        })
        this.$data.menuList = temp
      },
      handleContentSort (evt) {
        console.log('<<<<<<<<<<<in content')
      }
    }
  }
</script>