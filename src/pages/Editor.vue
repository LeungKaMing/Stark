<template>
  <div class="editor__area">
    <el-header style="display: flex; justify-content: space-between; padding: 0;">
      <!-- 设置开始 -->
      <el-button-group style="">
        <el-button type="primary" icon="el-icon-setting" @click="handleGlobalConfig">全局配置</el-button>
        <el-button type="primary" icon="el-icon-document" @click="handleEventConfig">事件配置</el-button>
      </el-button-group>
      <!-- 设置结束 -->
      <!-- 设置开始 -->
      <el-button-group style="">
        <el-button type="primary" icon="el-icon-printer" @click="handleDraft">草稿</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="handleSave">保存</el-button>
        <el-button type="primary" icon="el-icon-upload" @click="handlePublish">发布</el-button>
      </el-button-group>
      <!-- 设置结束 -->
    </el-header>
    <el-container class="editor__area--box">
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
        <div class="stage__bar--btn" v-for="contentElement, contentIndex in contentList" :key="contentElement.id" @click.stop="handleShowPanel(contentElement)">
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
      <div class="panel__bar" v-if="panelSwitch && curComponItem.name !== 'Container'">
        <!-- 当前选中组件的属性，这个属性是用来同步到组件的 -->
        <component :is="`${curComponItem.name}Pannel`" :pannelData="curComponItem"></component>
      </div>
      <!-- 面板结束 -->
      <!-- 全局配置开始 -->
      <el-dialog
        title="提示"
        :visible.sync="globalConfigVisible"
        width="30%">
          <span slot="title">title</span>
          <span>这是全局配置信息</span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="globalConfigVisible = false">取 消</el-button>
              <el-button type="primary" @click="globalConfigVisible = false">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 全局配置结束 -->
      <!-- 事件配置开始 -->
      <el-dialog
        title="提示"
        :visible.sync="eventConfigVisible"
        width="30%">
          <span>这是事件配置信息</span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="eventConfigVisible = false">取 消</el-button>
              <el-button type="primary" @click="eventConfigVisible = false">确 定</el-button>
          </span>
      </el-dialog>
      <!-- 事件配置结束 -->
    </el-container>
  </div>
</template>

