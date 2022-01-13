<template>
  <div class="nav-header">
    <div class="breadcrumb">面包屑</div>
    <user-info></user-info>
  </div>
</template>

<script>
import userInfo from './user-info.vue'
export default {
  components: {
    userInfo
  },
  setup() {}
}
</script>

<style lang="less" scoped>
.nav-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>
