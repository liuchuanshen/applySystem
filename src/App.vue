<template>
  <div id="app">
     <Loading v-show="LOADING"></Loading>
     <keep-alive>
      <router-view class="router"></router-view>
     </keep-alive>
      <Tabbar class="tabbar" v-show="tabbarStatus"></Tabbar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Loading from './components/loading.vue'
import Tabbar from './components/tabbar.vue'

export default {
  name: 'App',
  data() {
      return {
        tabbarStatus:false
      };
  },
  computed: {
      ...mapState(['LOADING'])
  },
  watch:{
       '$route':'getPath'
	},
  components: {
    Loading,
    Tabbar
  },
  created(){
     this.getPath()
  },
  methods:{
     getPath(){
        if(this.$route.path==='/' || this.$route.path==='/login'){
          this.tabbarStatus=false
        }else{
          this.tabbarStatus=true
        }
      }
  }
}
</script>

<style>
#app{
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.router{
  flex: 1;
}
.tabbar{
  height: 50px;
  border-top-width: 1px;
  border-top-color:#ccc;
  border-top-style: solid;
}
</style>
