<template>
  <div>
    <el-dropdown size="large" trigger="click">
      <el-avatar
        class="avatar"
        :src="require('@/assets/img/avatar.svg')"
      ></el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人资料</el-dropdown-item>
          <el-dropdown-item>消息通知</el-dropdown-item>
          <el-dropdown-item @click="onLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
// import { ref } from 'vue'
import router from '@/router'
import localCache from '@/utils/cache'
import { useUserStore } from '@/store/user'
/* eslint-disable no-undef */
export default {
  setup() {
    const userStore = useUserStore()
    const onLogout = () => {
      ElMessageBox.confirm('确认退出登录?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          localCache.deleteCache('token')
          userStore.token = ''
          ElMessage({
            type: 'success',
            message: '退出登录成功!'
          })
          router.push('/login')
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '已取消'
          })
        })
    }

    return {
      onLogout
    }
  }
}
</script>

<style lang="less" scoped>
.avatar {
  cursor: pointer;
}
</style>
