<template>
    <div id="login">
       <div class="login-wrap">
           <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
           </ul>
           <el-button type="primary"></el-button>
           <!-- 开始表单 -->
           <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                
                <!-- 用户名 -->
                <el-form-item prop="username" class="item-from">
                    <label for="username">邮箱</label>
                    <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>        
                </el-form-item>

                <!-- 密码 -->
                <el-form-item prop="psssword" class="item-from">
                    <label for="password">密码</label>
                    <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <!-- 再次输入密码 -->
                <el-form-item prop="psssword" class="item-from" v-show="model==='register'">
                    <label for="password">密码</label>
                    <el-input id="password" type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <!-- 验证码 -->
                <el-form-item prop="code" class="item-from">
                    <label>验证码</label>
                    <el-row :gutter="10">
                        <el-col :span="15">
                            <el-input v-model="tuleForm.code" minlength="6" maxlength="6" ></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block" @click="getSms()" :disabled="codeButtonStatus.status">{{codeButtonStatus.text}}</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>

                <!-- 登录/注册按键 -->
                <el-form-item>
                    <el-button type="danger" @click="submitForm('loginForm')" class="login-btn block" :disabled="loginBottunStatus">{{model==='login'?"登录":"注册"}}</el-button>
                </el-form-item>
           </el-form>
       </div>
    </div>
</template>
<script>
    export default {
        name:"login",
        data(){
            return{
               menuTab:[
                   {txt:'登录',current:true,type:'login'},
                   {txt:'注册',current:false,type:'register'}
               ],
               ruleForm:{
                    username: '',
                    password: '',
                    passwords: '',
                    code: ''
               }
            }
        },
        methods: {
            toggleMenu(data){
                this.menuTab.forEach(elem => {
                    elem.current=false;
                });
                data.current=true;
            }
        },
        created() {
            
        },
        mounted(){
            
        },
    }
</script>
<style scoped>
#login{
    /* 100vh表示占满可视区，50vh表示占可视区的一半 */
    height: 100vh;
    background-color: #344a5f;

}
.login-wrap{
    margin: auto;
    width: 330px;
    height: auto;
}
.menu-tab{
    text-align: center;
}
li{
    display: inline-block;
    width: 85px;
    line-height: 33px;
    font-size: 14px;
    color: rgb(252, 250, 250);
    cursor:pointer;
    border-radius: 2px;
}
.current{
 background-color: rgba(0, 0, 0, .3);
}
</style>