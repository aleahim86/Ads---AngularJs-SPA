'use strict';

adsApp.controller('AdsController',
        function AdsController($scope, $log, adsData) {

            /*  var ad = {
             "id": 304,
             "title": "bla",
             "text": "blabla",
             "date": "2015-01-02T13:29:30.4270000",
             "imageDataUrl": null,
             "ownerName": "Smiley",
             "ownerEmail": "smiles@abv.bg",
             "ownerPhone": "02348",
             "categoryId": 6,
             "townId": 12}; 
             
             *$scope.ad = ad;*/



            console.log(adsData.getAll());
        }
);



