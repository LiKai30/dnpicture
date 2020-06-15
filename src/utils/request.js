// 基于promise封装小程序的异步请求

export default (params)=>{

    // 加载中的提示
    uni.showLoading({
        title:"加载中..."
    })
    return new Promise((resolve, reject) => {

        wx.request({
            // 正常请求参数
            // data:'',
            // url:'',
            // 简便写法
            ...params,
            success(res){
                // 简化返回值
                resolve(res.data);
            },
            fail(err){
                reject(err);
            },
            complete(){
                uni.hideLoading();
            }
        })
    })
}