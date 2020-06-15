<template>
  <view>
      <view class="album_bg">
          <image :src="album.cover" mode="widthFix" />
          <view class="album_info">
              <view class="album_name">{{album.name}}</view>
              <view class="album_btn">关注专辑</view>
          </view>
      </view>
  </view>
</template>

<script>
export default {
    data(){
        return{
            queryParams:{
                limit: 30,
                order: 'new',
                skip: 0,
                // 1 表示返回值中包含album对象，第一次请求数据
                // 0 不是第一次请求
                first: 1                
            },
            id: -1,
            // 轮播图数字
            album:{},
            // 列表数组
            wallpaper:[],
            hasMore:true
        }
    },
    onLoad(options){
        // options接受url传参
        // this.id = options.id;
        this.id = '5e26b92be7bce739af7644b3';
        this.getList();
    },
    methods:{
        getList(){
            this.request({
                url:`http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
                data:this.queryParams
            }).then(result => {
                this.album = result.res.album;
                this.wallpaper = result.res.wallpaper;
                console.log(result);
                
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
.album_bg {
    position: relative;
    image {

    }

    .album_info {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        height: 80rpx;
        align-items: center;
        color:#000;
        padding: 0 10rpx;
        .album_name {
            font-size: 40rpx;
        }

        .album_btn {
            background-color: $color;
            width:152rpx;
            height: 60rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10rpx;
        }
    }
}
</style>