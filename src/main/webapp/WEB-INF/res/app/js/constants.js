'use strict';

var APP_ROOT = $('meta[name="contextPath"]').attr('content');
var WEB_API_ROOT = APP_ROOT + '/api/web';

var PAGES = {
	login: {url: APP_ROOT + '/login', name: 'Log In'},
	signup: {url: APP_ROOT + '/register', name: 'Sign Up'},
	assetsSettings: {url: APP_ROOT + '/settings/assets', name: 'Assets'},
	currenciesSettings: {url: APP_ROOT + '/settings/currencies', name: 'Currencies'}
};