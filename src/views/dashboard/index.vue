<template>
  <div class="dashboard-container">
    <div class="dashboard-text">当前用户: {{ name }}</div>
    <h1>按钮权限测试</h1>
    <el-button v-has="{permission: 'dashboard:permission:create'}">新增</el-button>
    <el-button v-has="{permission: 'dashboard:permission:remove'}">删除</el-button>
    <el-button v-has="{permission: 'dashboard:permission:update'}">修改</el-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
