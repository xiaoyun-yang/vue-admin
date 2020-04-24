<template>
    <div id="login">
       <div class="login-wrap">
           <ul class="menu-tab">
                <li v-for="item in menuTab" :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
           </ul>
           <!-- 开始表单 -->
           <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm"  class="login-form" size="mini">
                
                <!-- 用户名 -->
                <el-form-item prop="usename"  class="item-form">
                    <label>邮箱</label>
                    <el-input type="text" v-model="ruleForm.usename" autocomplete="off"></el-input>
                </el-form-item>

                <!-- 密码 -->
                <el-form-item prop="password" class="item-form">
                    <label>密码</label>
                    <el-input type="text" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <!-- 重复密码 -->
                <el-form-item prop="passwords" class="item-form" v-show="model==='register'">
                    <label>重复密码</label>
                    <el-input type="text" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
                </el-form-item>

                <!-- 验证码 -->
                <el-form-item prop="code" class="item-form">
                    <label>验证码</label>
                    <el-row :gutter="20">
                        <el-col :span="15">
                            <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
                        </el-col>
                        <el-col :span="9">
                            <el-button type="success" class="block">获取验证码</el-button>
                        </el-col>
                    </el-row> 
                </el-form-item>
                
                <!-- 提交按钮 -->
                <el-form-item>
                    <el-button type="danger" @click="submitForm('ruleForm')" class="block">提交</el-button>
                </el-form-item>
          </el-form>
       </div>
    </div>
</template>
<script>
    import {stripscript,validateEmail} from '@/utils/validate'
    export default {
        name:"login",
        data(){

            // 验证用户名
            var validateUsename = (rule, value, callback) => {
                // 验证输入的是否为邮箱
                if (value === '') {                  //为空时
                    callback(new Error('请输入用户名'));
                 } else if(validateEmail(value)){
                    callback(new Error('用户名格式有误'));   //邮箱验证不正确时
                 }
                else {                            //不为空时验证通过，返回true
                    callback();
                }
            };

            // 验证密码
            var validatePassword = (rule, value, callback) => {
                // 过滤后的数据this.ruleForm.Password
                this.ruleForm.password=stripscript(value)
                // 将过滤后的数据重新赋值给value
                value=this.ruleForm.password
                // 下面使用的都是过滤后的value值
                let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/
                if (value === '') {
                callback(new Error('请输入密码'));
                } else if (!reg.test(value)) {
                callback(new Error('密码为6-20位的数字+字母'));
                } else {
                callback();
                }
            };

            // 验证重复密码
            var validatePasswords = (rule, value, callback) => {
                // 如果模块值为login时，就不用验证重复密码了
                if(this.model==='login'){
                    callback();
                }
                if (value === '') {
                callback(new Error('请再次输入密码'));
                } else if (value !=this.ruleForm.password) {
                callback(new Error('两次输入的密码不一致'));
                } else {
                callback();
                }
            };

             // 验证验证码
             var checkCode = (rule, value, callback) => {
                //  过滤特殊字符
                this.ruleForm.code=stripscript(value)
                value=this.ruleForm.code
                let reg = /^[a-z0-9]{6}$/
                if (value === '') {                // 验证码为空时
                return callback(new Error('请输入验证码'));
                } else if(!reg.test(value)){
                    callback(new Error('验证码为6位的数字或字母'))
                } else {
                callback();
                }
            };

            // 定义数据
            return{
               menuTab:[
                   {txt:'登录',current:true,type:'login'},
                   {txt:'注册',current:false,type:'register'}
               ],
                // 模块值
               model:'login',
               ruleForm: {
                    usename:'',
                    password: '',
                    passwords:'',
                    code: ''
                },
                // 下面为表单验证的规则
                // trigger为验证触发的方式，''blur'表示失去焦点时触发validatePass方法，
                // 此方法在上面有写，在这里调用了validatePass方法进行规则验证
                rules2: {
                    usename: [
                        { validator: validateUsename, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    passwords: [
                        { validator: validatePasswords, trigger: 'blur' }
                    ],
                    code: [
                        { validator: checkCode, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            toggleMenu(data){
                this.menuTab.forEach(elem => {
                    elem.current=false;
                });
                // 显示高光
                data.current=true;
                // 修改模块值,将高亮显示的模块的type赋值给model
                this.model=data.type
            },
            // 登录、注册提交按钮验证
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
    padding-top: 50px;
}
.login-wrap{
    margin: auto;
    width: 330px;
    height: auto;
}
.menu-tab{
    text-align: center;
    margin-bottom: 25px;
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
label{
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: rgb(255, 255, 255);
}
.block{
    /* 使button变为块元素，铺满整个宽度 */
    display: block;
    width: 100%;
    /* margin-top: 10px; */
}
</style>