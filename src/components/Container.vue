<template>
  <keep-alive>
    <draggable class="container__comp--box" v-model="data.compons" :options="{group:'people'}">
      <div class="container__comp--content" v-for="containerElement in data.compons" :key="containerElement.id">
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

	export default {
		props: ['data'],
		data () {
			return {
				containerList: [],
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
        }
			}
    },
    // computed: {
    //   style () {
    //     return !!this.data ? this.data.style : {}
    //   }
    // },
    components: {
      draggable,
      ButtonElement: () => import('../components/Button'),
      ImageElement: () => import('../components/Image'),
      TextElement: () => import('../components/Text')
    },
		methods: {
		}
	}
</script>