/**
 * Created by sh on 2017/10/18.
 */
define(['jquery','template','utils','form','bootstrap'],function ($,template,utils) {
  
  $(function () {
    
    //1-获取id
    var cs_id = utils.geturl('id');
    
    //2-发送ajax请求
    $.get('/api/course/lesson',{
      cs_id:cs_id
    },function (data) {
      if(data.code == 200){
        console.log(data);
        var str = template('lessons-tpl',data.result);
        $('.steps').html(str);
      }
    });
    
    //3-编辑和添加的点击事件
    $('.steps').on('click','.add-btn,.edit-btn',function () {
      var ct_id = $(this).data('id');
      var data = {};
      if(ct_id){
        //编辑
        data.title = "编辑课时";
        data.buttonText = "保 存";
        data.url = "/api/course/chapter/modify";
        $.get('/api/course/chapter/edit',{
          ct_id:ct_id
        },function (datas) {
          if(datas.code == 200){
            console.log(datas);
            $.extend(data,datas.result);
            render();
          }
        });
      }else{
        //添加
        data.title = "添加课时";
        data.buttonText = "添 加";
        data.url = "/api/course/chapter/add";
        render();
      }
      function render() {
        var str = template('lessons-edit-tpl',data);
        $('.modal-content').html(str);
  
        //让模态框显示
        $('#chapterModal').modal('show');
      }
    });
    
    //4-表单异步提交
    $('.modal-content').on('submit','form',function () {
      $(this).ajaxSubmit({
        data: {
          ct_cs_id: cs_id,
          ct_is_free: $("#isfree").is(":checked")? "1": "0"
        },
        success:function (data) {
          if(data.code == 200){
            //让模态框隐藏
            $("#chapterModal").modal("hide");
            // 局部刷新列表数据
            $.ajax({
              url: "/api/course/lesson",
              data: {cs_id: cs_id},
              success: function(data){
                var html = template("lesson-list-tpl", data.result);
                $(".lessons").html(html);
              }
            })
          }
        }
      });
      return false;
    });
  });
});