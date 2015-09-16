wdApp.controller('HomeController', ['$scope', '$state', function($scope, $state) {
  document.title = 'waking dream - home'; //set the page title

  $scope.hData = [];

  $.getJSON('../api/home')
    .success(function(data) {

      //console.log(data);
      $scope.hData = data;
      console.log($scope.hData);

      $scope.$apply();

    });

  $('#saveButton').click(function() {

    var title = $('#hallucinationTitle').val();
    var text = $('#hallucinationText').val();

    $scope.hData.unshift({
      'title': title,
      'text': text
    });

    console.log($scope.hData);
    $.post( '../api/home', {
      'title': title,
      'text': text
    } );

    $('#hallucinationTitle').val('');
    $('#hallucinationText').val('');
  });
}])
