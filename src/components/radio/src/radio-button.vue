<template>
  <label
    class="xj-radio-button"
    :class="[
      size ? `xj-radio-button--${size}` : '',
      { 'xj-radio--checked': store === label }
    ]">
    <input
      type="radio"
      class="xj-radio-button__original"
      v-model="store"
      :value="label"
      :name="name"
      :disabled="disabled">
    <span
      class="xj-radio-button__inner"
      :style="store === label ? activeStyle : null">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'RadioButton',
  props: {
    name: String,
    label: {
      type: [String, Number],
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      size: this.$parent.size
    }
  },
  computed: {
    store: {
      get () {
        return this.$parent.value
      },
      set (newValue) {
        this.$parent.$emit('input', newValue)
      }
    },
    activeStyle () {
      const styles = {}

      if (this.$parent.fill) {
        styles.backgroundColor = this.$parent.fill
        styles.borderColor = this.$parent.fill
      }
      if (this.$parent.textColor) {
        styles.color = this.$parent.textColor
      }

      return styles
    }
  }
}
</script>

<style lang="scss">
@mixin button-size($padding, $font-size) {
  padding: $padding;
  font-size: $font-size;
}
.xj-radio-button {
  position: relative;
  display: inline-block;
  overflow: hidden;

  &:not(:last-child) {
    margin-right: -1px;
    border-collapse: separate;
  }
  &:first-child {
    .xj-radio-button__inner {
      border-radius: 4px 0 0 4px;
    }
  }
  &:last-child {
    .xj-radio-button__inner {
      border-radius: 0 4px 4px 0;
    }
  }

  /* modifier */
  &--small {
    .xj-radio-button__inner {
      @include button-size(4px 12px, 11px);
    }
  }
  &--normal {
    .xj-radio-button__inner {
      @include button-size(6px 16px, 12px);
    }
  }
  &--large {
    .xj-radio-button__inner {
      @include button-size(8px 16px, 14px);
    }
  }

  /* element */
  &__inner {
    position: relative;
    display: inline-block;
    margin: 0;
    color: #3F536E;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    line-height: 1.5;
    border: 1px solid #C5D9E8;
    background: #FFF;
    transition: all .2s;
    outline: none;
    user-select: none;
    cursor: pointer;
    @include button-size(6px 16px, 12px);
  }
  &__original {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 0;
    outline: none;
    z-index: -1;

    &:disabled {
      & + .xj-radio-button__inner {
        color: #D2D2D2;
        background-color: #F7F7F7;
        border-color: #C5D9E8;
        cursor: not-allowed;
      }
    }
  }
}
</style>
