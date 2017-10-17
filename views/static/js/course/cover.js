/**
 * Created by sh on 2017/10/17.
 */
define(['jquery','template','utils','form','uploadify'],function ($,template,utils) {
  
  $(function () {
    
    //1-获取id
    var id = utils.geturl('id');
    
    //2-发送ajax请求
    $.get('/api/course/picture',{
      cs_id:id
    },function (data) {
      if(data.code == 200){
        console.log(data);
        
        //3-渲染页面
        var str = template('cover-tpl',data.result);
        $('.steps').html(str);
        
        //4-上传图片插件uploadify
        $('#upload-btn').uploadify({
          swf:'/views/assets/uploadify/uploadify.swf',
          uploader:'/api/uploader/cover',
          fileObjName:'cs_cover_original',
          formData:{cs_id:id},
          buttonText: "选择图片",
          buttonClass: "btn btn-success btn-sm",
          itemTemplate: "<p></p>",
          width: 70,
          height: 30,
          onUploadSuccess:function (file,data) {
            data = JSON.parse(data);
            if(data.code == 200){
              console.log(data);
              //预览图片
              $(".preview>img").attr("src", data.result.path);
              //接触按钮禁用
              $("#crop-btn").prop("disabled", false);
            }
          }
        });
        //
        $('#upload-btn-button').css('line-height',1.5);
      }
    });
  });
});