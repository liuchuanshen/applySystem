<template>
    <div class="main">
        <van-nav-bar
            title="发起申请"
            left-text="返回"
            left-arrow
            @click-left="goto()"
        />
        <div class="content">
            <van-form>
                <van-field
                    v-model="data.message"
                    rows="5"
                    autosize
                    label="具体事项"
                    type="textarea"
                    maxlength="50"
                    placeholder="请输入留言"
                    show-word-limit
                />
                <van-field name="pay" label="费用">
                    <template #input>
                        <van-radio-group v-model="data.pay" direction="horizontal" @change="paychange">
                        <van-radio name="1">有</van-radio>
                        <van-radio name="0">无</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field v-model="data.money" type="number" label="金额" v-show="moneyShow"/>
                <van-field name="necessary" label="是否必须">
                    <template #input>
                        <van-radio-group v-model="data.necessary" direction="horizontal">
                        <van-radio name="1">是</van-radio>
                        <van-radio name="0">否</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <van-field
                readonly
                clickable
                name="datetimePicker"
                :value="data.startTime"
                label="开始时间"
                placeholder="点击选择时间"
                @click="showStartPicker = true"
                />
                    <van-popup v-model="showStartPicker" position="bottom">
                    <van-datetime-picker
                        type="time"
                        @confirm="onstartConfirm"
                        @cancel="showStartPicker = false"
                    />
                </van-popup>
                <van-field
                readonly
                clickable
                name="datetimePicker"
                :value="data.endTime"
                label="结束时间"
                placeholder="点击选择时间"
                @click="showEndPicker = true"
                />
                    <van-popup v-model="showEndPicker" position="bottom">
                    <van-datetime-picker
                        type="time"
                        @confirm="onendConfirm"
                        @cancel="showEndPicker = false"
                    />
                </van-popup>
            </van-form>
            <div>
                <van-steps direction="vertical" :active="0">
                    <van-step>
                        <div>
                            <h3>审批人</h3>
                            <p>1人审批</p>
                        </div>
                        <div>
                            <van-image
                                width="50"
                                height="50"
                                :src="this.userinfo.portrait"
                            />
                            <p style="color:#969799;height:0;width:60px">{{this.userinfo.nickname}}</p>
                        </div>
                    </van-step>
                    <van-step>
                        <div>
                            <h3>审批人</h3>
                            <p>1人审批</p>
                        </div>
                        <div>
                            <van-image
                                width="50"
                                height="50"
                                :src="this.userinfo.apply[0].portrait"
                            />
                            <p style="color:#969799;height:0;width:60px">{{this.userinfo.apply[0].nickname}}</p>
                        </div>
                    </van-step>
                </van-steps>
            </div>
        </div>
        <div style="margin: 16px;">
            <van-button round block type="info" @click="submit">
                提交
            </van-button>
        </div>
    </div>
</template>
<script>
import {NowTime} from '../../utils/time'
import {applyAreate} from '../../api/appleCommon'
import { Toast } from 'vant';

export default {
    data(){
        return{
            data:{
                message: '',
                pay:'',
                money:'',
                necessary:'',
                startTime: '00:00',
                endTime:'24:00',
                time:NowTime()
            },
            // status 
            // 0:待处理
            // 1:不同意
            // 2:同意
            moneyShow:false,
            showStartPicker: false,
            showEndPicker: false,
            userinfo:{}
        }
    },
    beforeMount(){
        const data = localStorage.getItem('userinfo')
        this.userinfo = JSON.parse(data)
    },
    methods: {
        submit() {
            Toast.loading({
                message: '提交中...',
                forbidClick: true,
            });
            this.data.id = this.userinfo.id
            applyAreate(this.data).then((res)=>{
                if(res.code===200){
                    Toast.success('提交成功');
                    this.$router.push('/msg')
                }else{
                    Toast.fail('提交失败');
                }
            })
        },
        paychange(e){
            if(e==='1'){
                this.moneyShow=true
            }else{
                this.moneyShow=false
            }
        },
        onstartConfirm(startTime) {
            this.startTime = startTime;
            this.showStartPicker = false;
        },
        onendConfirm(endTime) {
            this.endTime = endTime;
            this.showEndPicker = false;
        },
        goto(){
            this.$router.push('/home')
        }
    },
}
</script>
<style scoped>
.main{
    display: flex;
    flex-direction: column;
}
.content{
    flex: 1;
    background-color: rgb(241, 240, 240);
}
.header{
    display: flex;
    border-bottom-width: 1px;
    border-bottom-color:#ccc;
    border-bottom-style: solid;
}
.header div{
    width: 33%;
    display: flex;
    align-items: center;
    height: 40px;
}
.header div:nth-child(2){
    justify-content: center;
}
.van-icon{
    font-size: 18px;
    padding-left: 20px;
}
/deep/ .van-step__title{
    display: flex;
    justify-content: space-between;
}
</style>