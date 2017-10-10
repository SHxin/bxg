<?php

    //1-默认值,首页
    $path = "/dashboard/index";

    //2-如果存在,跳转到对应的页面
    if(array_key_exists('PATH_INFO', $_SERVER)){
        $path = $_SERVER['PATH_INFO'];
    }

    //3-拿到文件,返回给浏览器,如果拿不到,返回404
    if(file_exists("views/".$path.".html")){
        include $_SERVER["DOCUMENT_ROOT"]."/views/".$path.".html";
    }else{
        header("HTTP/1.1 404 NotFound");
        echo "404 NotFound";
    }

    //$_SERVER["DOCUMENT_ROOT"]网站根目录的绝对路径


?>