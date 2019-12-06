
<template>
  <count-to
    :start-val="oldNum"
    :end-val="num"
    :duration="time"
    :decimals="toFixed"
    :prefix="prefix"
    :style="{fontSize: size + 'px'}"
    class="price-font"
  />
</template>

<script>
import countTo from 'vue-count-to'
export default {
  name: 'CountNum',
  components: {
    countTo
  },
  props: {
    time: {
      type: Number,
      default: 500
    },
    num: {
      type: Number,
      default: 0
    },
    toFixed: {
      type: Number,
      default: 2
    },
    prefix: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 18
    }
  },
  data() {
    return {
      oldNum: 0
    }
  },
  watch: {
    num(nV, oV) {
      this.oldNum = oV
    }
  }
}
</script>
