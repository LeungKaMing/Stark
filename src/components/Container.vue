<template>
  <keep-alive>
      <draggable :class="['container__comp--box']" :list="containerList" :options="{group:'people'}" @sort="handleContainerSort">
        <div class="container__comp--content" :data-helpId="containerElement.id" v-for="containerElement, containerIndex in containerList" :key="containerElement.id" @click="callFather(containerElement)">
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
            <ContainerElement :rootId="containerIndex" :data="wrapContainerData" :cb="cb" :levelList="indexList"/>
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
		props: ['rootId', 'data', 'cb', 'levelList'],
		data () {
			return {
        containerList: [],
        wrapContainerData: '',
        indexList: []
			}
    },
    created () {
      // // 初始化渲染容器内元素
      const self = this
      console.log(this.data, this.levelList, '<<<<<新渲染容器组件')
      if (!this.data) {
        return
      }
      // to fix
      if (this.levelList.length) {
        this.$data.indexList.push(this.rootId)
        console.log(this.$data.indexList, '<<<<<<<拼好数组继续传递')
      }
      if (this.data.data && this.data.data.compons) {
        console.log('<<<<<新读取缓存')
        this.data.data.compons.map((curCompon) => {
          self.$data.containerList.push(curCompon)
        })
      } else {
        console.log('<<<<<<新没有读取缓存: ', self.data)
        self.$data.containerList.push(self.data)
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
      handleContainerSort (evt) {
        // 监听到容器内元素有改变，马上同步到datasource
        const self = this
        // console.log('紧记你现在触发这个方法是跟self.$data.containerList关联的, self.data > self.$data.containerList: ', self.rootId)
        // // console.log(self.rootId, '<<<<<<<<<self.rootId一定不会变，代笔最外层的container id')
        console.log(self.data, '<<<<<<<<<旧self.data有可能一直在变，当前self.data是上级self.$data.containerList之中的')
        console.log(self.$data.containerList, '<<<<<<<<<旧当前容器组件所具备的元素')
        console.log(self.rootId, '<<<<<<<<rootId')
        // 最新的
        self.$data.containerList.map((item) => {
          // 当前传入的参数【旧】
          if (self.data) {
            self.data.data.compons.map((item2) => {
              if (item.id === item2.id) {
                return
              }
              let wrapData = {...item, data: {compons: []}}
              self.$data.wrapContainerData = wrapData // <== 传递到下级Container组件
            })
          } else {
            let wrapData2 = {...item, data: {compons: []}}
            self.$data.wrapContainerData = wrapData2
          }
        })
      }
		}
	}
</script>