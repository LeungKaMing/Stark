<template>
  <div style="display: flex; ">
    <draggable style="width: 300px; height: 300px; background: red;" :list="menuList" :options="{group:'people'}">
      <div class="menu__btn" v-for="menuElement in menuList" :key="menuElement.id">
        {{menuElement.name}}
      </div>
    </draggable>
    <draggable style="width: 300px; height: 300px; background: blue;" :list="contentList" :options="{group:'people'}" @sort="handleContentSort">
      <div v-for="contentElement in contentList" :key="contentElement.id">
        <template v-if="contentElement.name === 'button'">
          <button>I am button.</button>          
        </template>
        <template v-if="contentElement.name === 'img'">
          <img src="https://avatars3.githubusercontent.com/u/18412359?s=40&v=4" alt="">
        </template>
        <template v-if="contentElement.name === 'text'">
          <p>I am text.</p>          
        </template>
      </div>
    </draggable>
  </div>
</template>

<style scoped>
  .menu__btn {
    width: 50px;
    height: 50px;
    line-height: 50px;
    background: aquamarine;
    text-align: center;
  }
</style>
<script>
  import draggable from 'vuedraggable'

  export default {
    data () {
      return {
        menuList: [
          {
            id: 1,
            name: 'button'
          },
          {
            id: 2,
            name: 'img'
          },
          {
            id: 3,
            name: 'text'
          }
        ],
        contentList: [],
        list: []
      }
    },
    components: {
      draggable
    },
    methods: {
      handleContentSort () {
        console.log(this.$data.contentList, '<<<<<<ready to set in datasource')
      }
    }
  }
</script>