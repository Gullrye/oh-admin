<template>
  <div class="nav-menu">
    <p class="menu-title">后台管理系统</p>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      :collapse="collapse"
    >
      <template v-for="item in menuList" :key="item.id">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <monitor v-if="item.icon === 'el-icon-monitor'" />
              <setting v-if="item.icon === 'el-icon-setting'" />
              <goods v-if="item.icon === 'el-icon-goods'" />
              <chat-line-round v-if="item.icon === 'el-icon-chat-line-round'" />
            </el-icon>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="subItem in item.children" :key="subItem.id">
            <el-menu-item index="1-4-1">{{ subItem.name }}</el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import { ref } from 'vue'
import { useUserStore } from '@/store/user.js'
import { Monitor, Setting, Goods, ChatLineRound } from '@element-plus/icons-vue'
export default {
  components: {
    Monitor,
    Setting,
    Goods,
    ChatLineRound
  },
  props: {
    collapse: {
      require: true,
      type: Boolean
    }
  },
  setup() {
    const userStore = useUserStore()
    userStore.getUserInfoAction()
    userStore.getMenuListAction()

    const menuList = userStore.menuList
    return {
      menuList
    }
  }
}
</script>

<style lang="less" scoped>
.menu-title {
  line-height: 20px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  color: #7a88fe;
}
</style>
