import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueSession from 'vue-session'
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import Login from "./components/Login.vue"
import HomePage from "./components/HomePage.vue"
import Signup from "./components/Signup.vue"
import ForgotPassword from "./components/ForgotPassword"


import '@/assets/css/main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false
Vue.use(VueResource)
Vue.use(VueSession)
Vue.use(Vuelidate);
Vue.use(Vuex);
Vue.use(VueRouter);
const store=new Vuex.Store(

{
  state:{
    authenticated:false,
  },
  mutations:{
    setAuthentication(state,status){
      state.authenticated=status;
    }
  }
}


);

const router = new VueRouter({

routes:[
  {
    path:'/',
    redirect:{
      name:'login'
    }

  },
 {
   
  path: '/register',
    name: 'signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: '/home-page',
    name: 'home-page',
    component: HomePage,
    beforeEnter: (to,from,next)=>{
      if(store.state.authenticated==false){
         next("/login");
      }else{
        next();
      }
    }
  
  }
]
});


new Vue({
  
  render: h => h(App),
store:store,
router:router,
}).$mount('#app')
