<template>
  <Dialog ref="headImg" width="604px" title="照片裁剪" top="20px">
    <div style="width: 550px; height: 650px; margin: 0 auto;">
      <vueCropper
        ref="cropper"
        :img="img"
        :can-move-box="false"
        :auto-crop-width="cropWidth"
        :auto-crop-height="cropHeight"
        output-size="0.7"
        mode="auto 550px"
        can-move
        auto-crop
        fixed-box
        info-true
        enlarge="1.6"
        output-type="png"
      />
    </div>
    <div style="display: flex; justify-content: center; margin-top: 20px;">
      <el-button type="primary" @click="getImg">确定</el-button>
      <el-button type="info" @click="down('blob')">下载裁剪后图片</el-button>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog'
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper,
    Dialog
  },
  props: {
    img: {
      type: String,
      default: ''
    },
    cropWidth: {
      type: String,
      default: ''
    },
    cropHeight: {
      type: String,
      default: ''
    }
  },
  computed: {
    box() {
      return this.$refs.headImg
    }
  },
  methods: {
    getImg() {
      this.$refs.cropper.getCropData((data) => {
        this.$emit('setImg', data)
        this.box.show = false
      })
    },
    down(type) {
      // event.preventDefault()
      const aLink = document.createElement('a')
      aLink.download = 'cutting-img'
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob((data) => {
          this.downImg = window.URL.createObjectURL(data)
          aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData((data) => {
          this.downImg = data
          aLink.href = data
          aLink.click()
        })
      }
    }
  }
}
</script>
