<template>
    <div class="main">
            <van-nav-bar
                title="关于我的"
                left-text="返回"
                left-arrow
                @click-left="goto()"
            />
        <div>
             <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                <van-cell-group inset>
                    <van-cell v-for="item in list" :key="item._id" :title="item.message" :value="item.status==='0'?'待处理':item.status==='1'?'不通过':'通过'" 
                    :label="item.time" @click="handle(item)"/>
                </van-cell-group>
                </van-list>
            </van-pull-refresh>
        </div>

        <van-dialog v-model="dialogShow" title="查看详情" show-cancel-button>
          <div class="dialogShow">
            <div>具体事项：{{chooseData.message}}</div>
            <div>费用：{{chooseData.pay==='0'?'无':'有'}}</div>
            <div>金额：{{chooseData.money===''?'---':chooseData.money}}</div>
            <div>是否必须：{{chooseData.necessary==='0'?'否':'是'}}</div>
            <div>开始时间：{{chooseData.startTime}}</div>
            <div>结束时间：{{chooseData.endTime}}</div>
            <div class="status">状态：{{chooseData.status==='0'?'待处理':chooseData.status==='1'?'不通过':'通过'}}</div>
          </div>
        </van-dialog>
    </div>
</template>
<script>
import {applyAboutMineList} from '../../api/appleCommon'

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      userinfo:{},
      dialogShow:false,
      chooseData:{}
    };
  },
   mounted(){
        const data = localStorage.getItem('userinfo')
        this.userinfo = JSON.parse(data)
    },
    watch:{
       '$route':'getPath'
	},
  methods: {
    getPath(){
        if(this.$route.path==='/aboutMine'){
            this.getInfo()
            this.onLoad()
        }
    },
    getInfo(){
        const data = localStorage.getItem('userinfo')
        this.userinfo = JSON.parse(data)
    },
    onLoad() {
      this.loading = false;
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []; 
          this.refreshing = false;
        }
        applyAboutMineList({id:this.userinfo.id}).then((res)=>{
            if(res.code===200){
                this.list=res.data.result
            }
        })
        this.loading = false;
      }, 200);
      this.changeColor()
    },
    changeColor(){
      setTimeout(() => {
        const data = document.getElementsByClassName('van-cell__value')
        let collection = []
        for (let key in data) {
          if(typeof(data[key])==='object'){
            collection.push(data[key])
          }
        }
        collection.forEach((item)=>{
          if(item.innerText==='待处理'){
            item.style.color="#ff976a"
          }else if(item.innerText==='不通过'){
            item.style.color="#ee0a24"
          }else if(item.innerText==='通过'){
            item.style.color="#58bc58"
          }
        })
      }, 1000);
    },
    onRefresh() {
      // 清空列表数据
      this.finished = false;
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    handle(item){
        this.chooseData = item
        this.dialogShow = true
      setTimeout(() => {
           const data = document.getElementsByClassName('status')[0]
           if(data.innerText==='状态：待处理'){
                data.style.color="#ff976a"
            }else if(data.innerText==='状态：不通过'){
                data.style.color="#ee0a24"
            }else if(data.innerText==='状态：通过'){
                data.style.color="#58bc58"
            }
      }, 200);
    },
    goto(){
        this.$router.push('/mine')
    }
  },
};
</script>
<style scoped>
.main{
    display: flex;
    flex-direction: column;
}
.header{
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    border-bottom-width: 1px;
    border-bottom-color:#ccc;
    border-bottom-style: solid;
}
.van-icon{
    font-size: 18px;
    padding-left: 20px;
}
.dialogShow{
  padding: 10px;
}
.dialogShow div{
  margin-bottom: 5px;
}
</style>