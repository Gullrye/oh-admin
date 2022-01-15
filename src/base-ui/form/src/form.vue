<template>
  <div class="gull-form">
    <el-form
      :inline="true"
      :model="formData"
      class="demo-form-inline"
      label-width="100px"
    >
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
            <el-form-item :label="item.label">
              <!-- 输入框 -->
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.field]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <!-- 选择器 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.field]"
                  :placeholder="item.placeholder"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option
                      :label="option.title"
                      :value="option.value"
                    ></el-option>
                  </template>
                </el-select>
              </template>
              <!-- 日期选择器 -->
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[item.field]"
                  type="date"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
export default {
  props: {
    myFormData: {
      require: true,
      type: Object
    },
    formItems: {
      require: true,
      type: Array
    },
    isReset: {
      type: Boolean,
      default: false
    }
  },
  emits: ['setIsResetFalse'],
  setup(props, { emit }) {
    const formData = ref(props.myFormData)
    watchEffect(() => {
      if (props.isReset) {
        // for (let key in formData) {
        //   formData.value[key] = ''
        // }
        formData.value = {}
        emit('setIsResetFalse', false, formData.value)
      }
    })
    return {
      formData
    }
  }
}
</script>

<style></style>
