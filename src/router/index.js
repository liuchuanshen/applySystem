import Vue from 'vue';
import Router from 'vue-router';
import login from '../views/login';
import home from '../views/home';
import msg from '../views/msg';
import mine from '../views/mine';
import applyCommon from '../views/applyCommon';
import aboutMine from '../views/aboutMine';

import { Notify } from 'vant';

Vue.use(Router)

const routes = [
    {
        path:'/login',
        name:'login',
        component:login
    },
    {
        path:'/',
        name:'login',
        component:login
    },
    {
      path:'/home',
      name:'home',
      component:home
    },
    {
        path:'/msg',
        name:'msg',
        component:msg
    },
    {
        path:'/mine',
        name:'mine',
        component:mine
    },
    {
        path:'/applyCommon',
        name:'applyCommon',
        component:applyCommon
    },
    {
        path:'/aboutMine',
        name:'aboutMine',
        component:aboutMine
    },
]

const router = new Router({
    mode:"hash",
    routes: routes // 简写：routes
});

router.beforeEach((to,from,next)=>{
    if(localStorage.getItem('userinfo') || to.path==='/login' || to.path==='/'){
        next()
    }else{
        Notify({ type: 'danger', message: '登录超时' });
        next({
            path:'/'
        })
    }
})

export default router

// export default new Router({
//     mode:"hash",
//     routes:[
//         {
//             path:'/login',
//             name:'login',
//             component:login
//         },
//         {
//             path:'/',
//             name:'login',
//             component:login
//         },
//         {
//           path:'/home',
//           name:'home',
//           component:home
//         },
//         {
//             path:'/msg',
//             name:'msg',
//             component:msg
//         },
//         {
//             path:'/mine',
//             name:'mine',
//             component:mine
//         },
//     ],
// })