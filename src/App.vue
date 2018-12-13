<template>
  <div id="app">
    <el-container>
      <el-aside style="margin-top: 20px; width: 200px;">
        <div class="per_menu">
          <router-link to="/list">Go to list</router-link>
        </div>
        <div class="per_menu">
          <router-link to="/editor">Go to editor</router-link>
        </div>
      </el-aside>
      <el-main>
        Main
        <router-view></router-view>
      </el-main>
    </el-container>
    
  </div>
</template>

<style scoped>
  .per_menu {
    padding-bottom: 15px;
  }
</style>

<script>
  export default {
    methods: {
    }
  }
</script>
