/**
 * Created by sh on 2017/10/17.
 */
define(['jquery','form'],function ($) {
  
  $(function () {
    
    //表单异步提交
    $('form').submit(function () {
      
      //发送ajax请求
      $(this).ajaxSubmit({
        url:'/api/course/create',
        type:'post',
        success:function (data) {
          if(data.code == 200){
            console.log(data);
            //跳转页面
            //要把后台返回的课程id传递给下一个页面
            location.href = '/course/basic?id=' + data.result.cs_id;
          }
        }
      });
      
      return false;
    });
  });
});