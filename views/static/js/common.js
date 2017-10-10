$(function () {
	
  //侧边栏用户信息的动态切换-------------------------------
  //不是login页面,要执行的代码
  if(location.pathname != '/dashboard/login'){
    
    //1-从cookie中获取userinfo的信息
    var userinfo = $.cookie('userinfo');
    userinfo = JSON.parse(userinfo);
    
    //2-使用模板引擎将获取到的信息展示到侧边栏
    var str = template('profile-tpl',userinfo);
    $('#user-info').html(str);
    
  }
  
});