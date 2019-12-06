import IncomeDetails from '@/views/finance/financeConfirm/components/IncomeDetails'
export default {
  components: {
    IncomeDetails
  },
  data() {
    return {
      showDetails: false,
      detailsInfo: {},
      detailsTitle: {}
    }
  },
  watch: {
    showDetails() {
      this.$emit('update:noShow', this.showDetails)
    }
  }
}
