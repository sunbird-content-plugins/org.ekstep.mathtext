/*
 * Plugin to create mathText
 * @class org.ekstep.mathText.MathTextController
 * @author Swati Singh <swati.singh@tarento.com>
 */
angular.module('org.ekstep.mathText123', [])
  .controller('MathTextController', ['$scope', 'instance', '$timeout', function($scope, instance, $timeout) {

    // var MQ = MathQuill.getInterface(2);
      var mathField, latex;
      $scope.isMathWysiwyg = true;


    var MQ = MathQuill.getInterface(2); // for backcompat

    $timeout(function() {
      var mathFieldSpan = document.getElementById('math-field');
       latexSpan = document.getElementById('latex');
      mathField = MQ.MathField(mathFieldSpan);
    }, 1000);


    $scope.insertSqurt = function(){
       mathField.write('\\sqrt{}');
    }


    $scope.mathQuillConvert = function(text) {
      
    }

    $scope.mathQuillToLatex = function(equation) {
      // logic to convert mathquill text to latex format.

      console.log("mathField", mathField.__controller[0].innerText);
     
      latexSpan.textContent = mathField.latex();
      $scope.isMathWysiwyg = false;
    }
    $scope.LatexTomathQuill = function(latex) {
     
      // logic to convert mathquill text to latex format.
      $scope.isMathWysiwyg = true;
    }
    $scope.addToStage = function() {
      // Convert the latex or mathquill to equation 
      // add it to the stage
    }
  }])

//# sourceURL=mathText.js