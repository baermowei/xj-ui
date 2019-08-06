
# Modal 模态框

----

模态对话框，当需要询问用户处理事务，又不希望跳转页面时，可以使用模态框 `Modal` 在当前页面打开一个浮层并承载相应的操作。

当需要弹出一个简洁的确认框时，也可以使用默认的精简版模态框。`xj-UI` 在 `Vue.prototype` 中添加了全局对象 `$Modal`，可以直接通过 `this.$Modal` 对象操作实例方法

## Modal 实例方法

通过调用 `this.$Modal` 的方法来使用：
- `this.$Modal.alert(config)`
- `this.$Modal.confirm(config)`
- `this.$Modal.prompt(config)`
- `this.$Modal.info(config)`
- `this.$Modal.success(config)`
- `this.$Modal.warning(config)`
- `this.$Modal.error(config)`

## 消息提醒

弹出会中断用户的对话框，直到用户知晓该信息之后才可以关闭，属于交互比较重的操作。（类似于 `window.alert`）

可以用 `Promise` 的方式捕获操作反馈，也可以用传入 `callback` 参数的方式

:::demo
```html
<p class="demo-desc">this.$Modal.alert()</p>
<xj-button @click="modalAlert">Alert</xj-button>

<script>
  export default {
    methods: {
      modalAlert () {
        this.$Modal.alert({
          title: '这里是标题名称',
          content: '这里是文本内容',
          callback: function (action) {
            this.$Message(action)
          }
        })
      }
    }
  }
</script>
```
:::



## 组件化方式调用

前面提到的是通过 `this.$Modal` 的方法来使用，如果要自定义对话框，可使用组件化的方式


## 自定义样式

`Modal` 组件提供了自定义页头、页脚的 `slot`，可灵活的控制对话框的样式结构。通过与其他组件的交互，可实现复杂的功能需求。


## 禁用关闭

- 设置属性 `show-close` 为 `false` 可取消右上角的关闭按钮以及键盘的 `ESC` 键；
- 设置属性 `mask-closable` 为 `false` 可取消遮罩层的点击关闭事件；



## 自定义窗口位置

通过属性 `styles` 传入 `CSS Style Object`，可更改弹框的样式


## Modal 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 是否显示模态框，可通过 `v-model` 绑定 | Boolean | - | false |
| title | 模态框的标题 | String | - | - |
| content | 模态框的内容 | String | - | - |
| cancelText | 取消按钮的文本 | String | - | 取消 |
| okText | 确定按钮的文本 | String | - | 确定 |
| maskClosable | 点击遮罩层是否可以关闭模态框 | Boolean | - | true |
| showHead | 是否显示标题 | Boolean | - | true |
| showClose | 是否显示关闭按钮 | Boolean | - | true |
| showFooter | 是否显示底部按钮 | Boolean | - | true |
| showInput | 是否显示输入框 | Boolean | - | false |
| width | 模态框的宽度 | Number / String | - | `520` |
| closeOnPressEsc | 点击 `ESC` 是否可以关闭模态框 | Boolean | - | true |
| styles | 模态框的自定义样式 | Object | - | - |

## Modal 事件

| 事件名称 | 说明          | 返回参数  |
|---------- |-------------- |---------- |
| on-cancel | 点击取消的回调事件 | - |
| on-confirm | 点击确定的回调事件 | - |

## Modal Slots

| 名称     | 说明          |
|-------- |------------------- |
| header | 自定义模态框的头部 |
| footer | 自定义模态框的底部，即底部按钮部分 |
| - | 自定义模态框的主体内容 |

<script>
  export default {
    data () {
      return {
        modal1: false,
        modal2: false,
        modal3: false,
        modal4: false,
        modal5: false,
        modal6: false
      }
    },
    methods: {
      handleClick (type) {
        if (type === 'info') {
          this.$Modal.info({
            content: '这里是提示的消息'
          })
        } else if (type === 'success') {
          this.$Modal.success({
            content: '这里是成功的消息'
          })
        } else if (type === 'warning') {
          this.$Modal.warning({
            content: '这里是警告的消息'
          })
        } else if (type === 'error') {
          this.$Modal.error({
            content: '这里是错误的消息'
          })
        }
      },
      modalAlert () {
        this.$Modal.alert({
          title: '这里是标题名称',
          content: '这里是文本内容',
          callback: action => {
            this.$Message(action)
          }
        })
      },
      modalConfirm () {
        this.$Modal.confirm({
          title: '提示',
          content: '此操作需要非常谨慎，您确定要这么做吗？'
        }).then(() => {
          this.$Message('点击了「确认」按钮')
        }).catch(() => {
          this.$Message('点击了「取消」按钮')
        })
      },
      modalPrompt () {
        this.$Modal.prompt({
          title: '提示',
          content: '请输入邮件地址：'
        }).then((data) => {
          this.$Message(`点击了「确认」按钮，输入框的值为 ${data.value}`)
        }).catch(() => {
          this.$Message('点击了「取消」按钮')
        })
      },
      handleConfirm () {
        this.$Message('Confirm')
      },
      handleCancel () {
        this.$Message('Cancel')
      },
      closeModal2 () {
        this.modal2 = false
      }
    }
  }
</script>
