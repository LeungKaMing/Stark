<template>
  <keep-alive>
      <draggable :class="['container__comp--box']" :list="containerList" :options="{group:'people'}" @sort="handleContainerSort">
        <div class="container__comp--content" v-for="containerElement in containerList" :key="Math.random()" @click="callFather(containerElement)">
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
        containerList: []
			}
    },
    created() {
      containerList: []
    },
    components: {
      draggable,
      ButtonElement: () => import('../components/Button'),
      ImageElement: () => import('../components/Image'),
      TextElement: () => import('../components/Text')
    },
		methods: {
      callFather (curElement) {
        if (curElement.name === 'container') {
          // container不用展示面板
          return
        }
        console.log('调用this.cb：', curElement)
        // this.cb(curElement)
      },
      handleContainerSort () {
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