'use strict';

angular.module('Neobazaar')
  .controller('IndexController', function ($scope) {
	  
	  $scope.cdn = '/app/';
	  
	  $scope.changeImage = function( idRegione, showRegion ) {
	        var objMappa = document.getElementById('mapReg');
	        var elemRegione = document.getElementsByName( "myReg_" + idRegione );
	        if( showRegion ) {
	            objMappa.style.backgroundImage ='url(' + $scope.cdn + 'img/regioni/r_'+idRegione+'.gif)';
	            objMappa.style.backgroundRepeat ='no-repeat';
	            
	            if(elemRegione.length>0){
	                elemRegione[0].style.textDecoration='underline';
	            }
	        } else {
	            objMappa.style.backgroundImage='url(' + $scope.cdn + 'img/regioni/none.gif)';
	            
	          if(elemRegione.length>0){
	              elemRegione[0].style.textDecoration='none';
	          }
	        }
	    }
	  
	  
	  $scope.changeAllImages = function(showRegion) {
	        var objMappa=document.getElementById('mapReg');
	        var element=document.getElementById("italy");
	          
	        if(showRegion) {
	            objMappa.style.backgroundImage='url(' + $scope.cdn + 'img/italiaSelected.gif)';
	            element.style.textDecoration='underline';
	        } else { 
	            objMappa.style.backgroundImage='url(' + $scope.cdn + 'img/italia.gif)';
	            element.style.textDecoration='none';
	        } 
	    }
	  
  });