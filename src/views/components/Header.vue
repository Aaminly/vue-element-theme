<template>
  <div class="header-info-box">
    <div class="header-info-box-head student-info-box boxshadow">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderInfo'
}
</script>

<style lang="scss">
.header-info-box {
  position: relative;
  margin-bottom: 22px;
  &-head {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &::before {
      content: "";
      position: absolute;
      top: 10%;
      left: -3px;
      width: 3px;
      height: 80%;
      border-radius: 6px 0 0 6px;
    }
    h1,
    h2 {
      margin-top: 0;
    }
  }
}
</style>
