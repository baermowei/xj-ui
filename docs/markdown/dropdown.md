
# Dropdown 下拉菜单

----

展示折叠的下拉菜单

## 基础用法

基础的下拉菜单

```html

      <xj-dropdown>
          <span>下拉菜单 <i class="icon icon-chevron-down"></i></span>
         <template v-slot:menu>
             <ul>
                 <li>dsfjdsjf</li>
                 <li>dsfjdsjf</li>
                 <li>dsfjdsjf</li>
                 <li>dsfjdsjf</li>
                 <li>dsfjdsjf</li>
                 <li>dsfjdsjf</li>
                 <li>dsfjdsjf</li>
             </ul>
         </template>
      </xj-dropdown>
```
:::

## 激活的方式

下拉菜单默认使用 `hover` 的方式激活，可通过参数 `trigger` 更换激活的方式，支持 `click`，`hover`，`focus`



## 下拉菜单触发的事件

点击菜单选项触发事件 `on-dropdown-command`，返回 `AtDropdownItem` 的 `name` 值


## Dropdown 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| trigger | 触发 `Dropdown` 的方式 | String | `click`, `hover`, `focus` | `hover` |
| placement | 下拉框的对齐方式 | String | `top`, `top-left`, `top-right`, `bottom`, `bottom-left`, `bottom-right` | `bottom` |

## Dropdown 事件

| 事件名称      | 说明          | 返回值  |
|---------- |-------------- |---------- |
| on-dropdown-command | 菜单项点击的时候触发 | 点击的菜单的 `name` 值 |


