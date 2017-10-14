/**
 * Created by sh on 2017/10/14.
 */
define([],function () {
  
  return {
    urldata: function () {
      var arr = location.search.slice(1).split('&');
      var obj = {};
      arr.forEach(function (e) {
        obj[e.split('=')[0]] = e.split('=')[1];
      });
      
      return obj;
    },
    geturl: function (key) {
      return this.urldata()[key];
    }
  }
  
});