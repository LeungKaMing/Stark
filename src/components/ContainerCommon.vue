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
  import ButtonElement from '../components/Button'
  import ImageElement from '../components/Image'
  import TextElement from '../components/Text'
  const nanoid = require('nanoid')

	export default {
		props: ['data', 'cb'],
		data () {
			return {
        containerList: [],
        recursiveList: []
			}
    },
    created () {
      // 初始化渲染容器内元素
      const self = this
      if (this.data.data && this.data.data.compons) {
        this.data.data.compons.map((curCompon) => {
          self.$data.containerList.push(curCompon)
        })
      }
    },
    components: {
      draggable,
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
        window.datasource.compons.map((curItem, curIndex) => {
          if (curItem.id === self.data.id) {
            window.datasource.compons[curIndex].data = self.$data.containerList
          }
        })
      }
		}
	}
</script>