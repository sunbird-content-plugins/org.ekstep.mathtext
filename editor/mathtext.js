/*
 * Plugin to create mathtext
 * @class org.ekstep.mathtext.mathTextController
 * @author Swati Singh <swati.singh@tarento.com>
 */
angular.module('org.ekstep.mathtext', [])
  .controller('mathTextController', ['$scope', 'instance', '$timeout', function($scope, instance, $timeout) {

    // var MQ = MathQuill.getInterface(2);
    var mathField, latex, latexSpan, hiddenSpanArea;
    $scope.isMathWysiwyg = true;
    $scope.libraryEquations = [{
        "title": "Area of circle",
        "latex": "A = \\pi r^2"
      },
      {
        "title": "Area of circle",
        "latex": "A = \\pi r^2"
      },
      {
        "title": "Area of circle",
        "latex": "A = \\pi r^2"
      },
      {
        "title": "Area of circle",
        "latex": "A = \\pi r^2"
      },
      {
        "title": "Area of circle",
        "latex": "A = \\pi r^2"
      }
    ];

    $scope.symbols = [{
        "symbol": "β",
        "latex": "\\beta",
        "type": "beta"
      },
      {
        "symbol": "β",
        "latex": "\\beta",
        "type": "beta"
      },
      {
        "symbol": "β",
        "latex": "\\beta",
        "type": "beta"
      },
      {
        "symbol": "β",
        "latex": "\\beta",
        "type": "beta"
      }, {
        "symbol": "β",
        "latex": "\\beta",
        "type": "beta"
      },
      {
        "symbol": "β",
        "latex": "\\beta",
        "type": "beta"
      },
      {
        "symbol": "α",
        "latex": "\\alpha",
        "type": "alpha"
      },
      {
        "symbol": "α",
        "latex": "\\alpha",
        "type": "alpha"
      },
      {
        "symbol": "α",
        "latex": "\\alpha",
        "type": "alpha"
      },
      {
        "symbol": "α",
        "latex": "\\alpha",
        "type": "alpha"
      },
      {
        "symbol": "α",
        "latex": "\\alpha",
        "type": "alpha"
      },
      {
        "symbol": "α",
        "latex": "\\alpha",
        "type": "alpha"
      },
      {
        "symbol": "α",
        "latex": "\\alpha",
        "type": "alpha"
      },
      {
        "symbol": "α",
        "latex": "\\alpha",
        "type": "alpha"
      },
      {
        "symbol": "α",
        "latex": "\\alpha",
        "type": "alpha"
      },
      {
        "symbol": "α",
        "latex": "\\alpha",
        "type": "alpha"
      }
    ];
    var MQ = MathQuill.getInterface(2); // for backcompat
    $scope.symbolsArray = $scope.symbols;
    $timeout(function() {
      $('.menu .item').tab();
      $('.ui.dropdown').dropdown({
        onChange: function(val) {
          if (val != "all") {
            $scope.symbolsArray = [];
            _.each($scope.symbols, function(value, key) {
              if (value.type == val) {
                $scope.symbolsArray.push(value);
              }
            })
          } else {
            $scope.symbolsArray = $scope.symbols;
          }
          console.log($scope.symbolsArray);
          $scope.$safeApply();
        }
      });
    }, 1000);

    $timeout(function() {
      var mathFieldSpan = document.getElementById('math-field');
      latexSpan = document.getElementById('latex');
      hiddenSpanArea = document.getElementById('hiddenSpan');
      mathField = MQ.MathField(mathFieldSpan, {
        spaceBehavesLikeTab: true,
        handlers: {
          edit: function() {
            latexSpan.textContent = mathField.latex();
          }
        }
      });

    }, 1000);

    $scope.latexToEquations = function(latex) {
      mathField.write(latex);
    }

    $scope.latexToFormula = function(id, latex) {
      var mathDiv = document.getElementById(id);
      katex.render(latex, mathDiv, { displayMode: true }); // eslint-disable-line no-undef
    }

    $scope.addToStage = function() {
      // Convert the latex or mathquill to equation 
      // add it to the stage
      $(".mq-textarea").remove();
      var equation = document.getElementById('latex').innerHTML;
      ecEditor.dispatchEvent('org.ekstep.mathtext:create', {
        "latex": equation,
        "type": "rect",
        "x": 10,
        "y": 20,
        "fill": "rgba(0, 0, 0, 0)",
        "opacity": 1,
        "fontFamily": 'NotoSans',
        "fontSize": 18
      });
      $scope.closeThisDialog();
    }
  }])

//# sourceURL=mathText.js