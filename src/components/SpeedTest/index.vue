
<template>
  <Dialog ref="speedtest" :append-to-body="true" title="实时测速" width="650px">
    <iframe src="https://plugin.speedtest.cn" frameborder="no" scrolling="no" style="width: 100%; height: 610px; texta-glin: center;"/>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog'
export default {
  components: {
    Dialog
  },
  computed: {
    comp() {
      return this.$refs.speedtest
    }
  }
}
</script>
