/**
* Author: qianweizhu
* Date: 2019/10/21
* Time: 16:28
*/
<template>
  <el-tooltip :content="msg" placement="top">
    <span class="el-icon-question itemQuestion" />
  </el-tooltip>
</template>

<script>
export default {
  name: 'ItemQuestion',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  created() {}
}
</script>

<style>
.itemQuestion {
  margin-left: 5px;
}
</style>
