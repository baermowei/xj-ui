<template>
  <!-- S 极简分页 -->
  <ul
    v-if="simple"
    class="xj-pagination xj-pagination--simple"
    :class="{
      [`xj-pagination--${size}`]: size
    }">
    <li
      title="上一页"
      class="xj-pagination__prev"
      :class="{
        'xj-pagination--disabled': this.currentPage === 1
      }"
      @click="handlePrev">
      <i class="xjicon iconxiangzuo1"></i>
    </li>
    <div class="xj-pagination__simple-paging">
      <input type="text" class="xj-input__original" :value="currentPage" @keydown="handleKeydown" @keyup="handleKeyup" @change="handleKeyup">
      <span>/</span>
      <span class="xj-pagination__paging-total">{{ totalPage }}</span>
    </div>
    <li
      title="下一页"
      class="xj-pagination__next"
      :class="{
        'xj-pagination--disabled': this.currentPage === this.totalPage
      }"
      @click="handleNext">
      <i class="xjicon iconxiangyou1"></i>
    </li>
  </ul>
  <!-- E 极简分页 -->
  <!-- S 基础分页 -->
  <ul
    v-else
    class="xj-pagination"
    :class="{
      [`xj-pagination--${size}`]: size
    }">
    <span class="xj-pagination__total" v-show="showTotal">
      <slot name="total">{{ `共 ${total} 条` }}</slot>
    </span>
    <li
      class="xj-pagination__prev"
      :class="{
        'xj-pagination--disabled': this.currentPage === 1
      }"
      @click="handlePrev">
      <i class="xjicon iconxiangzuo1"></i>
    </li>
    <template v-if="totalPage < 9">
      <li
        v-for="num in pageRange"
        class="xj-pagination__item"
        :class="{
          'xj-pagination__item--active': currentPage === num
        }"
        @click="changePage(num)">{{ num }}</li>
    </template>
    <template v-else>
      <li class="xj-pagination__item" :class="{ 'xj-pagination__item--active': currentPage === 1 }" @click="changePage(1)">1</li>
      <li class="xj-pagination__item xj-pagination__item--jump-prev" title="向前5页" v-if="currentPage > 4" @click="handleJumpPrev"><i class="xjicon iconshuangjiantou"></i></li>
      <li class="xj-pagination__item" v-if="currentPage > 3" @click="changePage(currentPage - 2)">{{ currentPage - 2 }}</li>
      <li class="xj-pagination__item" v-if="currentPage > 2" @click="changePage(currentPage - 1)">{{ currentPage - 1 }}</li>
      <li class="xj-pagination__item xj-pagination__item--active" v-if="currentPage !== 1 && currentPage !== totalPage">{{ currentPage }}</li>
      <li class="xj-pagination__item" v-if="currentPage < totalPage - 1" @click="changePage(currentPage + 1)">{{ currentPage + 1 }}</li>
      <li class="xj-pagination__item" v-if="currentPage < totalPage - 2" @click="changePage(currentPage + 2)">{{ currentPage + 2 }}</li>
      <li class="xj-pagination__item xj-pagination__item--jump-next" title="向后5页" v-if="currentPage < totalPage - 3" @click="handleJumpNext"><i class="xjicon iconshuangjiantou-right"></i></li>
      <li class="xj-pagination__item" v-if="totalPage > 1" :class="{ 'xj-pagination__item--active' : currentPage === totalPage }" @click="changePage(totalPage)">{{ totalPage }}</li>
    </template>
    <li
      class="xj-pagination__next"
      :class="{
        'xj-pagination--disabled': this.currentPage === this.totalPage
      }"
      @click="handleNext">
      <i class="xjicon iconxiangyou1"></i>
    </li>
    <!--<div v-if="showSizer" class="xj-pagination__sizer">-->
      <!--<xj-select v-model="currentPageSize" :size="size" @on-change="changeSize">-->
        <!--<xj-option v-for="item in pageSizeOpts" :key="item" :value="item">{{ `${item} ${t('at.pagination.pageSize')}` }}</xj-option>-->
      <!--</xj-select>-->
    <!--</div>-->
    <div class="xj-pagination__quickjump" v-if="showQuickjump">
      <span>去</span>
      <input type="text" class="xj-input__original" v-model="jumpPageNum" @keydown="handleKeydown" @keyup.enter="changePage()">
      <span>页</span>
    </div>
  </ul>
  <!-- E 基础分页 -->
</template>

