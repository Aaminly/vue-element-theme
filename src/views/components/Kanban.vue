<template>
  <div class="board-column">
    <div class="board-column-header">
      {{ headerText }}
    </div>
    <draggable
      :list="list"
      v-bind="$attrs"
      :set-data="setData"
      class="board-column-content"
      handle=".board-item-sort"
      @change="evt => $emit('change', evt)"
    >
      <div v-for="(ele, index) in list" :key="ele.id" class="board-item">
        <slot :row="{ele, index}"/>
      </div>
    </draggable>
    <div class="board-add" @mousedown="handleMouseDown"><slot name="footer"/></div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'DragKanban',
  components: {
    draggable
  },
  props: {
    headerText: {
      type: String,
      default: 'Header'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    setData(dataTransfer) {
      // to avoid Firefox bug
      // Detail see : https://github.com/RubaXa/Sortable/issues/1012
      dataTransfer.setData('Text', '')
    },
    handleMouseDown(e) {
      const { target, pageX: x } = e
      if (!target.classList.contains('board-add')) return
      const handler = ({ pageX }) => {
        this.$emit('mouse-move', (x - pageX) * 0.1)
        document.onselectstart = () => false
      }
      const clearMousemove = () => document.removeEventListener('mousemove', handler, false)
      document.addEventListener('mousemove', handler, false)
      document.onmouseleave = clearMousemove
      document.onmouseup = () => {
        clearMousemove()
        document.onselectstart = null
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.board-column {
  min-width: 270px;
  min-height: 100px;
  height: auto;
  border-radius: 3px;
  position: relative;
  display: flex;
  flex-direction: column;
  .board-column-header {
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    text-align: center;
    background: #ddd;
    color: #444;
    border-radius: 3px 3px 0 0;
  }
  .board-column-content {
    border: 10px solid transparent;
    border-right: 0;
    min-height: 60px;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    background-color: #f2f2f2;
    border-radius: 0 0 3px 3px;
    .board-item {
      height: 54px;
      margin: 5px 10px 5px 0;
      background-color: #fff;
      text-align: left;
      line-height: 44px;
      padding: 5px 10px;
      box-sizing: border-box;
      border-radius: 4px;
      box-shadow: 0px 1px 3px 0 rgba(0, 0, 0, 0.2);
    }
  }
  .board-add{
    width: 100%;
    flex-grow: 1;
  }
}
</style>
<style lang="scss">
.board-column{
  .board-add{
    .el-icon-plus{
      font-size: 16px;
      font-weight: bold;
      line-height: 25px;
    }
    .el-popover__reference{
      background: #f0f0f0;
      box-shadow: 0 1px 2px rgba(0,0,0,.1);
      height: 25px;
      margin-top: 10px;
      text-align: center;
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
