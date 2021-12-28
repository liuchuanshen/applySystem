<template>
    <div class="main">
            <van-nav-bar title="消息" />
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

        <van-action-sheet
          v-model="show"
          :actions="actions"
          cancel-text="取消"
          @select="onSelect"
          @cancel="onCancel"
        />

        <van-dialog v-model="dialogShow" title="查看详情" show-cancel-button>
          <div class="dialogShow">
            <div>具体事项：{{chooseData.message}}</div>
            <div>费用：{{chooseData.pay==='0'?'无':'有'}}</div>
            <div>金额：{{chooseData.money===''?'---':chooseData.money}}</div>
            <div>是否必须：{{chooseData.necessary==='0'?'否':'是'}}</div>
            <div>开始时间：{{chooseData.startTime}}</div>
            <div>结束时间：{{chooseData.endTime}}</div>
            <div>状态：{{chooseData.status==='0'?'待处理':chooseData.status==='1'?'不通过':'通过'}}</div>
          </div>
        </van-dialog>
    </div>
</template>
<script>
import {applyList,applyUpdate} from '../../api/appleCommon'
import { Toast } from 'vant';

export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      userinfo:{},
      show: false,
      dialogShow:false,
      actions: [{ name: '查看详情' }, { name: '同意', color: '#58bc58' }, { name: '不同意', color: '#ee0a24' }],
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
        if(this.$route.path==='/msg'){
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
        applyList({applyID:this.userinfo.id}).then((res)=>{
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
      if(item.status!='2'){
        this.show = true
      }else{
        this.dialogShow = true 
      }
    },
    onSelect(item) {
      switch (item.name) {
        case '查看详情':
          this.dialogShow = true 
          break;
        case '同意':
          this.change('1')
          this.show = false;
          break;
        case '不同意':
          this.change('0')
          this.show = false;
          break;
        default:
          break;
      }
    },
    change(type){
      // status 
            // 0:待处理
            // 1:不同意
            // 2:同意
      if(type==='1'){
        this.chooseData.status = '2'
        this.chooseData.id = this.userinfo.id
        applyUpdate(this.chooseData).then((res)=>{
          console.log('res',res)
          if(res.code===200){
            Toast.success('成功');
            this.onRefresh()
          }else{
            Toast.fail('失败');
          }
        })
      }else{
        this.chooseData.status = '1'
        this.chooseData.id = this.userinfo.id
        applyUpdate(this.chooseData).then((res)=>{
          if(res.code===200){
            Toast.success('成功');
            this.onRefresh()
          }else{
            Toast.fail('失败');
          }
        })
      }
    },
    onCancel() {
      Toast('取消');
    },
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