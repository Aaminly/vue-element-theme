<template>
  <div id="app">
    <Tips/>
    <router-view/>
  </div>
</template>

<script>
import Tips from './views/layout/components/Tips'
export default {
  name: 'App',
  components: {
    Tips
  }
}
</script>
