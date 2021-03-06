/**
 * Created by sh on 2017/10/14.
 */
define(['utils','jquery','template','form','datepicker','datepickerCN','validate'],function (utils,$,template) {
  
  $(function () {
  
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
      data.teacher = {tc_gender: '0'};
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
      });
    
      //表单过滤,jquery-validate插件的使用
      $('form').validate({
        onBlur:true,
        onChange:true,
      
        //阻止表单提交,异步提交
        sendForm:false,
      
        //条件校验
        conditional: {
          forbidden: function(value){
            return value != "前端学院";
          }
        },
      
        //描述说明
        description: {
          name:{
            required:'不能为空',
            description:'不能使用前端学院'
          },
          pass:{
            required:'不能为空',
            pattern:'密码必须为6到15位数字或字母'
          },
          jointime:{
            required:'不能为空',
          }
        },
      
        //所有表单项全部校验通过时会执行
        valid:function () {
          $(this).ajaxSubmit({
            success:function (data) {
              if(data.code == 200){
                location.href = '/teacher/list';
              }
            }
          });
        },
        eachValidField:function () {
          this.parent().parent().addClass('has-success').removeClass('has-error');
        },
        eachInvalidField:function () {
          this.parent().parent().addClass('has-error').removeClass('has-success');
        }
      });
    
    }
  
    //提交数据,发送ajax
    // $('.body.teacher').on('submit','form',function () {
    //   $(this).ajaxSubmit({
    //     success:function (data) {
    //       if(data.code == 200){
    //         location.href = '/teacher/list';
    //       }
    //     }
    //   });
    //
    //   return false;
    // });
  });
});