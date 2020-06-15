<template>
  <view>
    <view class="home_tab">
        <view class="home_tab_title">
            <view class="title_inner">
                <uni-segmented-control 
                    :current="current" 
                    :values="items.map(v => v.title)" 
                    @clickItem="onClickItem" 
                    style-type="text" 
                    active-color="#d4237b">
                </uni-segmented-control>         
            </view>
            <view class="iconfont iconsearch"></view>
        </view> 
        <view class="home_tab_content">
            <view v-if="current === 0">
                <homeRecommend></homeRecommend>
            </view>
            <view v-if="current === 1">
                <homeCategory></homeCategory>
            </view>
            <view v-if="current === 2">
                <homeNew></homeNew>
            </view>
            <view v-if="current === 3">
                <homeAlbum></homeAlbum>
            </view>            
        </view>
    </view>
    
    

      
  </view>
</template>

<script>

import homeCategory from "./home-category";
import homeNew from "./home-new";
import homeAlbum from "./home-album";
import homeRecommend from "./home-recommend";
// 使用uni-ui组件
import { uniSegmentedControl } from "@dcloudio/uni-ui";

export default {
    components:{
        homeCategory,
        homeNew,
        homeAlbum,
        homeRecommend,
        uniSegmentedControl
    },
    data() {
        return {
            // 数组对象形式方便拓展
            items: [
                { title:'推荐' },
                { title:'分类' },
                { title:'最新' },
                { title:'专辑' }
            ],
            current: 0
        }
    },
    methods: {
        onClickItem(e) {
            if (this.current !== e.currentIndex) {
                this.current = e.currentIndex;
            }
        }
    },
    // 小程序页面加载函数   
    onLoad(){
        this.request({
            url:"http://157.122.54.189:9088/image/v3/homepage/vertical"
        }).then(res=>{
            console.log(res);
        })
    }     
}
</script>

<style lang="scss">
.home_tab{
    .home_tab_title{
        position: relative;
        .title_inner{
            width: 60%;
            margin:0 auto;
        }
        .iconsearch{
            // 垂直居中,然后摆放搜索按钮的未知
            position: absolute;
            top: 50%;
            right: 5%;
            transform: translateY(-50%);
        }
    }
}
</style>