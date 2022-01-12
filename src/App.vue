<template>
  <div>
    <router-view />
    <el-button type="primary">element plus is ok!</el-button>
  </div>
</template>

<script>
import { onMounted } from 'vue'

export default {
  setup() {
    onMounted(() => {})
  }
}
</script>

<style lang="less"></style>
