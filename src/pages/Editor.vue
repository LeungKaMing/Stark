<template>
  <div class="editor__area">
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
    <draggable class="stage__bar" :list="contentList" :options="{group:'people'}">
      <div class="stage__bar--btn" v-for="contentElement, contentIndex in contentList" :key="contentElement.id" @click="handleShowPanel(contentElement)">
        <template v-if="contentElement.name === 'container'">
          <ContainerElement :rootIndex="contentIndex" :data="contentElement" :cb="handleSonShowPanel" />
        </template>
        <template v-else>
          <component :is="`${contentElement.name.substring(0, 1).toUpperCase()}${contentElement.name.substring(1)}Element`" :data="contentElement.data"></component>
        </template>
      </div>
    </draggable>
    <!-- 舞台区结束 -->
    <!-- 面板开始 -->
    <div class="panel__bar" v-if="panelSwitch">
      <!-- 当前选中组件的属性，这个属性是用来同步到组件的 -->
      <component :is="`${curComponItem.name}Pannel`" :pannelData="curComponItem"></component>
    </div>
    <!-- 面板结束 -->
  </div>
</template>

<style scoped>
  .editor__area {
    display: flex; 
    align-items: flex-start; 
  }

  .render__btn {
    line-height: 50px;
    background: aquamarine;
    text-align: center;
  }
  
  /* 菜单 */
  .menu__bar {
    width: 300px; 
    height: 500px;
  }
  /* 舞台 */
  .stage__bar {
    display: flex; 
    flex-direction: column;
    margin: 0 10%; 
    max-width: 500px; 
    width: 500px;
    height: 500px;
    overflow: scroll;
  }
  .stage__bar--btn {
    height: 100px;
  }
  /* 面板 */
  .panel__bar {
    padding: 20px 0;
    width: 300px; 
    height: 500px;
    overflow: scroll;
    background: yellow;
  }
</style>

<script>
  import draggable from 'vuedraggable'
  const nanoid = require('nanoid')

  // mock datasource of current activity
  window.datasource = {
    global: {},
    layers: {},
    pages: {},
    events: {},
    compons: [
      {
        id: nanoid(),
        name: 'button',
        data: {
            style: {
            display: 'block',
            width: '100%',
            height: '100px',
            backgroundColor: 'blue',
            fontSize: '12px'
            },
            props: {
            text: 'I am button.'
            }
        }
      },
      {
        id: nanoid(),
        name: 'image',
        data: {
            style: {
            width: '100%',
            height: '100px',
            backgroundColor: 'green',
            fontSize: '12px'
            },
            props: {
            imgSrc: 'https://avatars3.githubusercontent.com/u/18412359?s=40&v=4'
            }
        }
      },
      {
        id: nanoid(),
        name: 'text',
        data: {
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
        }
      },
      {
        id: nanoid(),
        name: 'container',
        data: {
            style: {
              width: '100%',
              height: '100px',
              lineHeight: '100px',
              backgroundColor: 'green',
              fontSize: '12px',
              textAlign: 'center'
            },
            props: {
              // text: 'I am text.'
            },
            compons: [
              {
                id: nanoid(),
                name: 'button',
                data: {
                  style: {
                    display: 'block',
                    width: '100%',
                    height: '100px',
                    backgroundColor: 'pink',
                    fontSize: '12px',
                    color: '#fff'
                  },
                  props: {
                    text: 'I am inner button.'
                  }
                }
              }
            ]
        }
      }
    ]
  }

  // 这个插件很好用，只要把全局的变量跟拖拽的绑定了，那么只要拖拽顺序改变，也会同步到全局的变量
  export default {
    data () {
      return {
        //当前选中元素的ID,用来判断哪个是当前选中的元素，用来更改选中元素的属性
        curElementId: '',
        initMenuList: [],
        menuList: [
          {
            id: nanoid(),
            name: 'button'
          },
          {
            id: nanoid(),
            name: 'image'
          },
          {
            id: nanoid(),
            name: 'text'
          },
          {
            id: nanoid(),
            name: 'container'
          }
        ],
        contentList: [],
        // 右侧属性面版
        panelSwitch: false,
        curComponItem: {},
        currentPannel: '',
        ruleForm: {
          name: ''
        },
        chooseElementInfo:{
          value: '提交',
          width: '200px',
          height: '50px',
          border: '1px',
          border_radius: '5px',
          background: '#a6e22e',
          icon: 'el-icon-check',
          float: false
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
      // 菜单区域
      ContainerElement: () => import('../components/Container'),
      ButtonElement: () => import('../components/Button'),
      ImageElement: () => import('../components/Image'),
      TextElement: () => import('../components/Text'),
      // 面板区域（考虑到默认从菜单拖拽过来的组件并没有属性，所以需要保留默认值，将这些对应面板抽离出来）
      ContainerPannel: () => import('../components/ContainerPannel'),
      ButtonPannel: () => import('../components/ButtonPannel'),
      ImagePannel: () => import('../components/ImagePannel'),
      TextPannel: () => import('../components/TextPannel')
    },
    created () {
      this.$data.initMenuList = this.$data.menuList // 临时存放菜单项，用于从菜单拖拉到舞台时，及时补充菜单项
      this.$data.contentList = window.datasource.compons  // 初始化渲染舞台
    },
    methods: {
      // 子组件将当前内部选中的元素告诉父组件，父组件展示面板，让用户修改属性后同步到子组件和datasource ok
      handleSonShowPanel (curElement, parentId) {
        const self = this
        window.datasource.compons.map((item) => {
          if (item.id === curElement.id) {
            // 1. 找到跟子组件容器组件匹配的datasource索引项 ok
            // 2. 将子组件容器组件点击选中的元素属性列出来 ok
            self.$data.panelSwitch = true
            self.$data.curComponItem = curElement
          } else {
            if (window.datasource.compons[parentId].data && window.datasource.compons[parentId].data.compons.length) {
              window.datasource.compons[parentId].data.compons.map((curSonElement) => {
                if (curSonElement.id === curElement.id) {
                  self.$data.panelSwitch = true
                  self.$data.curComponItem = curElement
                }
              })
            }
          }
        })
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
      handleShowPanel (curElement) {
        const self = this
        window.datasource.compons.map((item) => {
          if (item.id === curElement.id) {
            self.$data.panelSwitch = true
            self.$data.curComponItem = curElement
          }
        })
      },
      updateComponData (curElement) {
        console.log(curElement, '<<<<<<<准备改变该组件')
      },
      // 深拷贝array
      deepCopy(arr) {
          return arr.map((e) => {
              if (typeof e === 'object') {
                  return Object.assign({}, e)
              } else {
                  return e
              }
          })
      },
      // 深拷贝obj
      deepCopyObj(arr) {
            if (typeof arr === 'object') {
                return Object.assign({}, arr)
            } else {
                return arr
            }
      },
      updateAttributes() {
        //这里判断一下当前是哪个组件，这里先用button 组件举例，之后改成动态的
        console.log("%c这个是当前选择的组件ID==>","color: darkred;text-shadow: 1px 1px 1px;",this.curElementId)
        for (let compon of window.datasource.compons){
            if(compon.id == this.curElementId){
                console.log("%c这个是当前现有的属性=>","color: darkred;text-shadow: 1px 1px 1px;",compon)
                compon.data.style = this.deepCopyObj(this.chooseElementInfo);
                let buttonAttr = this.chooseElementInfo;
                let propName = buttonAttr.value;
                //设置按钮名称
                if(propName){
                  compon.data.props.text = propName;
                }
            }
        }
      }
    }
  }
</script>