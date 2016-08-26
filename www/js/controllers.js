angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $cordovaImagePicker, $cordovaToast) {





  $scope.currentLayout = 1;

  $scope.saveCollage = function(){
    html2canvas(jQuery(".layoutarea"), {
        onrendered: function (canvas) {

            jQuery('#tempCanvas').html(canvas);
            //alert(jQuery('#tempCanvas').html());
            //var data = canvas.toDataURL('image/png');
            $scope.saveCanvas();
        }
    });
  }

  $scope.saveCanvas = function(){

    window.canvas2ImagePlugin.saveImageDataToLibrary(
        function(msg){
            //alert(msg);            
            $scope.toastMessage('Image saved.');
        },
        function(err){
            //alert(err);
            $scope.toastMessage('Some error while saving.');
        },
        document.querySelector('#tempCanvas canvas')
    );
  }

  $scope.toastMessage = function(msg){
      $cordovaToast
        .show(msg, 'short', 'bottom')
        .then(function(success) {
          // success
        }, function (error) {
          // error
        });
    }


  $scope.takePhoto = function () {

    var maxImages = ($scope.currentLayout == 1) ? 4 : 5;
    
    var options = {
       maximumImagesCount: maxImages,
       width: 0,
       height: 0,
       quality: 80
      };

      $cordovaImagePicker.getPictures(options)
      .then(function (results) {
        var clsElements = document.querySelectorAll(".image-div");
        for (var i = 0; i < results.length; i++) {
          console.log('Image URI: ' + results[i]);
          clsElements[i].style.backgroundImage = "url('"+results[i]+"')";
        }
      }, function(error) {
        // error getting photos
      });

  }

  $scope.selectLayout = function(layout){
    $scope.currentLayout = layout;
  }

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});
