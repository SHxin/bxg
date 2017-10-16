/**
 * Created by sh on 2017/10/15.
 */
define(['jquery','ckeditor','template','uploadify','datepicker','datepickerCN','region','form'],function ($,CKEDITOR,template) {
  
  $(function () {
    
    //1-发送ajax请求
    $.get('/api/teacher/profile',function (data) {
      if(data.code == 200){
        console.log(data);
        var str = template('settings-tpl',data.result);
        $('.settings').html(str);
      
        loadPlugins();
      }
    });
  
    //2-使用插件
    function loadPlugins() {
    
      //1-上传文件,使用插件,uploadify
      $('#upfile').uploadify({
        swf: '/views/assets/uploadify/uploadify.swf',
        uploader: '/api/uploader/avatar',
        fileObjName: "tc_avatar",
        height: 120,
        width: 120,
        buttonText: '',
        itemTemplate:'<p></p>',
        onUploadSuccess:function (file,data) {
          data = JSON.parse(data);
          if(data.code == 200){
            $(".preview>img").attr("src", data.result.path);
          }
        }
      });
    
      //2-日期选择,使用插件,datepicker
      $('input[name="tc_birthday"],input[name="tc_join_date"]').datepicker({
        format: "yyyy-mm-dd",
        autoclose: true,
        language: "zh-CN"
      });
    
      //3-三级省市联动,使用插件,jquery-region
      //  1-获取到省市区三个select的父元素, 调用region方法
      //  2-给省市区三个select分别加上id p c d
      //  3-设置选中项，可以使用data-id来指定选中的内容
      $('#region').region({
        url: "/views/assets/jquery-region/region.json"
      });
    
      //4-富文本,使用插件,ckeditor
      CKEDITOR.replace('tc_introduce',{
        toolbarGroups: [
          { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
          // { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
          { name: 'links' },
          { name: 'insert' },
          // { name: 'forms' },
          // { name: 'tools' },
          { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
          // { name: 'others' },
        
          { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
          { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
          // { name: 'styles' },
          { name: 'colors' },
          // { name: 'about' }
        ]
      });
    }
    
    //3-表单异步提交
    $('.settings').on('submit','form',function () {
      $(this).ajaxSubmit({
        data: {
          tc_hometown: $("#p>option:selected").text() + "|" + $("#c>option:selected").text() + "|" +$("#d>option:selected").text()
        },
        success:function (data) {
          if(data.code == 200){
            alert('个人资料更新成功');
          }
        }
      });
      
      return false;
    });
  });
});