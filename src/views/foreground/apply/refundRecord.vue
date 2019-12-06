<template>
  <refund-record :is-apply="true"/>
</template>

<script>
import RefundRecord from './components/RefundRecord'
export default {
  name: 'RefundRecordApply',
  components: {
    RefundRecord
  }
}
</script>
