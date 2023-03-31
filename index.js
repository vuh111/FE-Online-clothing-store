var app=angular.module("myApp",["ngRoute"]);
app.config(function ($routeProvider,$locationProvider) {
    $locationProvider.hashPrefix("")
    $routeProvider.
    when("/",{
        templateUrl:"trangchu.html",
        controller:crud
    }).
    when("/trangchu",{
        templateUrl:"trangchu.html",
        controller:crud
    }).
    when("/gioithieu",{
        templateUrl:"gioithieu.html"
    }).
    when("/sanpham",{
        templateUrl:"sanpham.html",
        controller:crud
    }).
    when("/detail/:id",{
      templateUrl: "detail.html",
      controller:DetailController
    })
    .when("/dangnhap",{
        templateUrl:"dangnhap.html",
        controller:crud
    }).
    when("/dangky",{
      templateUrl:"dangky.html",
      controller:crud
    }).
    when("/giohang",{
      templateUrl:"giohang.html",
      controller:crud
    }).
    otherwise({
        redirectTo:"/",
        controller:crud
    })
})

window.DetailController = function($scope,$http, $routeParams,$location) {
  $scope.dtid = $routeParams.id;
  $scope.inputvol=1;
  $http.get("http://localhost:3000/quanaos/"+ $scope.dtid).then(
      function(response) {
          if (response.statusText === "OK") {
              $scope.mota=response.data.mota,
              $scope.gia=response.data.gia,
              $scope.kichco=response.data.kichco,
              $scope.mau=response.data.mau,
              $scope.ten=response.data.ten
              $scope.anh=response.data.anh
          }
      },
      function (errors) {
          console.log(errors);
      }
  )
  $scope.inputadd=function () {
    $scope.inputvol=$scope.inputvol+1;
  }
  $scope.inputnev=function () {
    if($scope.inputvol===1){
      $scope.inputvol=2
    }
    $scope.inputvol=$scope.inputvol-1;
  }
  $scope.listsp=[];
  $scope.opendetail=function (id) {
    $location.path('/detail/'+id);
  }
  $http.get("http://localhost:3000/quanaos").then(
    function (response) {
      if (response.statusText === "OK") {
        $scope.listsp = response.data;
      }
    },
    function (errors) {
      console.log(errors);
    }
  );
  $scope.addgiohang=function () {
    $http.get("http://localhost:3000/quanaos/"+$scope.dtid).then(
      function (response) {
        if(response.statusText==="OK"){
          $http.post("http://localhost:3000/giohang",{
            soluong: $scope.inputvol,
            tensp:response.data.ten,
            anhsp:response.data.anh,
            gia:response.data.gia
          })
        }
      }
    )
  }
}


window.crud=function($scope,$http,$sce,$location) {
    $scope.listsp=[];
    
    $scope.giohangcount=-1
    $scope.listbanner=[];
    $scope.numItems = 3
    $scope.listkhresponse=[];
    $scope.saodanhgia=[];
    $scope.myArray = [];
    $scope.toltal_price=[]
    $scope.tongtien=0;
    
    $scope.magiamgia=''
    $http.get("http://localhost:3000/giohang").then(
        function (response) {
          if(response.statusText==="OK"){
            $scope.myArray=response.data;
          response.data.forEach(function (obj,index) {
            
            var y=obj.soluong*obj.gia
            console.log(obj.soluong+" "+obj.gia);
            $scope.tongtien+=y
            console.log($scope.tongtien)
          });
          }
        }
      )
    $http.get("http://localhost:3000/quanaos").then(
        function (response) {
          if (response.statusText === "OK") {
            
            $scope.listsp = response.data;
          }
        },
        function (errors) {
          console.log(errors);
        }
      );
    $http.get("http://localhost:3000/banner").then(
        function (response) {
          if (response.statusText === "OK") {
            $scope.listbanner = response.data;
          }
        },
        function (errors) {
          console.log(errors);
        }
    );
    $http.get("http://localhost:3000/client_respone").then(
        function (response) {
          if (response.statusText === "OK") {
            
            $scope.listkhresponse = response.data;
            $scope.saodanhgia=response.data.danggia
            
          }
        },
        function (errors) {
          console.log(errors);
        }
    );
    $scope.showStarRating = function(rating) {
      var fullStars = Math.floor(rating);
      var halfStar = (rating % 1) >= 0.5;
      var emptyStars = 5 - fullStars - halfStar;
      var starsHtml = '';
  
      for (var i = 0; i < fullStars; i++) {
        starsHtml += '<i class="fa fa-star"> </i>';
      }
  
      if (halfStar) {
        starsHtml += '<i class="fa fa-star-half-o"> </i>';
      }
  
      for (var i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="fa fa-star-o"> </i>';
      }
  
      return $sce.trustAsHtml(starsHtml);
    };
    $scope.opendetail=function (id) {
      $location.path('/detail/'+id);
    }
    $http.get("http://localhost:3000/giohang").then(
      function (response) {
        $scope.listgiohang=response.data
      }
    )
    
    $scope.inputadd=function (id,event) {
      event.preventDefault();
      $http.get("http://localhost:3000/giohang/"+id).then(
        function (response) {
          if(response.statusText==="OK"){
            var volup= response.data.soluong+1;
            $http.put("http://localhost:3000/giohang/"+id,{
              id:response.data.id,
              soluong:volup,
              tensp:response.data.tensp,
              anhsp:response.data.anhsp,
              gia:response.data.gia
            }).then(
              function () {
            
              }
            )
          }
        }
      )
    }
    $scope.inputnev=function (id,event) {
      event.preventDefault();
      $http.get("http://localhost:3000/giohang/"+id).then(
        function (response) {
          if(response.statusText==="OK"){
            var volup= response.data.soluong-1;
            if(volup===0){
              volup+=1;
            } 
           
            $http.put("http://localhost:3000/giohang/"+id,{
              id:response.data.id,
              soluong:volup,
              tensp:response.data.tensp,
              anhsp:response.data.anhsp,
              gia:response.data.gia
            }).then(
              function () {
               
              }
            )
          }
        }
      )
    }
    $scope.deletegiohang=function (id) {
      $http.delete("http://localhost:3000/giohang/"+id).then(
        function (response) {
          if(response.statusText==="OK"){
            alert("Xóa Thành Công")
          }
        }
      )
    }
    $scope.sortBy = 'gia'; 
    $scope.reverse = false; 

    $scope.sortOrder = function(propName) {
    $scope.reverse = ($scope.sortBy === propName) ? !$scope.reverse : false;
    $scope.sortBy = propName;
    };

    

}