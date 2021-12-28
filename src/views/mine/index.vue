<template>
    <div class="main">
        <div class="header">
            <div class="userinfo">
                Hello,{{this.userinfo.nickname}}
            </div>
        </div>
        <div class="portrait">
            <van-image
                width="100"
                height="100"
                :src="this.userinfo.portrait"
            />
        </div>
        <div class="footer">
            <van-button type="info" @click="aboutMine">关于我的</van-button>
            <van-button type="danger" @click="logout">退出登录</van-button>
        </div>
    </div>
</template>
<script>
import { Notify } from 'vant';

export default {
    data(){
        return{
            userinfo:{}
        }
    },
    created(){
        this.getInfo()
    },
    watch:{
       '$route':'getPath'
	},
    methods:{
        getPath(){
            if(this.$route.path==='/mine'){
                this.getInfo()
            }
        },
        getInfo(){
            const data = localStorage.getItem('userinfo')
            this.userinfo = JSON.parse(data)
        },
        logout(){
            localStorage.removeItem('userinfo')
            this.$router.push('/')
            this.userinfo={}
            Notify({ type: 'success', message: '退出成功' });
        },
        aboutMine(){
            this.$router.push('/aboutMine')
        }
    }
}
</script>
<style scoped>
.main{
    position: relative;
}
.header{
    width: 100vw;
    height: 40vh;
    background-color: cornflowerblue;
    border-bottom-right-radius: 130px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.userinfo{
    color: #fff;
    font-size: 30px;
}
.van-image{
    position: absolute;
    top: 33vh;
    left: 50px;
    border: 5px solid #fff;
    box-sizing: border-box;
    border-radius: 5px;
}
.footer{
    margin-top: 50px;
    width: 100vw;
    height: 40vh;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.van-button{
    margin-bottom: 10px;
    width: 300px;
}
</style>