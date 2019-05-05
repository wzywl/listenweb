<template>
  <div style="display: flex;flex-direction: column;height: 100%;">
    <div style="flex: 0 0 auto;">
      <headtop></headtop>
    </div>
    <div style="flex: 1 0 auto;margin-top: 20px;margin-left: 240px;">
      <skills></skills>
    </div>
    <div style="flex: 0 0 auto;">
      <foot></foot>
    </div>
  </div>
</template>

<script>
import headtop from './Head.vue'
import skills from './Skills.vue'
import foot from './Footer.vue'
  export default {
    data() {
      return {}
    },
    components: {
      headtop,
      skills,
      foot
    }
  }
</script>
<style lang="scss" scoped>
</style>
