<template>
    <div class="main">
            <van-form @submit="goto">
                <van-field
                    v-model="username"
                    name="username"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="password"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
                <div style="margin: 16px;margin-left:0px;margin-right:0px">
                    <van-button block type="info">登录</van-button>
                </div>
                </van-form>
    </div>
</template>
<script>
import {login} from '../../api/login'
import { Notify } from 'vant';

export default {
    name: 'login',
    data() {
    return {
        username: '',
        password: '',
        };
    },
    watch:{
	},
    methods: {
        goto(values) {
            const {username,password}=values
            login({'username':username,'password':password}).then((res)=>{
                console.log('res', res);
                if(res.code===200){
                    const userinfo = {
                        id:res.data.id,
                        role:res.data.role,
                        name:res.data.name,
                        nickname:res.data.nickname,
                        portrait:res.data.portrait,
                        apply:res.data.apply,
                    }
                    localStorage.setItem('userinfo',JSON.stringify(userinfo))
                    Notify({ type: 'success', message: '登录成功' });
                    this.$router.push('/home')
                }else{
                    Notify({ type: 'danger', message: '登录失败' });
                }
            })
        },
  },
}
</script>
<style scoped>
.main{
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(125deg,#E4FFCD,#6DD5FA,#2980B9,#E4FFCD);  background-size: 400%;
    animation: bganimation 15s infinite;
}
@keyframes bganimation {
  0%{
    background-position: 0% 50%;
  }
  50%{
    background-position: 100% 50%;
  }
  100%{
    background-position: 0% 50%;
  }
}
.van-form{
    padding-bottom: 200px;
}
.van-button{
    border-radius: 5px;
}
</style>