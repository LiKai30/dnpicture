<template>
  <scroll-view class="album_scroll_view" scroll-y @scrolltolower="handleToLower">  
      <!-- 轮播图开始 -->
      <view class="album_swiper">
          <swiper class="swiper"
            autoplay
            indicator-dots
            circular
          >
              <swiper-item
                v-for="item in banner"
                :key="item.id"
              >
                  <image :src="item.thumb"/>
              </swiper-item>
          </swiper>
      </view>

      <!-- 列表开始 -->
      <view class="album_list">
          <Navigator class="album_item"
            v-for="item in albumList"
            :key="item.id"
            :url="`/pages/album/index?id=${item.id}`"
          >
            <view class="album_image">
                <image :src="item.cover" mode="aspectFill" />
            </view>
            <view class="album_info">
                <text class="name">{{item.name}}</text>
                <text class="desc">{{item.desc}}</text>
                <view class="album_btn">
                    <text>关注</text>
                </view>
            </view>
          </Navigator>
      </view>
  </scroll-view>
</template>

<script>
export default {
    data(){
        return{
            queryParams:{
                limit: 30,
                order: 'new',
                skip: 0                
            },
            // 轮播图数字
            banner:[],
            // 列表数组
            albumList:[],
            hasMore:true
        }
    },
    mounted(){
        uni.setNavigationBarTitle({
            title: '专辑'
        });      
        
        this.getList();
    },
    methods:{
        handleToLower(){
            if(this.hasMore){
                this.queryParams.skip+=this.queryParams.limit;
                this.getList();
            }else{
                uni.showToast({
                    title:'我也是有底线的哦',
                    icon:'none'
                });
            }
            
        },
        getList(){
            this.request({
                url: "http://157.122.54.189:9088/image/v1/wallpaper/album",
                data: this.queryParams,
            }).then( result => {
                if(this.banner.length === 0){
                    this.banner = result.res.banner;
                }
                result.res.album.length === 0 ? this.hasMore = false : this.hasMore = true;
                this.albumList = [...this.albumList, ...result.res.album];
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.album_scroll_view{
    height:calc(100vh - 36px);
}
.album_swiper{
    .swiper{
        // 高度为图片的比例2.3
        // 使用calc比较消耗性能
        // height: calc(750rpx / 2.3);
        height: 326.1rpx;
        image{
            height: 100%;
        }
    }
}
.album_list {
    padding:10rpx;
    .album_item {
        padding: 10rpx 0;
        display:flex;
        border-bottom: 1rpx solid #ccc;
        .album_image {
            flex:1;
            padding: 10rpx;
            image {
                width: 200rpx;
                height: 180rpx;
            }
        }

        .album_info {
            flex:2;
            padding: 0 10rpx;
            // 解决文字撑开宽度的bug
            overflow:hidden;
            text.name {
                display: block;
                font-size:30rpx;
                color:#000;
                padding:10rpx 0;
            }

            text.desc {
                display: block;
                padding:10rpx 0;
                font-size: 24rpx;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }

            .album_btn {
                padding: 10rpx;
                margin-top:5rpx;
                display:flex;
                justify-content: flex-end;
                text {
                    color:$color;
                    border: 1rpx solid $color;
                    padding: 10rpx;
                }
            }
        }
  }
}
</style>