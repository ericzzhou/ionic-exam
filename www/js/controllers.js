angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function (modal) {
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

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
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
      targetWidth: 100,
      targetHeight: 100,
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
.controller('WelcomeController', function ($scope) {
  $scope.driverInfo = [
      //{ key: '设备版本', value: ionic.version() },
      //{ key: '设备平台', value: ionic.platform() },
      //{ key: '设备对象', value: ionic.device() }
       { key: 'Reggae', value: 1 },
      { key: 'Chill', value: 2 },
      { key: 'Dubstep', value: 3 },
      { key: 'Indie', value: 4 },
      { key: 'Rap', value: 5 },
      { key: 'Cowbell', value: 6 }
  ];
});
