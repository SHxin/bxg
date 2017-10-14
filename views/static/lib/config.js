/**
 * Created by sh on 2017/10/12.
 */
require.config({
	baseUrl:'/views/assets',
	paths:{
		'jquery': 'jquery/jquery.min',
		'cookie': 'jquery-cookie/jquery.cookie',
		'template': 'artTemplate/template-web',
    'form': 'jquery-form/jquery.form',
		'bootstrap': 'bootstrap/js/bootstrap.min',
    'utils': '../static/lib/utils'
	},
  shim:{
	  'bootstrap':{
	    deps:['jquery']
    }
  }
});