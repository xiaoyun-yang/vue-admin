// 用来封装验证规则

/*
    过滤特殊字符,输入特殊字符，失去焦点时将特殊字符过滤掉
*/
// 在vue中不能直接用js方法，需要用 export 把方法暴露出去
export function stripscript(Str) {
        var pattern =new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
        var rs = "";
        for (var i = 0; i < Str.length; i++) {
                rs = rs + Str.substr(i, 1).replace(pattern, '');
            }
        return rs;
        } 

export function validateEmail(value){
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return !reg.test(value)?true:false     //验证成立时返回true，验证不成立时返回false
}

/*
 * 密码验证、验证码验证都可以像邮箱验证一样提取出来，
 *但在这我们就不提取了，两种方法可以互相对照方便理解
 */
    