<template>
  <view @click="handleClick">
      组件
      <slot></slot>
  </view>
</template>

<script>
export default {
    // 子组件接收数据
    props:{
        list:Array,
        index: Number
    },
    data(){
        return {

        }
    },
    methods:{
        handleClick(){
            // 将数据缓存下来
            // 使用小程序的方式
            getApp().globalData.imgList = this.list;
            getApp().globalData.imgIndex = this.index;
            // 跳转页面
            uni.navigateTo({
                url:'/pages/imgDetail/index'
            })
        }
    },
    mounted(){

    }
}
</script>

<style>

</style>