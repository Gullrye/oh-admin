<template>
  <div class="login">
    <div class="login-panel">
      <p class="title">后台管理系统</p>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="name">
          <el-input
            v-model="ruleForm.name"
            type="text"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item class="rem-pass">
          <el-checkbox v-model="savePassword">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item class="btn-wrapper">
          <el-button type="primary" @click="onLogin">登录</el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import localCache from '@/utils/cache.js'
import { useUserStore } from '@/store/user'
export default {
  setup() {
    let savePassword = ref(true)
    // 表单数据
    const ruleForm = ref({
      name: localCache.getCache('name') || '',
      password: localCache.getCache('password') || ''
    })
    // 表单校验规则
    const rules = ref({
      name: [
        {
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        },
        {
          pattern: /^[A-Za-z0-9]{3,10}$/,
          message: '请输入 3~10 个字母或数字',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        },
        {
          min: 3,
          max: Infinity,
          message: '请输入 3 位及以上的字符',
          trigger: 'blur'
        }
      ]
    })

    // 重置表单
    const ruleFormRef = ref()
    const onReset = () => {
      ruleFormRef.value.resetFields()
    }
    // 登录，校验表单 -> 缓存账号密码 -> 登录验证
    const userStore = useUserStore()
    const onLogin = async () => {
      ruleFormRef.value.validate(valid => {
        if (valid) {
          console.log('real login')
          if (savePassword.value) {
            localCache.setCache('name', ruleForm.value.name)
            localCache.setCache('password', ruleForm.value.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          userStore.loginAction(ruleForm.value)
        }
      })
    }
    return {
      savePassword,
      ruleForm,
      rules,
      ruleFormRef,
      onReset,
      onLogin
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: url('../../assets/img/login-bg.svg') no-repeat center center;
  background-size: cover;
  .login-panel {
    padding: 20px 50px;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 1px 2px 1px rgba(0, 0, 0, 0.1);
    :deep(.btn-wrapper) > .el-form-item__content {
      text-align: center;
    }
    .title {
      font-size: 20px;
      text-align: center;
    }
    :deep(.rem-pass) {
      margin: -18px 0 0px 0;
      .el-form-item__content {
        text-align: right;
      }
    }
  }
}
</style>
