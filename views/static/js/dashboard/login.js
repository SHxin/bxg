/**
 * Created by sh on 2017/10/12.
 */
define(['jquery','cookie'],function ($) {
	
    $(function () {
    
        var form = $('form');
        var ipts = form.find('input');
        
        //form表单的提交事件
        form.submit(function () {
          
          //1-表单过滤
          if(ipts.eq(0).val().trim()=='' || ipts.eq(1).val().trim()==''){
            alert('不能为空');
            return  false;
          }
          
          //2-得到用户名密码
          var data = form.serialize();
          
          //3-发送ajax请求
          $.post('/api/login',data,function (data) {
            //登陆成功
            if(data.code == 200){
              
              //1-把用户信息存到cookie
              var str = JSON.stringify(data.result);
              $.cookie('userinfo',str,{path:'/',expires:365});
              //2-跳转链接
              location.href = '/';
            }
          });
        
          //0-阻止浏览器默认行为
          return false;
        });
    });
});