angular.module('starter.controllers', [])
.controller('AppCtrl', function ($scope, $ionicModal, $timeout, common, localStorageService) {
  $scope.loginData = {
    username: "simon.miao@yamibuy.com",
    password: "yami123"
  };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  })
    .then(function (modal) {
      $scope.modal = modal;
    });

  // Triggered in the login modal to close it
  $scope.closeLogin = function () {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function () {
    $scope.modal.show();
  };

  $scope.doLogin = function () {
    var login = common.login($scope.loginData.username, $scope.loginData.password);
    login.success(function (data) {
      if (data && data.messageId == "10000") {
        var result = data.body;
        if (result == null || result == undefined) {
          $scope.errorMsg = '登录失败';
        }
        else {
          localStorageService.set('user', result.admin);
          localStorageService.set('token', result.token);

          // #region 根据token获取用户信息
          var permissionKey = common.getInfoByToken(result.token).success(function (tokenResult) {
            if (tokenResult && tokenResult.messageId == "10000") {
              var info = tokenResult.body;
              if (info == null || info == undefined) {
                $scope.errorMsg = '获取用户信息失败';
              }
              else {
                localStorageService.set('menuList', info.menuList);
                localStorageService.set('permissionKey', info.operationList);
                localStorageService.set('userprofileList', info.userprofileList);
                //if( info.seller != undefined ){
                //  localStorageService.set('seller', info.seller);
                //}
                $timeout(function () {
                  $scope.closeLogin();
                }, 1000);
              }
            }
          });
          // #endregion
        }
      } else if (data && data.messageId == "99999") {
        $scope.$apply(function () {
          $scope.$apply(function () {
            $scope.errorMsg = 'INVALID_USERNAME_PASSWORD';
          });
        });
      } else {
        $scope.$apply(function () {
          $scope.$apply(function () {
            $scope.errorMsg = 'something wrong';
          });
        });
      }
    });
    login.fail(function (data) {
      $scope.$apply(function () {
        $scope.errorMsg = '网络异常';
        alert('网络异常');
      });
    });

    $timeout(function () {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CameraController', function ($scope, $cordovaCamera) {

  $scope.takePhoto = function () {
    console.log('goCamera');
    $scope.show_camera = true;
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 200,
      targetHeight: 200,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    $cordovaCamera.getPicture(options).then(function (imageData) {
      $scope.imageSrc = "data:image/jpeg;base64," + imageData;
      $scope.show_camera = false;
    }, function (err) {
      console.log("摄像头保存照片失败");
    });
  };
})
.controller('BluetoothController', function ($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('WelcomeController', function ($scope, $timeout, categoryService) {
  var selectCategories = function () {
    categoryService.queryStructureList()
      .success(function (data) {
        if (data.messageId == 10000) {
          $timeout(function () {
            $scope.categories = data.body;
          });
        }
      })
    .complete(function () {
      // 停止广播ion-refresher
      $scope.$broadcast('scroll.refreshComplete');
    });;
  };

  //下拉事件
  $scope.getCategories = function () {
    selectCategories();
  };

  //页面首次加载事件
  selectCategories();
})
.controller('MainController', function ($scope, $timeout, $ionicPopup, $state) {
  $scope.keys = {
    UPCNumber: '', PONumber: ''
  };
  $scope.GoHome = function () {
    $ionicPopup.alert({
      title: '委屈',
      template: '哪里有Home页面啊'
    })
  };
  $scope.searchPO = function () {
    var po = $scope.keys.PONumber;
    if (po == '') {
      $ionicPopup.alert({
        title: '警告',
        template: '请输入PONumber'
      })
    } else {
      $state.go("app.POItemSearch");
    }
  }

  $scope.searchUPC = function () {
    var m = $scope.keys.UPCNumber;

    //$state.go("POItemSearch");


    var alertPopup = $ionicPopup.alert({
      title: '提示',
      template: '这个按钮不能跳转'
    });
    alertPopup.then(function (res) {
      console.log('Thank you for not eating my delicious ice cream cone');
    });

  }
})

.controller('POItemSearchController', function ($scope, $timeout, $state) {
  $scope.GoMain = function () {
    $state.go("app.main");
  };
  $scope.GoInventory = function () {
    $state.go("app.POInventory");
  };
  $scope.ViewPOReceive = function () {
    $state.go("app.ViewPOReceive");
  }

})
.controller('POInventoryController', function ($scope, $timeout, $state) {
  $scope.GoBack = function () {
    $state.go("app.POItemSearch");
  };

})
.controller('ViewPOReceiveController', function ($scope, $timeout, $state) {
  $scope.GoBack = function () {
    $state.go("app.POItemSearch");
  };
})

;
