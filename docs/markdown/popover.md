
# Popover 弹出框

----

## 基本用法

默认显示在正中间，并且以 `hover` 方式激活，使用方法跟 `Tooltip` 基本一样


```html

      <xj-popover content="Top Placement" title="Title">
          一段文字
      </xj-popover>
```
:::

## 更改激活的方式

默认使用 `hover` 方式激活，可设置 `trigger` 更换激活方式


## 弹出框的位置

设置属性 `placement` 可更改弹出框的位置，默认显示在顶部 `top`



## 嵌套内容

除了可以使用属性 `title` 和 `content` 设置弹出框的内容，还可以使用 `slot="title"` 和 `slot="content"` 的方式设置弹出框的嵌套内容



## Popover 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 标题文字 | String | - | - |
| content | 提示文字 | String | - | - |
| trigger | 触发的事件类型 | String | `hover`, `focus`, `click` | `click` |
| placement | 弹出框的位置 | String | `top`, `top-left`, `top-right`, `left`, `left-top`, `left-bottom`, `right`, `right-top`, `right-bottom`, `bottom`, `bottom-left`, `bottom-right` | `top` |


