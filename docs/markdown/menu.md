
# Menu 导航菜单

----

导航菜单一般分为顶部导航和侧边导航，是为页面提供导航功能的菜单列表

## 顶部导航

顶部导航需要设置 `mode="horizontal"`

:::demo
```html
<xj-menu mode="horizontal" active-name="1">
  <xj-menu-item name="1"><i class="icon icon-home"></i>导航菜单一</xj-menu-item>
  <xj-menu-item name="2" disabled><i class="icon icon-layers"></i>导航菜单二</xj-menu-item>
  <xj-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单三 - 子菜单</template>
    <xj-menu-item-group title="分组一">
      <xj-menu-item name="3-1">子菜单一</xj-menu-item>
      <xj-menu-item name="3-2" disabled>子菜单二</xj-menu-item>
    </xj-menu-item-group>
    <xj-menu-item-group title="分组二">
      <xj-menu-item name="3-3">子菜单三</xj-menu-item>
      <xj-menu-item name="3-4">子菜单四</xj-menu-item>
    </xj-menu-item-group>
  </xj-submenu>
  <xj-menu-item name="4"><i class="icon icon-settings"></i>导航菜单四</xj-menu-item>
</xj-menu>
```
:::

## 顶部导航（多级菜单）

可以在 `AtSubmenu` 中嵌套 `AtSubmenu` 组合成多级菜单

:::demo
```html
<xj-menu mode="horizontal" active-name="1">
  <xj-menu-item name="1"><i class="icon icon-home"></i>导航菜单一</xj-menu-item>
  <xj-menu-item name="2"><i class="icon icon-layers"></i>导航菜单二</xj-menu-item>
  <xj-submenu>
    <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单三</template>
    <xj-menu-item name="3-1"><i class="icon icon-settings"></i>导航菜单四</xj-menu-item>
    <xj-menu-item name="3-2"><i class="icon icon-settings"></i>导航菜单五</xj-menu-item>
    <xj-submenu>
      <template slot="title"><i class="icon icon-life-buoy"></i>导航菜单六</template>
      <xj-menu-item name="3-3-1"><i class="icon icon-settings"></i>导航菜单七</xj-menu-item>
      <xj-menu-item name="3-3-2"><i class="icon icon-settings"></i>导航菜单八</xj-menu-item>
    </xj-submenu>
  </xj-submenu>
  <xj-menu-item name="4"><i class="icon icon-settings"></i>导航菜单四</xj-menu-item>
</xj-menu>
```
:::





## 添加路由链接

除了可以使用 `name` 配置菜单值，也可以通过 `route` 属性配置 `vue-router` 的路由，添加 `replace` 属性可设置不给 `history` 添加新记录


## Menu 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| mode | 导航菜单的模式 | String | `inline`, `horizontal`, `vertical` | `inline` |
| theme | 导航菜单的主题 | String | `light`, `dark` | `light` |
| activeName | 选中的菜单项名称 | String, Number | - | - |
| router | 是否使用 `vue-router` | Boolean | - | false |
| inlineCollapsed | 是否允许每次只展开一个菜单 | Boolean | - | false |
| width | 导航菜单的宽度，仅在 `vertical` 和 `inline` 模式下有效 | String | - | `240px` |

## Menu 事件

| 事件名称 | 说明          | 返回参数  |
|---------- |-------------- |---------- |
| on-select | 切换菜单时触发 | 选中的菜单的值 |

## MenuGroup 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| title | 分组菜单的组名 | String | - | - |

## Submenu 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| disabled | 是否可用 | Boolean | - | false |
| opened | 是否展开菜单项 | Boolean | - | false |

## MenuItem 参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 菜单项的名称 | String / Number | - | - |
| to | 	路由跳转对象，同 `vue-router` 中的 `to` | String / Object | - | - |
| replace | 在使用 `to` 时，是否不需要向 `history` 添加新记录 | Boolean | - | false |
| disabled | 是否可用 | Boolean | - | false |
