<template>
  <keep-alive>
      <draggable :class="['container__comp--box']" :list="containerList" :options="{group:'people'}" @sort="handleContainerSort">
        <div class="container__comp--content" :data-helpId="containerElement.id" v-for="containerElement in containerList" :key="containerElement.id" @click="callFather(containerElement)">
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
      handleContainerSort () {
        // 监听到容器内元素有改变，马上同步到datasource
        const self = this
        console.log('紧记你现在触发这个方法是跟self.$data.containerList关联的, self.data > self.$data.containerList')
        // console.log(self.rootId, '<<<<<<<<<self.rootId一定不会变，代笔最外层的container id')
        console.log(self.data, '<<<<<<<<<self.data有可能一直在变，当前self.data是上级self.$data.containerList之中的')
        console.log(self.$data.containerList, '<<<<<<<<<当前容器组件所具备的元素')
        console.log(window.datasource.compons, '<<<<<<<<<全局看看')
        window.datasource.compons.map((item, index) => {
          if (item.id === self.data.id) {
            window.datasource.compons[index].data.compons = self.$data.containerList
          } else if (item.name === 'container') {
            // 深层迭代
            if (item.data && item.data.compons) {
              item.data.compons.map((item2, index2) => {
                if (item2.id === self.data.id) {
                  console.log('>>>>>>equal: ', item2, self.data)
                  console.log('bingo>>>>>>>>', window.datasource.compons[index].data.compons[index2], self.$data.containerList)
                  window.datasource.compons[index].data.compons[index2] = self.$data.containerList
                }
              })
            } else {
              item.data = self.$data.containerList
            }
          }
        })
      }
		}
	}
</script>