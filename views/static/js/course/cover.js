/**
 * Created by sh on 2017/10/17.
 */
define(['jquery','template','utils','form','uploadify','jcrop'],function ($,template,utils) {
  
  $(function () {
    
    //1-获取id
    var id = utils.geturl('id');
    
    var jcrop_api = null;//全局
    
    //2-发送ajax请求
    $.get('/api/course/picture',{
      cs_id:id
    },function (data) {
      if(data.code == 200){
        console.log(data);
        
        //3-渲染页面
        var str = template('cover-tpl',data.result);
        $('.steps').html(str);
  
        //4-调用function
        render();
      }
    });
    
    //4-function
    function render() {
      //5-上传图片插件uploadify
      $("#upload-btn").uploadify({
        swf:"/views/assets/uploadify/uploadify.swf",
        uploader:"/api/uploader/cover",
        fileObjName:"cs_cover_original",
        buttonText:"选择图片",
        buttonClass:"btn btn-success btn-sm",
        itemTemplate:"<p></p>",
        width:70,
        height:30,
        formData:{cs_id: id},
        onUploadSuccess:function (file,data) {
          data = JSON.parse(data);
          if(data.code == 200){
            console.log(data);
            //预览图片
            $(".preview>img").attr("src", data.result.path);
            //解除按钮禁用
            $("#crop-btn").prop("disabled", false);
            //如果存在jcrop_api,那就销毁
            jcrop_api && jcrop_api.destroy();
            //移除之前生成的缩略图
            $(".jcrop-thumb").remove();
            //重新上传图片之后,按钮变成裁切功能
            $("#crop-btn").text("裁切图片").data("type", "crop");
          }
        }
      });
      //5-上传图片插件uploadify,生成的按钮调整样式
      $('#upload-btn-button').css('line-height',1.5);
  
      //7-裁切插件,给图片的父盒子注册事件,拿到坐标
      $(".preview").on("cropstart cropmove cropend", function(e, s, c){
        $("input[name='x']").val(c.x);
        $("input[name='y']").val(c.y);
        $("input[name='w']").val(c.w);
        $("input[name='h']").val(c.h);
      });
  
      //6-裁切按钮的点击事件
      $('#crop-btn').click(function () {
        var type = $(this).data('type');
        if(type == 'crop'){
          //裁切
          $(this).data('type','save').text("保存图片");
          $('.preview>img').Jcrop({
            setSelect:[0,0,200,100],
            aspectRatio:2,
            boxWidth:400
          },function () {
            jcrop_api = this;
            var thumb = jcrop_api.initComponent('Thumbnailer', {width: 240, height: 120, container: ".thumb"});
          });
        }else{
          //保存
          $('form').ajaxSubmit({
            url:'/api/course/update/picture',
            data:{cs_id:id},
            success:function (data) {
              if(data.code == 200){
                //跳转链接
                location.href = "/course/lessons?id=" + data.result.cs_id;
              }
            }
          })
        }
      });
    }
  });
});