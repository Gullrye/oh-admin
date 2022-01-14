<template>
  <div class="nav-menu">
    <p class="menu-title">
      <span v-if="!collapse" style="margin-left: -40px">OH-ADMIN</span>
      <span v-else>OH</span>
    </p>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="collapse"
    >
      <template v-for="item in menuList" :key="item.id">
        <el-sub-menu :index="item.url">
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
            <el-menu-item
              default-openeds="/main/system/user"
              :index="subItem.url"
              @click="onMenuSubItemClick(subItem)"
              >{{ subItem.name }}</el-menu-item
            >
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
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

    const menuList = userStore.userMenus
    const router = useRouter()
    const route = useRoute()
    const activeIndex = route.path

    const onMenuSubItemClick = item => {
      router.push(item.url)
    }

    return {
      menuList,
      activeIndex,
      onMenuSubItemClick
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
  white-space: nowrap;
}
.el-menu.el-menu--collapse {
  border: none;
}
</style>
