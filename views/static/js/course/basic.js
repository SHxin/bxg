/**
 * Created by sh on 2017/10/17.
 */
define(['jquery','template','utils','ckeditor','form'],function ($,template,utils,CKEDITOR) {
  
  $(function () {
    
    //1-拿到课程id
    var id = utils.geturl('id');
    
    //2-发送ajax请求
    $.get('/api/course/basic',{
      cs_id:id
    },function (data) {
      if(data.code == 200){
        console.log(data);
        //3-渲染到页面
        var str = template('basic-tpl',data.result);
        $('.steps').html(str);
        
        //4-富文本编辑器
        CKEDITOR.replace('cs_brief');
      }
    });
    
    //5-表单异步提交
    $('.steps').on('submit','form',function () {
      $(this).ajaxSubmit({
        url:'/api/course/update/basic',
        type:'post',
        data:{cs_id:id},
        success:function (data) {
          if(data.code == 200){
            //6-跳转页面
            location.href = '/course/cover?id=' + data.result.cs_id;
          }
        }
      });
      
      return false;
    });
  });
});