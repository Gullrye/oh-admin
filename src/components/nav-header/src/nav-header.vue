<template>
  <div class="nav-header">
    <div class="header-left">
      <div class="icon-wrapper" @click="onIconClick">
        <el-icon color="#fff" class="icon-btn" v-if="isFold"><fold /></el-icon>
        <el-icon color="#fff" class="icon-btn" v-else><expand /></el-icon>
      </div>
      <div class="breadcrumb"></div>
    </div>
    <user-info></user-info>
  </div>
</template>

<script>
import { ref } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
import userInfo from './user-info.vue'
export default {
  components: {
    Expand,
    Fold,
    userInfo
  },
  emits: ['foldChange'],
  setup(props, { emit }) {
    // 图标展示
    const isFold = ref(true)
    const onIconClick = () => {
      emit('foldChange', isFold.value)
      isFold.value = !isFold.value
    }
    return {
      isFold,
      onIconClick
    }
  }
}
</script>

<style lang="less" scoped>
.nav-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px 0 0;
  .header-left {
    .icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
      transition: 0.5s all;
      .icon-btn {
        font-size: 20px;
      }
      &:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    }
  }
}
</style>
