<template>
    <div class="main">
        <div v-for="item in list" :key="item.id" @click="goto(item)" class="menu">
            <van-button plain :type="item.type">{{item.name}}</van-button>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            list:[
                {id:1,type:"primary",name:'发起申请',path:'/applyCommon'},
            ]
        }
    },
    methods:{
        goto(item){
            this.$router.push(item.path)
        }
    }
}
</script>
<style scoped>
.main{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.menu{
    margin-bottom: 20px;
}
.van-button{
    width: 300px;
}
</style>