/**
 * Created by sh on 2017/10/16.
 */
define(['jquery','template'],function ($,template) {
  
  $(function () {
    
    //发送ajax请求
    $.get('/api/course',function (data) {
      console.log(data);
      var str = template('course-tpl',data);
      $('.courses').html(str);
    });
  });
});