/*
 * Plugin to create mathtext
 * @class org.ekstep.mathtext.mathTextController
 * @author Swati Singh <swati.singh@tarento.com>
 */
angular.module('org.ekstep.mathtext', [])
  .controller('mathTextController', ['$scope', 'instance', '$timeout', function($scope, instance, $timeout) {
    // var MQ = MathQuill.getInterface(2);
    var mathField, latexSpan;
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
        "symbol": "α",
        "latex": "\\alpha",
        "type": "alpha"
      }
    ];

    $scope.equations = [{
        "equation": "β",
        "latex": "\\beta",
        "type": "fractions"
      },
      {
        "equation": "β",
        "latex": "\\beta",
        "type": "fractions"
      },
      {
        "equation": "α",
        "latex": "\\alpha",
        "type": "fractions"
      }
    ];

    $scope.latexes = [{
        "text": "β",
        "latex": "\\beta",
        "type": "latex"
      },
      {
        "text": "β",
        "latex": "\\beta",
        "type": "latex"
      },
      {
        "text": "α",
        "latex": "\\alpha",
        "type": "latex"
      }
    ];

    var MQ = MathQuill.getInterface(2); // eslint-disable-line no-undef
    $scope.symbolsArray = $scope.symbols;
    $scope.equationsArray = $scope.equations;
    $scope.latexArray = $scope.latexes;

    $scope.$on('ngDialog.opened', function(e, $dialog) {
      var mathTextElement = document.getElementsByClassName('mathtextEditor_1');
      mathTextElement = mathTextElement[0];
      $scope.selectedText = false;
      var textObj = ecEditor.getCurrentObject();
      if (e.currentScope.ngDialogData && e.currentScope.ngDialogData.textSelected && textObj) {
        $scope.selectedText = true;
        $timeout(function() {
        $scope.latexToEquations(textObj.config.latex);
      },500);
      }
    });

    $timeout(function() {
      $('.menu .item').tab();
      $('.ui.dropdown.latex-dropdown').dropdown({
        onChange: function(val) {
          if (val != "all") {
            $scope.latexArray = [];
            _.each($scope.latexes, function(value, key) { // eslint-disable-line no-unused-vars
              if (value.type == val) {
                $scope.latexArray.push(value);
              }
            })
          } else {
            $scope.latexArray = $scope.latexes;
          }
          $scope.$safeApply();
        }
      });
      $('.ui.dropdown.equations-dropdown').dropdown({
        onChange: function(val) {
          if (val != "all") {
            $scope.equationsArray = [];
            _.each($scope.equations, function(value, key) { // eslint-disable-line no-unused-vars
              if (value.type == val) {
                $scope.equationsArray.push(value);
              }
            })
          } else {
            $scope.equationsArray = $scope.equations;
          }
          $scope.$safeApply();
        }
      });
      $('.ui.dropdown.symbols-dropdown').dropdown({
        onChange: function(val) {
          if (val != "all") {
            $scope.symbolsArray = [];
            _.each($scope.symbols, function(value, key) { // eslint-disable-line no-unused-vars
              if (value.type == val) {
                $scope.symbolsArray.push(value);
              }
            })
          } else {
            $scope.symbolsArray = $scope.symbols;
          }
          $scope.$safeApply();
        }
      });
    }, 1000);

    $timeout(function() {
      var mathFieldSpan = document.getElementById('math-field');
      latexSpan = document.getElementById('latex');
      mathField = MQ.MathField(mathFieldSpan, {
        spaceBehavesLikeTab: true,
        handlers: {
          edit: function() {
            latexSpan.textContent = mathField.latex();
          }
        }
      });

    }, 300);

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
      var textObj = ecEditor.getCurrentObject();
      if (textObj && $scope.selectedText) {
        textObj.config.latex = document.getElementById('latex').innerHTML;
        textObj.attributes.latex = textObj.config.latex;
        this.latexToFormula(textObj.id, textObj.config.latex);
      } else {
        $(".mq-textarea").remove();
        var equation = document.getElementById('latex').innerHTML;
        ecEditor.dispatchEvent('org.ekstep.mathtext:create', {
          "latex": equation,
          "type": "rect",
          "x": 10,
          "y": 20,
          "fill": "rgba(0, 0, 0, 0)",
          "opacity": 1
        });
      }
      org.ekstep.contenteditor.api.dispatchEvent('object:modified');
      $scope.closeThisDialog();
    }
  }])

//# sourceURL=mathText.js