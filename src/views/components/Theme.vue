<template>
  <div class="theme-select">
    <ul>
      <li
        v-for="item in themeList"
        :key="item.name"
        :class="{actived: item.name === theme, hidden: item.hidden}"
        @click="changeTheme(item.name, item.hidden || false)"
      >
        <img :src="item.src">
        <span>{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const theme = [
  { name: 'blackgold', label: '黑金' },
  { name: 'universe', label: '小宇宙' },
  { name: 'naughtybear', label: '调皮熊' },
  { name: 'fox', label: '狐狸' },
  { name: 'maidenheart', label: '少女心' },
  { name: 'soot', label: '烟灰' },
  { name: 'thebigblue', label: '碧海情' },
  { name: 'harvestjoy', label: '收获喜悦' },
  { name: 'peachblossom', label: '桃花夭夭' },
  { name: 'minions', label: '小黄人' }
]
const themeList = theme.map(item => {
  const { name } = item
  item.src = require(`@/assets/images/theme-img/${name}.png`)
  return item
})
export default {
  data() {
    return {
      themeList
    }
  },
  computed: {
    ...mapGetters(['theme', 'userInfo'])
  },
  methods: {
    changeTheme(theme, hidden) {
      if (theme === this.theme || hidden) return
      this.$store.dispatch('changeTheme', { theme, id: this.userInfo.id }).then(() => {
        this.$toast.success('切换主题成功')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-select {
  padding-top: 5px;
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  li {
    width: 110px;
    height: 110px;
    text-align: center;
    margin-bottom: 10px;
    &.hidden {
      img {
        filter: grayscale(100%);
        filter: gray;
        cursor: default;
      }
    }
    &.actived {
      img {
        padding: 1px;
      }
    }
    img {
      width: 110px;
      height: 80px;
      cursor: pointer;
      border-radius: 3px;
    }
    span {
      font-size: 14px;
      color: #555;
    }
  }
}
</style>
