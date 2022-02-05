<template>
  <el-descriptions title="Customized style list" :column="2" border>
    <!-- 1 -->
    <el-descriptions-item label="Username">12345</el-descriptions-item>
    <!-- 2 -->
    <el-descriptions-item label="zzz" label-align="right" align="center">
      <!-- 插槽，能够定制 label -->
      <template v-slot:label>
        <h2 :style="{ color: 'skyblue' }">Username</h2>
      </template>
      12345
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup></script>
