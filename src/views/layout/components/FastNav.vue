<template>
  <div class="fast-nav-box">
    <el-link>报名</el-link>
    <el-link>班级查询</el-link>
    <el-link>缴退费总览</el-link>
    <el-link>配置</el-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.fast-nav-box{
  display: flex;
  height: 46px;
  align-items: center;
  position: relative;
  z-index: 3;
  display: none;
  > a{
    box-sizing: border-box;
    height: 18px;
    line-height: 26px;
    font-size: 15px;
    margin: 0 15px;
    &:last-child{
      padding-left: 15px;
      margin: 0;
      position: relative;
      &:after{
        content: "";
        position: absolute;
        left: 0;
        width: 0;
        height: 18px;
        border-left: 1px solid #666;
      }
    }
  }
}
</style>
