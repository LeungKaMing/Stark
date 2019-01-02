<template>
  <keep-alive>
      <draggable :class="['container__comp--box']" :list="containerList" :options="{group:'people'}" @sort="handleContainerSort">
        <!-- 不允许容器组件再嵌套容器组件, 只能套一次 -->
        <div :style="containerElement.name === 'container' ? 'display: none;' : 'flex-grow: 1;'" v-for="containerElement, containerIndex in containerList" :key="containerElement.id" @click="bingo(containerElement)">
          <template class="container__comp--content"  v-if="containerElement.name === 'button'">
              <ButtonElement :data="containerElement.data" />
          </template>
          <template class="container__comp--content"  v-if="containerElement.name === 'img'">
            <ImageElement :data="containerElement.data" />
          </template>
          <template class="container__comp--content"  v-if="containerElement.name === 'text'">
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
    /* width: 50%;  */
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
		props: ['rootIndex', 'data', 'cb'],
		data () {
			return {
        containerList: []
			}
    },
    created () {
      // 初始化渲染容器内元素
      const self = this
      this.data.data.compons.map((curCompon) => {
        self.$data.containerList.push(curCompon)
      })
    },
    components: {
      draggable,
      ContainerElement: () => import('../components/Container'),
      ButtonElement: () => import('../components/Button'),
      ImageElement: () => import('../components/Image'),
      TextElement: () => import('../components/Text')
    },
		methods: {
      bingo () {

      },
      handleContainerSort (evt) {
        window.datasource.compons[this.rootIndex].data.compons = this.$data.containerList
      }
		}
	}
</script>