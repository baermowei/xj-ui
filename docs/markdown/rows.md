# 基于百分比的两边无间距的布局

只适应于如下的页面布局

![rows布局表现](https://clourd-static.oss-cn-hangzhou.aliyuncs.com/xj-ui/WeChatc638e7b679be28d2df5818d61971f568.png)


### rows参数

| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| rowspan |  一行显示的数量  | String   |                 | 4|
| space   | 之间的间隙      |  String   | 只支持%         |    |
|rowsDate | 数据           |  Array     | 必填||


### 使用举例

```html
    <xj-rows :rowsDate="[3,4,8,9,9,7]" rowspan="5" space="4%">
      <template v-slot="item">
        <div>{{item}}</div>
      </template>
    </xj-rows>

``` 