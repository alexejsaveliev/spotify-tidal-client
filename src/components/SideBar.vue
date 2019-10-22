<template>
  <el-menu default-active="1" class="el-menu-vertical" :router='true'>
    <el-menu-item index="1" route="/tracks">
      <i class="el-icon-tickets"></i>
      <span>Track list</span>
    </el-menu-item>
    <el-menu-item index="2" route="/schedules">
      <i class="el-icon-s-operation"></i>
      <span>Playlist sync</span>
    </el-menu-item>
    <el-menu-item index="3" route="/settings">
      <i class="el-icon-setting"></i>
      <span>Settings</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {};
</script>

<style scoped>
    .el-menu-vertical {
        height: 100%;
    }
</style>