<style scoped>
  .editor__area {
    display: flex; 
    flex-direction: column;
  }
  .editor__area--box {
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
    border: 1px dotted pink;
    box-shadow: pink 0px 0px 20px 0px;
    overflow: scroll;
  }
  .stage__bar--btn {
    /* height: 100px; */
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
  import {getActivityList, getDraftList, saveActivity, publishActivity} from '../assets/scripts/api'
  import {getQueryString} from '../assets/scripts/utils'
  import draggable from 'vuedraggable'
  const nanoid = require('nanoid')

  // mock datasource of current activity
  window.datasource = {
    global: {},
    layers: {},
    pages: {},
    events: {},
    compons: []
  }

  // 这个插件很好用，只要把全局的变量跟拖拽的绑定了，那么只要拖拽顺序改变，也会同步到全局的变量
  export default {
    data () {
      return {
        activityId: '',
        // 左侧菜单
        initMenuList: [],
        menuList: [
          {
            id: nanoid(),
            name: 'button',
            data: {
              style: {
                width: '',
                height: '',
                backgroundColor: '',
                fontSize: '',
                textAlign: '',
                border: '',
                borderRadius: '',
                icon: '',
                float: ''
              },
              props: {
                text: ''
              }
            }
          },
          {
            id: nanoid(),
            name: 'image',
            data: {
              style: {
                width: '',
                height: '',
                backgroundColor: '',
                fontSize: ''
              },
              props: {
                imgSrc: ''
              }
            }
          },
          {
            id: nanoid(),
            name: 'text',
            data: {
              style: {
                width: '',
                height: '',
                lineHeight: '',
                backgroundColor: '',
                fontSize: '',
                textAlign: ''
              },
              props: {
                text: ''
              }
            }
          },
          {
            id: nanoid(),
            name: 'container',
            data: {
              compons: []
            }
          }
        ],
        // 中部舞台
        contentList: [],
        // 右侧属性面版
        panelSwitch: false,
        curComponItem: {},
        // 全局配置对话框开关
        globalConfigVisible: false,
        // 事件配置对话框开关
        eventConfigVisible: false
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
      ButtonPannel: () => import('../components/ButtonPannel'),
      ImagePannel: () => import('../components/ImagePannel'),
      TextPannel: () => import('../components/TextPannel')
    },
    created () {
      const {type} = this.$route.query
      type === 'add' ? this.$data.activityId = nanoid() : ''  // 新增活动才需要创建活动id；编辑活动的时候读取数据库的已有id
      this.$data.initMenuList = this.$data.menuList // 临时存放菜单项，用于从菜单拖拉到舞台时，及时补充菜单项
      this.init()
    },
    methods: {
      // 初始化
      init () {
        const self = this
        const {activityId, type} = self.$route.query
        self.$data.activityId = activityId
        if (type === 'edit') {
          // 编辑活动
          getActivityList({
            data: {
              activityId
            },
            onSuccess (res) {
              window.datasource.compons = self.$data.contentList = JSON.parse(res.data[0].dataSource).compons // 初始化渲染舞台，同步接口数据到window.datasource => 因为后续为了方便写逻辑好多都是直接从全局window拿数据源
            },
            onFailure (err) {
              console.log(err)
            }
          })
        } else {
          // 新建活动
          window.datasource.compons = self.$data.contentList = [] // 初始化渲染舞台，同步接口数据到window.datasource => 因为后续为了方便写逻辑好多都是直接从全局window拿数据源
        }
      },
      handleGlobalConfig () {
        this.$data.globalConfigVisible = true
      },
      handleEventConfig () {
        this.$data.eventConfigVisible = true
      },
      handleDraft () {
        const self = this
        const {activityId} = this.$data
        getDraftList({
          data: {
            activityId
          },
          onSuccess (res) {
            console.log(res)
          },
          onFailure (err) {
            console.log(err)
          }
        })
        .then((res) => {
          console.log(res, '<<<<<getDraftList')
        }).catch((err) => {
          console.log(err)
        })
      },
      handleSave () {
        const self = this
        const {activityId} = this.$data
        saveActivity({
          data: {
            activityId,
            dataSource: JSON.stringify(window.datasource)
          },
          onSuccess (res) {
            console.log(res)
          },
          onFailure (err) {
            console.log(err)
          }
        }).then((res) => {
          console.log(res, '<<<<<saveActivity')
        }).catch((err) => {
          console.log(err)
        })
      },
      handlePublish () {
        const self = this
        const {activityId} = this.$data
        publishActivity({
          data: {
            activityId,
            dataSource: JSON.stringify(window.datasource)
          },
          onSuccess (res) {
            console.log(res)
          },
          onFailure (err) {
            console.log(err)
          }
        }).then((res) => {
          console.log(res, '<<<<<publishActivity')
        }).catch((err) => {
          console.log(err)
        })
      },
      // 从菜单拖动任意组件时，都立即生成一个全新的菜单      
      handleMenuSort () {
        let temp = []
        this.$data.initMenuList.map((item) => {
          let tempObj = {
            id: nanoid(),
            name: item.name,
            data: {
              style: {},
              props: {},
            }
          }
          if (item.name === 'container') {
            tempObj.data.compons = []
          }
          temp.push(tempObj)
        })
        this.$data.menuList = temp
      },
      // 子组件将当前内部选中的元素告诉父组件，父组件展示面板，让用户修改属性后同步到子组件和datasource ok
      handleSonShowPanel (curElement, parentId) {
        const self = this
        window.datasource.compons.map((item) => {
          if (window.datasource.compons[parentId].data && window.datasource.compons[parentId].data.compons.length) {
            window.datasource.compons[parentId].data.compons.map((curSonElement) => {
              if (curSonElement.id === curElement.id) {
                self.$data.panelSwitch = true
                self.$data.curComponItem = curElement
              }
            })
          }
        })
      },
      handleShowPanel (curElement) {
        const self = this
        window.datasource.compons.map((item, index) => {
          if (item.name === 'container') {
            // 排除掉容器组件这种情况，已经有特殊方法做处理展开面板
            // 根据是否存在compons字段来判断面板显示的东西
            return false
          } else if (item.id === curElement.id) {
            self.$data.panelSwitch = true
            self.$data.curComponItem = {...curElement}
          }
        })
      },
      handleSettingsClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      handleEventClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>