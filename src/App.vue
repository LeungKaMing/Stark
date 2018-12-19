<template>
  <div id="app">
    <el-container>
      <el-aside style="width: 200px; min-height: 500px; background-color: aquamarine;">
        <div class="per_menu">
          <router-link to="/list">Go to list</router-link>
        </div>
        <div class="per_menu">
          <router-link to="/editor">Go to editor</router-link>
        </div>
      </el-aside>
      <el-main style="padding-left: 0;">
        Main
        <router-view></router-view>
      </el-main>
    </el-container>
    
  </div>
</template>

<style scoped>
  .per_menu {
    padding-bottom: 15px;
    background-color: aquamarine;
  }
</style>

<script>
  export default {
    methods: {
    }
  }
</script>
