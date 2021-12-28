<template>
    <div class="main">
        <div v-for="item in route" :key="item.id" :class="item.classname" @click="goto(item)">
            <van-badge v-if="item.name==='消息'&&contentNum!='0'" :content="contentNum" max="99">
                <div class="child" />
            </van-badge>
            <van-icon :name="item.icon" />
            {{item.name}}
        </div>
    </div>
</template>
<script>
import {applyList} from '../api/appleCommon'
import { Notify } from 'vant';

export default {
    name: 'tabbar',
    data() {
        return {
                userinfo:{},
                contentNum:'0',
                route:[
                    {id:1,path:'/home',icon:'wap-home-o',name:'首页',classname:'home'},
                    {id:2,path:'/msg',icon:'chat-o',name:'消息',classname:'msg'},
                    {id:3,path:'/mine',icon:'user-o',name:'我的',classname:'mine'},
                ]
            };
        },
    mounted(){
      this.getPath()
    },
    watch:{
       '$route':'getPath'
	},
    methods: {
        getPath(){
            switch (this.$route.path) {
                case '/home':
                    this.getInfo()
                    this.update()
                    document.getElementsByClassName('home')[0].style.color="#FF5C43"
                    document.getElementsByClassName('msg')[0].style.color="#333333"
                    document.getElementsByClassName('mine')[0].style.color="#333333"
                    break;
                case '/msg':
                    this.contentNum=''
                    this.getInfo()
                    document.getElementsByClassName('home')[0].style.color="#333333"
                    document.getElementsByClassName('msg')[0].style.color="#FF5C43"
                    document.getElementsByClassName('mine')[0].style.color="#333333"
                    break;
                case '/mine':
                    this.getInfo()
                    this.update()
                    document.getElementsByClassName('home')[0].style.color="#333333"
                    document.getElementsByClassName('msg')[0].style.color="#333333"
                    document.getElementsByClassName('mine')[0].style.color="#FF5C43"
                    break;
                default:
                    break;
            }
        },
        getInfo(){
            const data = localStorage.getItem('userinfo')
            this.userinfo = JSON.parse(data)
        },
        goto(item){
            this.$router.push(item.path)
        },
        update(){
            applyList({applyID:this.userinfo.id}).then((res)=>{
                let num = '0'
                if(res.code===200){
                    const data = res.data.result
                    data.forEach((item)=>{
                        if(item.status==='0'&&this.userinfo.id===item.applyID){
                            num++
                        }
                    })
                    this.contentNum=num
                    if(this.contentNum!=0){
                        Notify({ type: 'primary', message: `你有未读消息${this.contentNum}条` });
                    }
                }
            })
        }
    }
}
</script>
<style scoped>
.main{
    display: flex;
}
.main div{
    color: #333333;
    width: 33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
}
</style>