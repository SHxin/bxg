/**
 * Created by sh on 2017/10/12.
 */
define(['jquery','template','nprogress','cookie'],function ($,template,NProgress) {
  
  //进度条开始
  NProgress.start();
  
  $(function () {
  
    //进度条结束
    NProgress.done();
    
    //不是login页面,要执行的代码
    if(location.pathname != '/dashboard/login'){
      
      //查看用户是否登录
      //如果没登录,跳转到登录页面
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
    
    //头部退出按钮的点击事件
    $('#logout').click(function () {
      $.post('/api/logout',function (data) {
        if(data.code == 200){
          location.href = '/dashboard/login';
        }
      });
    });
    
    //侧边栏点击父级菜单显示子级菜单
    $(".navs>ul>li>ul").parent().click(function () {
      $(this).children('ul').slideToggle(200);
    });
    
    //侧边栏选中的菜单高亮
    //1-a标签的href属性值和URL地址的路径名一样
    var activeA = $('.navs ul li a[href="'+ location.pathname +'"]');
    activeA.addClass('active');
    //2-如果a是子级菜单,让ul显示
    //a的爸爸li,li的爸爸ul,ul的兄弟中有a标签的话,就代表这个是子级菜单
    if(activeA.parent().parent().siblings('a').length > 0){
      activeA.parent().parent().show();
    }
    
    //全局ajax事件,进度条和动图
    $(document).ajaxStart(function () {
      NProgress.start();
      $('#mask').show();
    });
    $(document).ajaxStop(function () {
      NProgress.done();
      $('#mask').hide();
    });
    
  });
  
});