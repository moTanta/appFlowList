'use strict';
function ListCtrl($scope, $modal, serviceFactory) {
  $scope.headers = ["ref", "type", "application", "clients", ""];
  $scope.columnSort = { sortColumn: 'ref', reverse: false };

  serviceFactory.getServices().success(function(services) {
    $scope.services = services;
  });
  //Add service modal
  $scope.add = function() {
    var modalInstance = $modal.open({
      templateUrl: 'addServiceModal',
      controller: addServiceModalCtrl
    });
  };

  $scope.view = function(c) {
    var id = c._id;
    var modalInstance = $modal.open({
      templateUrl: 'viewServiceModal',
      controller: viewServiceModalCtrl,
      resolve: {
        service: function() {
          return serviceFactory.getService(id);
        }
      }
    });
  };

  $scope.edit = function(c) {
    var id = c._id;
    var modalInstance = $modal.open({
      templateUrl: 'editServiceModal',
      controller: editServiceModalCtrl,
      resolve: {
        service: function() {
          return serviceFactory.getService(id);
        }
      }
    });
  };

  $scope.delete = function(c) {
     var id = c._id;
    var modalInstance = $modal.open({
      templateUrl: 'deleteServiceModal',
      controller: deleteServiceModalCtrl,
      resolve: {
        service: function() {
          return serviceFactory.getService(id);
        }
      }
    });
  }
}

var addServiceModalCtrl = function($scope, $http, $modalInstance, $window, serviceFactory) {
  $scope.form = {};

  $scope.addService = function() {
    serviceFactory.addService($scope.form.add).success(function(data) {
      $modalInstance.close($window.location.reload());
      });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
};

var viewServiceModalCtrl = function($scope, $modalInstance, service) {
  $scope.allheaders = [  
  "ref", // Because I already got it in Modal Title  
  "application", 
  "name",
  "clients",
  "type",
  "comment",
  "description",
  "documentation",
  "impactKiss",
  "mrc",
  "probleme",
  "date",
  "serviceRemplacant",
  "vuDansKiss",

    "soa.dpPublication",
    "soa.backProt",
    "soa.dpGateway",
    "soa.frontProt",
    "soa.publieBus",
    "soa.remoteUrl",
    "soa.soapBody",
    "soa.chainageAval",
    "soa.soapAction",


    "fichier.format",
    "fichier.transfertXfb",
    "fichier.transfertProt",
  
    ];
    
  $scope.service = service.data.service;

  $scope.close = function() {
    $modalInstance.dismiss('cancel');
  };
};

var editServiceModalCtrl = function($scope, $modalInstance, $window, service, serviceFactory) {
  $scope.form = {};
  $scope.allheaders = [  
  
  "ref", 
  "application", 
  "name",
  "clients",
  "type",
  "comment",
  "description",
  "documentation",
  "impactKiss",
  "mrc",
  "probleme",
  "date",
  "serviceRemplacant",
  "vuDansKiss", 
 
    "soa.dpPublication",
    "soa.backProt",
    "soa.dpGateway",
    "soa.frontProt",
    "soa.publieBus",
    "soa.remoteUrl",
    "soa.soapBody",
    "soa.chainageAval",
    "soa.soapAction",


    "fichier.format",
    "fichier.transfertXfb",
    "fichier.transfertProt",
    
    ];
    
  $scope.form.edit = service.data.service;
  $scope.name = service.data.service.name;

  $scope.editService = function() {
    serviceFactory.updateService(service.data.service._id, $scope.form.edit).success(function() {
      $modalInstance.close($window.location.reload());
    });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  }
};

var deleteServiceModalCtrl = function($scope, $route, $modalInstance, $window, service, serviceFactory) {
  $scope.name = service.data.service.name;

  $scope.deleteService = function() {
    serviceFactory.deleteService(service.data.service._id).success(function() {
      $modalInstance.close();
      serviceFactory.getServices().success(function(services) {
        return $scope.services = services;
      });
      $window.location.reload();
    });
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel')
  };
};

var numeroError = element(by.binding('myForm.ref.$error'));
