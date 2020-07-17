<template>
    <scroll-view @scrolltolower="handleTolower" scroll-y v-if="recommends.length>0" class="recommend_view">
        <!-- 推荐开始 -->
        <view class="recommend_wrap">
            <navigator class="recommend_item" v-for="item in recommends" :key="item.id" :url="`/pages/album/index?id=${item.target}`">
                <!-- mode="widthFix"是微信提供的属性  -->
                <image :src="item.thumb" mode="widthFix" />
            </navigator>
        </view>
        <!-- 月份开始 -->
        <view class="months_wrap">
            <view class="months_title">
                <view class="months_title_info">
                    <text> {{months.DD}} /</text>
                    {{ months.MM }} 月
                    <view class="months_text">你负责美丽就好</view>
                </view>
                <view class="months_more">更多 ></view>
            </view>
            <view class="months_content">
                <view class="months_items" v-for="(item,index) in months.items" :key="item.id">
                    <!-- 组件传递数据 -->
                    <go-detail :list="months.items" :index="index">
                    <!-- 因为后端传的是这样，为了动态渲染，后面的是高度 -->
                        <image :src="item.thumb+item.rule.replace('$<Height>', 360)" mode="aspectFill" />
                    </go-detail>
                </view>
            </view>
        </view>
        <!-- 热门部分开始 -->
        <view class="hots_wrap">
            <view class="hots_title">
                <text> 热门 </text>
            </view>
            <view class="hots_content">
                <view class="hots_item" v-for="(item,index) in hotList" :key="item.id">
                    <go-detail :list="hotList" :index="index">
                        <image mode="widthFix" :src="item.thumb"></image>
                    </go-detail>
                </view>
            </view>
        </view>
    </scroll-view>
</template>

<script>
import moment from "moment";
import goDetail from "@/components/goDetail";
export default {
    components:{
        goDetail
    },
    data() {
        return {
            // 推荐列表
            recommends: [],
            months: [],
            // imgSrc:[]
            hotList: [],
            // 请求参数
            queryParams: {
                limit: 30,
                order: "hot",
                skip: 0
            },
            // 是否到底
            hasMore: true
        };
    },
    // 组件挂载
    mounted() {
        this.getList();
    },
    methods: {
        // 获取接口的数据
        getList() {
            this.request({
                url: "http://157.122.54.189:9088/image/v3/homepage/vertical",
                data: this.queryParams
            }).then(result => {
                //console.log(result);
                // 判断是否还有数据
                result.res.vertical.length === 0
                    ? (this.hasMore = false)
                    : (this.hasMore = true);
                // 代码优化，下面的请求只在第一次触发
                if (this.recommends.length === 0) {
                    // 推荐模块的数据
                    this.recommends = result.res.homepage[1].items;
                    // 月份的数据
                    this.months = result.res.homepage[2];
                    // 使用moment.js将时间戳改成 18号/月
                    this.months.MM = moment(this.months.stime).format("MM");
                    this.months.DD = moment(this.months.stime).format("DD");
                }

                // 获取热门数据列表
                // 使用展开运算符叠加数据
                this.hotList = [...this.hotList, ...result.res.vertical];
            });
        },
        handleTolower() {
            /* 
            修改参数 skip+=limit
            重新发送请求
            请求回来成功 hotList的叠加
            */
            if (this.hasMore) {
                this.queryParams.skip += this.queryParams.limit;
                this.getList();
            } else {
                // 弹窗提示
                uni.showToast({
                    title: "我是有底线的哦",
                    icon: "none"
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.recommend_view {
    // 使用scroll-view需要指定高度，且是屏幕减去标题栏的高度
    height: calc(100vh - 36px);
}

.recommend_wrap {
    display: flex;
    flex-wrap: wrap;
    .recommend_item {
        width: 50%;
        border: 5rpx solid white;
    }
}

.months_wrap {
    .months_title {
        display: flex;
        justify-content: space-between;
        padding: 20rpx;

        .months_title_info {
            display: flex;
            align-items: flex-end;
            color: $color;
            font-size: 30rpx;
            font-weight: 600;
            text {
                font-size: 36rpx;
            }

            .months_text {
                font-size: 34rpx;
                color: #666;
                margin-left: 30rpx;
            }
        }

        .months_more {
            color: $color;
            font-size: 24rpx;
        }
    }

    .months_content {
        display: flex;
        flex-wrap: wrap;
        .months_items {
            width: 33.33%;
            border: 5rpx solid #fff;
        }
    }
}
.hots_wrap {
    .hots_title {
        padding: 20rpx;
        text {
            padding-left: 20rpx;
            border-left: 20rpx solid $color;
            font-size: 34rpx;
            font-weight: 600;
        }
    }

    .hots_content {
        display: flex;
        flex-wrap: wrap;
        .hots_item {
            width: 33.33%;
            border: 5rpx solid #fff;
        }
    }
}
</style>