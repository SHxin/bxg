/**
 * Created by sh on 2017/10/16.
 */
define(['jquery'],function ($) {
  
  $(function () {
    
    //发送ajax请求
    $.get('/api/course',function (data) {
      console.log(data);
    });
  });
});