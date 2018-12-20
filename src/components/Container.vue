<template>
    <keep-alive>
        <draggable class="container__comp--box" v-model="containerList" :options="{group:'people'}" @sort="handleContainerSort">
            <div class="container__comp--content" v-for="containerElement in containerList" :key="containerElement.id" :data-name="containerElement.name" :data-id="containerElement.id">
            <template v-if="containerElement.name === 'button'">
                <ButtonElement :data="buttonData" />
            </template>
						<template v-if="containerElement.name === 'img'">
							<ImageElement :data="imageData" />
						</template>
						<template v-if="containerElement.name === 'text'">
							<TextElement :data="textData" />
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
    components: {
      draggable,
      ButtonElement: () => import('../components/Button'),
      ImageElement: () => import('../components/Image'),
      TextElement: () => import('../components/Text')
    },
		methods: {
			// core
			// 无论是舞台区，还是容器组件，都需要把自身内部的子组件同步出来
			handleContainerSort (evt) {
				// console.log(evt, '<<<<<in container')
				const list1 = document.getElementsByClassName('stage__bar--btn')
				for (let i = 0; i < list1.length; i++) {
					const list2 = list1[i].children
					for (let j = 0; j < list2.length; j++) {
						const list3 = list2[j].children
						if (list3.length) {
							for (let k = 0; k < list3.length; k++) {
								console.log(list3[k].dataset.name, list3)	
								// 这里太冗余了，考虑这个组件只关注这组件的数据，舞台只关注舞台数据，最后保存时统一整合到window.datasource.compons todo
								// 还需要在这里遍历window.datasource.compons有无重复的id，有则不写入 todo
								switch (list3[k].dataset.name) {
									case 'button':
										window.datasource.compons.push({
											id: list3[k].dataset.id,
											type: 'button',
											value: list3[k].innerText
										})
										break
									case 'text':
										window.datasource.compons.push({
											id: list3[k].dataset.id,
											type: 'text',
											value: list3[k].innerText
										})
										break
									case 'image':
										window.datasource.compons.push({
											id: list3[k].dataset.id,
											type: 'image',
											value: list3[k].innerText
										})
										break
								}
							}
						}
					}
				}
			}
		}
	}
</script>