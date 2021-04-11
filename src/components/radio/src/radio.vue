<template>
  <label class="xj-radio">
    <span class="xj-radio__input">
      <span
        class="xj-radio__inner"
        :class="{
          'xj-radio--focus': focus,
          'xj-radio--checked': store === label,
          'xj-radio--disabled': disabled
        }"></span>
      <input
        type="radio"
        class="xj-radio__original"
        v-model="store"
        :name="name"
        :value="label"
        :disabled="disabled"
        @focus="focus = true"
        @blur="focus = false">
    </span>
    <span class="xj-radio__label">
      <slot></slot>
    </span>
  </label>
</template>

<script>
import Emitter from '../../../mixins/emitter'
export default {
  name: 'Radio',
  props: {
    value: [String, Number],
    name: String,
    label: {
      type: [String, Number],
      required: true
    },
    disabled: Boolean
  },
  mixins: [Emitter],
  data () {
    return {
      store: this.value,
      focus: false,
      isGroup: false
    }
  },
  watch: {
    store (store) {
      this.$emit('input', store)

      if (this.isGroup) {
        this.dispatch('RadioGroup', 'input', store)
      }
    },
    value (val) {
      this.store = val
    }
  },
  mounted () {
    this.$on('init-data', data => {
      this.store = data
      this.isGroup = true
    })
  }
}
</script>
<style lang="scss">
.xj-radio {
  position: relative;
  display: inline-block;
  color: #3F536E;
  font-size: 0;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;

  + .xj-radio {
    margin-left: 16px;
  }

  /* modifier */
  &--checked {
    .xj-radio-button__inner {
      color: #FFF;
      border-color: #6190E8;
      background-color: #6190E8;
    }
  }

  /* element */
  &__input {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
  }
  &__inner {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #C5D9E8;
    border-radius: 50%;
    background-color: #FFF;
    transition: border .2s;
    cursor: pointer;

    &:not(.xj-radio--disabled):hover {
      border-color: #79A1EB;
    }
    &::after {
      content: '';
      position: absolute;
      left: 50%;
      top: 50%;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #79A1EB;
      transform: translate(-50%, -50%) scale(0);
      transition: transform .2s;
    }
    &.xj-radio--checked {
      border-color: #79A1EB;

      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
    &.xj-radio--disabled {
      border-color: #ECECEC;
      background-color: #F7F7F7;
      cursor: not-allowed;

      &.xj-radio--checked::after {
        background-color: #D2D2D2;
      }
    }
  }
  &__original {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: 0;
    opacity: 0;
    outline: none;
    z-index: -1;
  }
  &__label {
    font-size: 12px;
    padding-left: 8px;
    vertical-align: middle;
  }
}
</style>
