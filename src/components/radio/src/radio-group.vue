<template>
  <div class="xj-radio-group">
    <slot></slot>
  </div>
</template>

<script>
import Emitter from '../../../mixins/emitter'

export default {
  name: 'RadioGroup',
  props: {
    value: [String, Number],
    size: String,
    fill: String,
    textColor: String
  },
  mixins: [Emitter],
  watch: {
    value (value) {
      this.$emit('radio-group-change', value)
      this.broadcast('Radio', 'init-data', value)
    }
  },
  mounted () {
    this.broadcast('Radio', 'init-data', this.value)
  }
}
</script>
<style lang="scss">
.xj-radio-group {
  display: inline-block;
  font-size: 0;
  line-height: 1;
  border-collapse: separate;
}
</style>
