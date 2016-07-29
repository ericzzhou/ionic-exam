
angular.module('starter')
.service('common', function ($http, $rootScope, appContext, $state, localStorageService) {
  this.appContext = appContext;

  this.getInfoByToken = function (token) {
    return $.ajax({
      url: appContext.buildLoginServiceUrl('getInfoByToken'),
      type: 'GET',
      headers: { 'token': token }
    });
  };

  this.login = function (email, password) {
    var url = appContext.buildLoginServiceUrl('login');
    var data = {
      email: email,
      password: password
    };
    return $.ajax({
      url: url,
      contentType: "application/x-www-form-urlencoded; charset=utf-8",
      type: "POST",
      data: { body: JSON.stringify(data) },
      //data:data,
      beforeSend: function () { console.log('login before Send') },
      complete: function () { console.log('login complete') }
    })
  };

  this.baseAjax = function (url, type, data) {
    var u = url;
    var token = localStorageService.get('token');
    return $.ajax({
      url: url,
      contentType: "application/json",
      type: type,
      data: JSON.stringify(data),
      headers: { "token": token },
      //beforeSend: function () {console.log('login before Send') },
      complete: function (data) {
        console.log(data);
        var msgid = JSON.parse(data.responseText).messageId;
        if (msgid == "90006") {
          console.log(u);
          console.log(token);
          alert("90006")
        }
        else if (msgid == "90008") {
          console.log(u);
          console.log(token);
          alert("90008")
        }
        else if (msgid == "90010") {
          $state.go("login");
        }
        if (msgid == "90009") {
          alert('没有权限');

        }
      }
    })
  }
})


  .service('categoryService', ['appContext', 'common', function (appContext, common) {
    this.queryList = function () {
      return common.baseAjax(appContext.buildCategoryServiceUrl('queryList'), 'POST');
    };

    this.queryStructureList = function () {
      return common.baseAjax(appContext.buildCategoryServiceUrl('queryStructureList'), 'POST');
    };
  }])

;
