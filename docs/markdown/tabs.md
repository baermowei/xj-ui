
# Tabs 标签页

----

## 基本用法

选项卡切换组件，默认选中第一项。

:::demo
```html
    <xj-tabs>
      <xj-tab-pane label="Tab1" name="name1">
        <p>Content of Tab Pane 1</p>
      </xj-tab-pane>
      <xj-tab-pane label="Tab2" name="name2">
        <p>Content of Tab Pane 2</p>
      </xj-tab-pane>
      <xj-tab-pane label="Tab3" name="name3">
        <p>Content of Tab Pane 3</p>
      </xj-tab-pane>
    </xj-tabs>

```



## 不使用动画切换 tab-pane




## Tabs 参数
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 当前激活 tab 面板的 name，可以使用 v-model 双向绑定数据 | String | - | 第一项的 `name` |
| animated | 切换标签时是否使用动画 | Boolean | - | true |

## Tabs 事件

| 事件名称      | 说明          | 返回值  |
|---------- |-------------- |---------- |
| on-change | 切换 tab 时触发 | 当前标签的 `{index, name}` |
| on-tab-remove | 删除 tab 时触发 | 被删除标签的 `{index, name}` |

