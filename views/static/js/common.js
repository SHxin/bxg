/**
 * Created by sh on 2017/10/12.
 */
define(['jquery','template','cookie'],function ($,template) {
  
  $(function () {
    
    //不是login页面,要执行的代码
    if(location.pathname != '/dashboard/login'){
      
      //查看用户是否登录
      if(!$.cookie('PHPSESSID')){
        location.href = '/dashboard/login';
      }
      
      //侧边栏用户信息的动态切换
      //1-从cookie中获取userinfo的信息
      var userinfo = $.cookie('userinfo');
      userinfo = JSON.parse(userinfo);
      
      //2-使用模板引擎将获取到的信息展示到侧边栏
      var str = template('profile-tpl',userinfo);
      $('#user-info').html(str);
      
    }
    
    //退出按钮的点击事件
    $('#logout').click(function () {
      $.post('/api/logout',function (data) {
        if(data.code == 200){
          location.href = '/dashboard/login';
        }
      });
    });
    
  });
  
});