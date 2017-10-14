/**
 * Created by sh on 2017/10/13.
 */
define(['jquery','template','bootstrap'],function ($,template) {
  
  //过滤
  template.defaults.imports.getage = function(value){
    return Math.ceil((new Date() - new Date(value))/(1000*60*60*24*365));
  };
  
  //1--发送ajax,显示讲师列表
  $.get('/api/teacher',function (data) {
    
    if(data.code == 200){
      
      console.log(data);
      var str = template('teacher-list-tpl',data);
      $('#teacher-list').html(str);
    }
  });
  
  //2--查看按钮功能
  $('#teacher-list').on('click','.detail',function () {
    
    //1-拿到讲师id,发送ajax请求
    var id = $(this).parent().data('id');
    $.get('/api/teacher/view',{tc_id:id},function (data) {
      
      if(data.code == 200){
        
        console.log(data.result);
        var str = template('teacher-info-tpl',data.result);
        $('#teacher-info').html(str);
  
        //2-显示模态框
        $('#teacherModal').modal('show');
      }
    });
  });
  
  //3--教师启用与注销
  //0 已启用 按钮文字:注销
  //1 已注销 按钮文字:启用
  $('#teacher-list').on('click','.btn-status',function () {
    var that = this;
    var status = $(this).data('status');
    var id = $(this).parent().data('id');
    $.post('/api/teacher/handle',{
      tc_id:id,
      tc_status:status
    },function (data) {
      if(data.code == 200){
        var a = data.result.tc_status;
        if(a){
          //已注销
          $(that).data('status',a);
          $(that).removeClass('btn-warning').addClass('btn-success');
          $(that).text('启 用');
        }else{
          //已启用
          $(that).data('status',a);
          $(that).removeClass('btn-success').addClass('btn-warning');
          $(that).text('注 销');
        }
      }
    });
  })
  
});