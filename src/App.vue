<template>
  <div id="app" style="height: 100000px">
    <div>
      <xj-radio-group v-model="aaaa">
        <xj-radio label="200-400">200-400m²</xj-radio>
        <xj-radio label="400-600">400-600m²</xj-radio>
        <xj-radio label="600+">600m²以上</xj-radio>
      </xj-radio-group>
    </div>
      <xj-rows :rowsDate="[{a:22},3,4,8,9,9,7]" rowspan="5" space="4%">
          <template v-slot="item">
              <div>{{item}}</div>
          </template>
      </xj-rows>
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
      <xj-carousel indicator-position="outside" style="height: 400px">
          <xj-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
          </xj-carousel-item>
          <template v-slot:left>
              左边按钮样式
          </template>
          <template v-slot:right>
              右边按钮样式
          </template>
      </xj-carousel>

    <!--<hr>-->

    <xj-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              style="width: 100px; height: 100px"
              fit="fill"
              lazy
              :preview-src-list="srcList"
    ></xj-image>
    <xj-image src="''"
                  style="width: 100px; height: 100px"
                  fit="fill"
                  lazy
                  :preview-src-list="srcList"
    ></xj-image>

      <xj-menu mode="horizontal" active-name="1">
          <xj-menu-item name="1">导航菜单一</xj-menu-item>
          <xj-menu-item name="2">导航菜单二</xj-menu-item>
          <xj-submenu>
          <template slot="title">导航菜单三</template>
          <xj-menu-item name="3-1">导航菜单四</xj-menu-item>
          <xj-menu-item name="3-2">导航菜单五</xj-menu-item>
          <xj-submenu>
          <template slot="title">导航菜单六</template>
          <xj-menu-item name="3-3-1">导航菜单七</xj-menu-item>
          <xj-menu-item name="3-3-2">导航菜单八</xj-menu-item>
          </xj-submenu>
          </xj-submenu>
          <xj-menu-item name="4">导航菜单四</xj-menu-item>
      </xj-menu>


      <xj-modal v-model="modal1" title="这里是标题" :mask-closable="false">
      <p>这里是模态框的文本内容!</p>
      <p>这里是模态框的文本内容!</p>
      </xj-modal>

      <xj-popover content="Top Placement" title="Title">
          一段文字
      </xj-popover>

    <!--{{srcList}}-->

    <xj-tabs :animated="false">
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



      <xj-pagination :total="60"></xj-pagination>



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
      <div style="width:500px;margin:auto">
        <xj-timeline>
          <xj-timeline-item ref="timelineitem" v-for="(item,index) in courseOfficial" :key="index">
            <div class="course-content">
              <p class="course-title">{{item.date}}--{{item.title}}</p>
              <p class="course-des">{{item.des}}</p>
            </div>
          </xj-timeline-item>
        </xj-timeline>
      </div>
      <xj-pagination show-quickjump :total="100" :page-size="1" show-total/>
  </div>
</template>

<script>
  // import XjModal from './components/modal'
  // import XjPagination from './components/pagination'
// import XjMenu from './components/menu'
// import XjMenuItem from './components/menu/src/menu-item'
// import XjSubmenu from './components/menu/src/submenu'
  // import XjRows from './components/rows'
  // import XjDropDown from './components/dropdown/src/dropdown'
  // import XjTabs from './components/tabs'
  // import XjTabPane from './components/tabs/src/tab-pane'
  // import XjBackTop from './components/backtop'
  // import XjImage from './components/image'
  // import XjCarousel from './components/carousel'
  // import XjCarouselItem from './components/carousel/src/item'
export default {
  name: 'app',
  components: {
    // HelloWorld
    // XjMenu,
    // XjMenuItem,
    // XjSubmenu,
    // XjModal,
    //   XjPagination,
    // // XjRows,
    // XjDropDown,
    // XjTabs,
    // XjTabPane,
      // XjBackTop,
    // XjImage,
    // XjCarousel,
    // XjCarouselItem
  },
  data(){
    return{
      aaaa:'',
      modal1:false,
      srcList: [
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
      ],
      courseOfficial:[
        {date:'数字化元年', title:'星杰20周年', des:'经过3年积累开始推动整体数字化革新，同时购置大楼，并开启高端整装业务。'},
        {date:'2020', title:'产品迭代', des:'多维度精进了全案服务体系，董事长直达号、视频号全面上线。提供有竞争力的产品和服务， 持续为客户创造的价值。'},
        {date:'2018', title:'重塑价值观', des:'重塑企业核心价值观：以客户为中心、奋斗、创新、分享。'},
        {date:'2017', title:'平台赋能', des:'星杰云科技平台上线，围绕高端家装行业进行信息化能力建设，全面升级星杰全案服务标准。'},
        {date:'2015', title:'深耕江浙', des:'开设苏州、南京、宁波、无锡等分公司，完成江浙沪业务阶段布局。'},
        {date:'2012', title:'业务拓展', des:'星杰进军公装事业和软装事业，开启多元化业务运营。'},
        {date:'2011', title:'迈出上海', des:'十年积淀，迈出上海，设立杭州分公司。'},
        {date:'2009', title:'专注高端', des:'完善公司业务定位，聚焦高端家装领域。'},
        {date:'2001', title:'开创元年', des:'上海，浦东，黄浦江畔，星杰国际设计在陆家嘴创立。'},
      ],
    }
  },
  created() {
    this.$Message.error({
      vnode:'<em>sdfsjk</em>',
      message: '这是一条提示信息，10s 后自动关闭',
      duration: 2000
    })
  }
}
</script>

<style lang="scss">
@import "assets/index";
</style>