<script>

  export default {
    name: 'Pagination',

    props: {
      current: {
        type: Number,
        default: 1
      },
      total: {
        type: Number,
        required: true,
        default: 0
      },
      pageSize: {
        type: Number,
        default: 10
      },
      size: {
        type: String
      },
      simple: {
        type: Boolean,
        default: false
      },
      showTotal: {
        type: Boolean,
        default: false
      },
      showQuickjump: {
        type: Boolean,
        default: false
      },
      showSizer: {
        type: Boolean,
        default: false
      },
      pageSizeOpts: {
        type: Array,
        default () {
          return [10, 20, 30, 40]
        }
      }
    },
    data () {
      return {
        currentPage: this.current,
        currentPageSize: this.pageSize,
        jumpPageNum: this.current
      }
    },
    watch: {
      current (val) {
        this.currentPage = val
      },
      pageSize (val) {
        this.currentPageSize = val
      }
    },
    computed: {
      totalPage () {
        const num = Math.ceil(this.total / this.currentPageSize)
        return (num === 0) ? 1 : num
      },
      visiblePage () {
        return this.totalPage >= 5 ? 5 : this.totalPage
      },
      pageRange () {
        const range = []
        let start = 1

        if (this.currentPage + (this.visiblePage / 2) > this.totalPage) {
          start = this.totalPage - this.visiblePage + 1
          start = start > 0 ? start : 1
        } else if (this.currentPage - (this.visiblePage / 2) > 0) {
          start = Math.ceil(this.currentPage - (this.visiblePage / 2))
        }

        for (let i = 0; i < this.visiblePage && i < this.totalPage; i++) {
          range.push(start + i)
        }

        return range
      }
    },
    methods: {
      changePage (page) {
        let num = (page || this.jumpPageNum || 1) | 0
        num = num > this.totalPage ? this.totalPage : num
        num = num < 1 ? 1 : num

        if (this.currentPage !== num) {
          this.jumpPageNum = num
          this.currentPage = num
          this.$emit('page-change', num)
        }
      },
      handlePrev () {
        const page = this.currentPage
        if (page <= 1) return false
        this.changePage(page - 1)
      },
      handleNext () {
        const page = this.currentPage
        if (page >= this.totalPage) return false
        this.changePage(page + 1)
      },
      handleJumpPrev () {
        const page = this.currentPage - 5
        page ? this.changePage(page) : this.changePage(1)
      },
      handleJumpNext () {
        const page = this.currentPage + 5
        page > this.totalPage ? this.changePage(this.totalPage) : this.changePage(page)
      },
      handleKeydown (evt) {
        const key = evt.keyCode

        // 按键 0~9，空格，左右方向键
        if (!((key >= 48 && key <= 57) || key === 8 || key === 37 || key === 39)) {
          evt.preventDefault()
        }
      },
      handleKeyup (evt) {
        const key = evt.keyCode
        const numVal = evt.target.value | 0

        if (key === 40) { // Up Arrow
          this.handlePrev()
        } else if (key === 38) { // Down Arrow
          this.handleNext()
        } else if (key === 13) { // Return
          let page = 1

          page = (numVal > this.totalPage) ? this.totalPage : numVal
          page = (numVal <= 0) ? 1 : numVal
          evt.target.value = page
          this.changePage(page)
        }
      },
      changeSize (size) {
        this.currentPageSize = size
        this.changePage(1)
        this.$emit('pagesize-change', size)
      }
    }
  }
</script>
<style lang="scss">
  @import '../../../assets/mixins';

  .xj-pagination {
    @include clearfix();

    /* elements */
    &__item,
    &__prev,
    &__next,
    &__item--jump-prev,
    &__item--jump-next {
      float: left;
      transition: all .3s;
      cursor: pointer;
    }
    &__item {
      + .at-pagination__item {
        margin-left: 4px;
      }
      &--active {
      }
    }
    &__prev {
      margin-right: 8px;
    }
    &__next {
      margin-left: 8px;
    }
    &__item--jump-prev,
    &__item--jump-next {
      &:after {
        content: '•••';
        display: inline-block;
        text-align: center;

        letter-spacing: 1px;
      }
      i {
        display: none;
      }
      &:hover {
        &:after {
          display: none;
        }
        i {
          display: inline-block;
        }
      }
    }
    &__total {
      float: left;
      margin-right: 12px;
    }
    &__quickjump {
      float: left;
      margin-left: 12px;

      input {
        display: inline-block;
        margin: 0 8px;
      }
    }
    &__sizer {
      float: left;
      margin-left: 12px;
      text-align: center;
    }
    &__simple-paging {
      float: left;

    }


  }

</style>
