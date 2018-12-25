<template>
  <keep-alive>
      <draggable :class="['container__comp--box']" :list="containerList" :options="{group:'people'}" @sort="handleContainerSort">
        <div class="container__comp--content" v-for="containerElement in containerList" :key="containerElement.id" @click="callFather(containerElement)">
          <template v-if="containerElement.name === 'button'">
              <ButtonElement :data="containerElement.data" />
          </template>
          <template v-if="containerElement.name === 'img'">
            <ImageElement :data="containerElement.data" />
          </template>
          <template v-if="containerElement.name === 'text'">
            <TextElement :data="containerElement.data" />
          </template>
          <template v-if="containerElement.name === 'container'">
            <ContainerElement :rootId="rootId" :data="containerElement" :cb="cb"/>
          </template>
        </div>
      </draggable>
  </keep-alive>
</template>

<style scoped>
  /* 容器组件 */
  .container__comp--box {
    display: flex; 
    /* flex-wrap: wrap;  */
    width: 100%; 
    height: 100px; 
    background: red;
  }
  .container__comp-box--single {
    justify-content: center;
  }
  .container__comp--content {
    width: 50%; 
    height: 100px; 
    line-height: 100px; 
    text-align: center;
  }
</style>

<script>
  import draggable from 'vuedraggable'
  import ContainerElement from './Container'
	import ButtonElement from '../components/Button'
  import ImageElement from '../components/Image'
  import TextElement from '../components/Text'
  const nanoid = require('nanoid')

	export default {
		props: ['rootId', 'data', 'cb'],
		data () {
			return {
        containerList: []
			}
    },
    created () {
      // 初始化渲染容器内元素
      const self = this
      if (this.data.data && this.data.data.compons) {
        this.data.data.compons.map((curCompon) => {
          self.$data.containerList.push(curCompon)
        })
      } else {
        self.$data.containerList = []
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
      // 将子组件内选中的元素 和 当前容器组件id 传递给父组件，这样父组件就能在datasource找到是由哪个容器组件触发的，具体到容器组件内的哪个元素
      callFather (curElement) {
        // container不用展示面板
        if (curElement.name === 'container') {
          return
        }
        this.cb(curElement, this.data.id)
      },
      recall (arrItem, arrIndex) {
        const self = this
        console.log(arrItem, `<<<<<<位于舞台的第${arrIndex}位置`)
        console.log(self.data, `<<<<<<<<<位于当前行且现在正在操作的container`)
        console.log(self.$data.containerList, `位于当前操作的container里面的元素`)
        arrItem.data.map((curContainerItem, curContainerIndex) => {
          // if (curContainerItem.id === self.data.id) {
          //   // 锁定是当前行的哪一个container【一行同时也可以有很多个container组件】，接着还需要同步数据到window.datasource.compons对应的索引位置data字段
          //   // 截止递归一次是可以的
          //   window.datasource.compons[arrIndex].data[curContainerIndex] = self.$data.containerList
          // }
          if (curContainerItem instanceof Array) {
            // 多层嵌套container
            curContainerItem.map((curInnerContItem) => {
              if (curInnerContItem.id === self.data.id) {
                console.log('你正在操作的container是：', curInnerContItem)
              }
            })
          }
        })
      },
      handleContainerSort () {
        // 监听到容器内元素有改变，马上同步到datasource
        const self = this
        // 1. 需考虑组件内是否会继续嵌套 <= todo
        // 2. 只考虑容器组件内不嵌套容器组件
        console.log(self.data, self.$data.containerList)
        window.datasource.compons.map((curItem, curIndex) => {
          if (curItem.id === self.data.id) {
            // 第一层嵌套self.rootId 跟 self.data.id 是还有关联的
            // 传入的id跟window.datasource.compons的某项匹配到，就把当前数组对应项的data赋值当前拖拽区域的值
            window.datasource.compons[curIndex].data = self.$data.containerList
          }
          // 12.26 多层嵌套container 构思中
          // else if (curItem.id === self.rootId) {
          //   // 第二层嵌套开始self.rootId 跟 self.data.id 是没有关联的，self.data是指当前第二个嵌套的数组
          //   // 常量不变self.rootId => self.data.id 在 self.rootId找，找不到就从window.datasource.compons一级一级找
          //   console.log(self.rootId, self.data, '<<<<<on props')
          //   // 锁定所在舞台的哪一行container组件，接着还需要锁定是当前行的哪一个container【一行同时也可以有很多个container组件】
          //   // console.log('我已经锁定您现在操作的是第几行container：', curIndex) ok
          //   self.recall(curItem, curIndex)
          // }
        })
      }
		}
	}
</script>