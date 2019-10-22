<template>
      <el-container style="height: 100%">
        <el-header style="padding: 0px" fixed>
          <nav-bar></nav-bar>
        </el-header>
        <el-container style="height: 100%">
          <el-aside width="200px"><side-bar></side-bar></el-aside>
          <el-main class="main-container" style="height: 100%">
            <transition name="el-fade-in-linear">
              <router-view></router-view>
            </transition>
          </el-main>
        </el-container>
      </el-container>
</template>

<script>

import NavBar from '../components/NavBar.vue'
import SideBar from './SideBar.vue'

export default {
    components: {
        NavBar,
        SideBar
    },
    created(){
      // this.$router.push({path: '/tracks'})
    }
}
</script>

<style scoped>
  .main-container {
    height: 100%;
    background-color: #fff;
    padding: 0px;
  }  
</style>
