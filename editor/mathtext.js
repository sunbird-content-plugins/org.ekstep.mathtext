/*
 * Plugin to create mathText
 * @class org.ekstep.mathText.MathTextController
 * @author Swati Singh <swati.singh@tarento.com>
 */
angular.module('org.ekstep.mathtext', [])
  .controller('mathTextController', ['$scope', 'instance', '$timeout', function($scope, instance, $timeout) {

    // var MQ = MathQuill.getInterface(2);
    var mathField, latex, latexSpan, hiddenSpanArea;
    $scope.isMathWysiwyg = true;


    var MQ = MathQuill.getInterface(2); // for backcompat

    $timeout(function() {
      var mathFieldSpan = document.getElementById('math-field');
      latexSpan = document.getElementById('latex');
      hiddenSpanArea = document.getElementById('hiddenSpan');
      mathField = MQ.MathField(mathFieldSpan);

    }, 1000);


    $scope.insertSqurt = function() {
      mathField.write('\\sqrt{}');
    }


    $scope.mathQuillConvert = function(text) {

    }

    $scope.mathQuillToLatex = function(equation) {
      // logic to convert mathquill text to latex format.

      latexSpan.textContent = mathField.latex();
     // hiddenSpanArea.textContent = mathField.latex();
      $scope.isMathWysiwyg = false;

    }
    $scope.LatexTomathQuill = function(latex) {

      // logic to convert mathquill text to latex format.
      $scope.isMathWysiwyg = true;
    }
    $scope.addToStage = function() {
      // Convert the latex or mathquill to equation 
      // add it to the stage
      //var text1 = mathField.el().innerHTML;
      $(".mq-textarea").remove();
      var text1= mathField.el().innerHTML;
      var equation = document.getElementById('latex').innerHTML;
      // var myText = text1.value;
      //instance.createTransliteratedText(text1);
      ecEditor.dispatchEvent('org.ekstep.mathtext:create', {
        "latex": equation,
        "type": "rect",
        "x": 10,
        "y": 20,
        "fill": "rgba(0, 0, 0, 0)",
        "opacity": 1
      });
      $scope.closeThisDialog();
    }
  }])

//# sourceURL=math-text-editor.js