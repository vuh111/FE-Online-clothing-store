window.headerctrl=function ($scope,$http) {
    $http.get("http://localhost:3000/giohang").then(
        function (response) {
          if(response.statusText==="OK"){
            $scope.soluonggio=response.data.length
          }
        }
      )
  }