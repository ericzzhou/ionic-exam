
(function (angular) {
  "use strict";

  var appContext = {
    HTTP_HOST: "http://localhost:63342/central/",
    CDN_HOST: 'http://192.168.20.214/',
    COMMON_SERVICE_HOST: "http://192.168.20.216:8080/",
    PREVIEW_HOST: "http://www.xa.yamibuy.net/cn/goods.php",
    FILE_ROOT: window.ResourceDir,
    TEMPLATE_URL: (window.ResourceDir || "../hub") + "/views/",
    DEBUG: true,
    _G: {},
    buildLoginServiceUrl: function (url) {
      return appContext.COMMON_SERVICE_HOST + "hub/admin/" + url;
    },
    buildUserProfileServiceUrl: function (url) {
      return appContext.COMMON_SERVICE_HOST + "hub/userprofile/" + url;
    },
    buildBrandServiceUrl: function (url) {
      return appContext.COMMON_SERVICE_HOST + "IM/brand/" + url;
    },
    buildItemServiceUrl: function (url) {
      return appContext.COMMON_SERVICE_HOST + "IM/item/" + url;
    },
    buildPropertyServiceUrl: function (url) {
      return appContext.COMMON_SERVICE_HOST + "IM/property/" + url;
    },
    buildPMServiceUrl: function (url) {
      return appContext.COMMON_SERVICE_HOST + "IM/pm/" + url;
    },
    buildCategoryServiceUrl: function (url) {
      return appContext.COMMON_SERVICE_HOST + "IM/category/" + url;
    },
    buildCommonServiceUrl: function (url) {
      return appContext.COMMON_SERVICE_HOST + "IM/common/" + url;
    },
    buildCDNUrl: function (url, type) {
      if (type) {
        return appContext.CDN_HOST + type + '/' + url;
      }
      return appContext.CDN_HOST + url;
    },
    buildTemplateUrl: function (url) {
      return appContext.TEMPLATE_URL + url;
    },


    genMembers: function (scope, members) {
      angular.forEach(members, function (value, key) {
        scope[key] = value;
      });

      return this;
    },


    bindEvents: function (scope, events) {

      var slice = Array.prototype.slice;
      scope.emitEvent = function (eventName) {
        return events[eventName].apply(scope, slice.call(arguments, 1));
      };

      return this;
    },

    kickStart: function (initFn) {
      initFn();
    }

  };


  angular.module("starter")
     .constant('appContext', appContext);

})(window.angular);
