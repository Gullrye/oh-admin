<template>
  <div>
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content :contentTableConfig="contentTableConfig"></page-content>
  </div>
</template>

<script>
import pageSearch from '@/components/page-search'
import pageContent from '@/components/page-content'
import { searchFormConfig } from './config/search-config'
import { contentTableConfig } from './config/content-config'
export default {
  components: {
    pageSearch,
    pageContent
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
}
</script>

<style lang="less" scoped></style>
