<template>
    <view>
        <!-- 专辑背景 -->
        <view class="album_bg">
            <image :src="album.cover" mode="widthFix" />
            <view class="album_info">
                <view class="album_name">{{album.name}}</view>
                <view class="album_btn">关注专辑</view>
            </view>
        </view>

        <!-- 专辑作者 -->
        <view class="album_author">
            <view class="album_author_info">
                <image :src="album.user.avatar" mode="widthFix" />
                <view class="album_name">{{ album.user.name }}</view>
            </view>
            <view class="album_author_desc"><text>{{ album.desc }}</text></view>
        </view>

        <!-- 列表 -->
        <view class="album_list">
            <view class="album_item" v-for="(item,index) in wallpaper" :key="item.id">
                <go-detail :list="wallpaper" :index="index">
                <!-- <image :src="item.thumb+item.rule.replace('$<Height>',360)" mode="widthFix" /> -->
                    <image :src="item.thumb" mode="widthFix" />
                </go-detail>    
            </view>
        </view>
    </view>
</template>

<script>
import goDetail from '@/components/goDetail';

export default {
    components:{
        goDetail
    },
    data() {
        return {
            queryParams: {
                limit: 30,
                order: "new",
                skip: 0,
                // 1 表示返回值中包含album对象，第一次请求数据
                // 0 不是第一次请求
                first: 1
            },
            id: -1,
            // 轮播图数字
            album: {},
            // 列表数组
            wallpaper: [],
            hasMore: true
        };
    },
    onLoad(options) {
        // options接受url传参
        // this.id = options.id;
        this.id = "5d5f8e45e7bce75ae7fb8278";
        // this.id = "5e206ca6e7bce73981fb0752";

        this.getList();
    },
    // 页面触底和上拉加载下一页事件
    onReachBottom() {
        if (this.hasMore) {
            this.queryParams.first = 0;
            this.queryParams.skip += this.queryParams.limit;
            this.getList();
        } else {
            // 弹窗提示
            uni.showToast({
                title: "我是有底线的哦",
                icon: "none"
            });
        }
    },
    methods: {
        getList() {
            this.request({
                url: `http://157.122.54.189:9088/image/v1/wallpaper/album/${this.id}/wallpaper`,
                data: this.queryParams
            }).then(result => {
                //  为啥显示length未定义呢，判断skip也挺好的
                if (Object.keys(this.album).length === 0) {
                // if (this.queryParams.skip === 0) {
                    this.album = result.res.album;
                }
                if (result.res.wallpaper.length === 0) {
                    this.hasMore = false;
                        uni.showToast({
                            title: "我是有底线的哦",
                            icon: "none"
                        });
                    return;
                }
                this.wallpaper = [...this.wallpaper, ...result.res.wallpaper];
            });

            // 因为wallpaper没有数据。所以借用一下推荐的图片
            // this.request({
            //     url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
            //     data: {
            //         limit: 30,
            //         order: "hot",
            //         skip: 0
            //     }
            // }).then(result => {
            //     if (result.res.vertical.length === 0) {
            //         this.hasMore = false;
            //         uni.showToast({
            //             title: "我是有底线的哦",
            //             icon: "none"
            //         });
            //         return;
            //     }
            //     this.wallpaper = [...this.wallpaper, ...result.res.vertical];
            // });
        }
    }
};
</script>

<style lang="scss" scoped>
.album_bg {
    position: relative;
    .album_info {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        display: flex;
        justify-content: space-between;
        height: 80rpx;
        align-items: center;
        color: #fff;
        padding: 0 10rpx;
        .album_name {
            font-size: 40rpx;
        }

        .album_btn {
            background-color: $color;
            width: 152rpx;
            height: 60rpx;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 10rpx;
        }
    }
}

.album_author {
    padding: 10rpx;
    .album_author_info {
        padding: 10rpx 0;
        display: flex;
        align-items: center;
        image {
            width: 50rpx;
        }

        .album_name {
            color: #000;
            margin-left: 15rpx;
        }
    }

    .album_author_desc {
    }
}

.album_list {
    display: flex;
    flex-wrap: wrap;
    .album_item {
        width: 33.33%;
        border: 3rpx solid #fff;
    }
}
</style>