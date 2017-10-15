/**
 * Created by sh on 2017/10/14.
 */
define(['utils','jquery','template','form','datepicker','datepickerCN'],function (utils,$,template) {
  
  var id = utils.geturl('id');
  var data = {};
  if(id){
    //编辑页面
    data.title = '编辑讲师';
    data.url = '/api/teacher/update';
    data.id = id;
    data.text = '保 存';
    $.get('/api/teacher/edit',{tc_id:id},function (datas) {
      if(datas.code == 200){
        data.teacher = datas.result;
  
        render();
      }
    });
  }else{
    //添加页面
    data.title = '添加讲师';
    data.url = '/api/teacher/add';
    data.teacher = {};
    data.id = id;
    data.text = '添 加';
  
    render();
  }
  
  //模板引擎
  function render() {
    var str = template('teacher-manage-tpl',data);
    $('.body.teacher').html(str);
    
    //使用日期选择插件
    $('input[name="tc_join_date"]').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      language: 'zh-CN'
    })
  }
  
  //提交数据,发送ajax
  $('.body.teacher').on('submit','form',function () {
    $(this).ajaxSubmit({
      success:function (data) {
        if(data.code == 200){
          location.href = '/teacher/list';
        }
      }
    });
    
    return false;
  });
  
});