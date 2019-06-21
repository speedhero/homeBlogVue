<template>
  <div id="app">
       <el-container>
         <el-header>
           <el-menu
             :default-active="activeIndex2"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
             <el-menu-item index="1">处理中心</el-menu-item>
             <el-submenu index="2">
               <template slot="title">我的工作台</template>
               <el-menu-item index="2-1">选项1</el-menu-item>
               <el-menu-item index="2-2">选项2</el-menu-item>
               <el-menu-item index="2-3">选项3</el-menu-item>
               <el-submenu index="2-4">
                 <template slot="title">选项4</template>
                 <el-menu-item index="2-4-1">选项1</el-menu-item>
                 <el-menu-item index="2-4-2">选项2</el-menu-item>
                 <el-menu-item index="2-4-3">选项3</el-menu-item>
               </el-submenu>
             </el-submenu>
             <el-menu-item index="3" disabled>消息中心</el-menu-item>
             <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
             <el-button type="primary" id="loginLbl" @click="loginLink">登录</el-button>

             <el-dialog title="登录" :visible.sync="dialogFormVisible" top="180px">
               <el-form :model="form" ref="loginForm">
                 <el-form-item label="姓名:" :label-width="formLabelWidth">
                   <el-input v-model="form.name" autocomplete="off"></el-input>
                   <span v-if="form.error.name" class="err-msg">{{form.error.name}}</span>
                 </el-form-item>
                 <el-form-item label="密码:" :label-width="formLabelWidth">
                   <el-input v-model="form.pwd" autocomplete="off"></el-input>
                   <span v-if="form.error.pwd" class="err-msg">{{form.error.pwd}}</span>
                 </el-form-item>
               </el-form>
               <div  >
                 <el-button @click="dialogFormVisible = false">取 消</el-button>
                 <el-button type="primary" @click="loginSubmit('loginForm')">登 录</el-button>
               </div>
             </el-dialog>
           </el-menu>
         </el-header>
         <el-main>
           <router-view/>
         </el-main>
         <el-footer></el-footer>
       </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      dialogFormVisible: false,
      form: {
        name: '',
        pwd: '',
        error: {
          name: '',
          pwd: ''
        }
      },
      formLabelWidth: '60px'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    loginLink () {
      this.dialogFormVisible = true
    },
    check (name, pwd) {
      if (!name) {
        this.form.error.name = '请输入姓名'
        return false
      }
      if (!pwd) {
        this.form.error.pwd = '请输入密码'
        return false
      }
      return true
    },
    loginSubmit (loginForm) {
      const name = this.form.name
      const pwd = this.form.pwd
      const $router = this.$router
      console.log($router)
      if (!this.check(name, pwd)) return
      if (name === 'root' && pwd === '278495617') {
        this.$http.post('http://localhost:8080/blog_web/login', {username: name, password: pwd}, {header: {'Origin': '*', 'Access-Control-Request-Headers': 'authorization'}, emulateJSON: true})
          .then(
            (response) => {
              const data = response.data.data
              console.log(data)
              console.log(data['Authorization'])
              window.localStorage.setItem('Authorization', data['Authorization'])
              console.log(window.localStorage.getItem('Authorization'))
              this.dialogFormVisible = false
            },
            (error) => {
              alert(error)
              console.log(error)
            }
          )
        $router.push('/hello')
      } else {
        alert('用户名密码错误')
      }
    }

  }
}
</script>

<style>
 #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}

  #loginLbl{
    display:block;
    margin-left: auto;
    margin-right: 5%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
