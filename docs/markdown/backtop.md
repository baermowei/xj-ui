backtop不仅仅只封装了返回顶部的功能，还把右边栏也留位子

### 使用参数

| 参数      | 说明           | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| right  |  距离右边的距离    |  Number   | | 18
| visibilityHeight| 距离顶部多远才会显示  |  Number| | 200
| rightbar插槽|  定制右边栏的插槽
| default插槽| 默认修改返回顶部的插槽


### 使用举例

```
      <xj-backtop>
          <template v-slot:rightbar>
                <ul>
                    <li>定制右边栏 </li>
                </ul>
          </template>
          <div>
              顶部
          </div>
      </xj-backtop>
```
