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
        "title": "Quadratic equation",
        "latex": "x = \\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}"
      },
      {
        "title": "Binomial theorem",
        "latex": "(x+a)^n = \\sum _{k=0}^n(\\frac{n_{ }}{k})x^ka^{n-k}"
      },
      {
        "title": "Expansion of a sum",
        "latex": "(1+x)^n=1+\\frac{nx}{1!}+\\frac{n(n-1)x^2}{2!}+......."
      },
      {
        "title": "Fourier series",
        "latex": "f(x)=a_0+\\sum _{n=1}^{\\infty }(a_n\\cos \\frac{n\\Pi x}{L}+b_n\\sin \\frac{n\\Pi x}{L})"
      },
      {
        "title": "Slope of a line",
        "latex": "m=\\frac{y_2-y}{x_2-x_1}"
      },
      {
        "title": "Distance between two points",
        "latex": "d=\\sqrt{(x_2-x_1)^2-(y_2-y_1)^2}"
      },
      {
        "title": "Volume of a sphere",
        "latex": "\\frac{4}{3}\\pi r^3"
      },
      {
        "title": "Product rule",
        "latex": "a^n\\times a^m=a^{n+m}"
      }
    ];

    $scope.symbols = [{
        "symbol": "α",
        "latex": "\\alpha",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "β",
        "latex": "\\beta",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "δ",
        "latex": "\\delta",
        "type": "Greek and Hebrew letters"
      },{
        "symbol": "",
        "latex": "\\epsilon",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "η",
        "latex": "\\eta",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "γ",
        "latex": "\\gamma",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "ι",
        "latex": "\\iota",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "κ",
        "latex": "\\kappa",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "λ",
        "latex": "\\lambda",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "µ",
        "latex": "\\mu",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "ν",
        "latex": "\\nu",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "o",
        "latex": "o",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "ω",
        "latex": "\\omega",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "φ",
        "latex": "\\phi",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "π",
        "latex": "\\pi",
        "type": "Greek and Hebrew letters"
      },{
        "symbol": "α",
        "latex": "\\psi",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "ρ",
        "latex": "\\rho",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "σ",
        "latex": "\\sigma",
        "type": "Greek and Hebrew letters"
      },{
        "symbol": "τ",
        "latex": "\\tau",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "θ",
        "latex": "\\theta",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "υ",
        "latex": "\\upsilon",
        "type": "Greek and Hebrew letters"
      },{
        "symbol": "ξ",
        "latex": "\\xi",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "ζ",
        "latex": "\\zeta",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "∆",
        "latex": "\\Delta",
        "type": "Greek and Hebrew letters"
      },{
        "symbol": "Γ",
        "latex": "\\Gamma",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "Λ",
        "latex": "\\Lambda",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "Ω",
        "latex": "\\Omega",
        "type": "Greek and Hebrew letters"
      },{
        "symbol": "Φ",
        "latex": "\\Phi",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "Π",
        "latex": "\\Pi",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "Ψ",
        "latex": "\\Psi",
        "type": "Greek and Hebrew letters"
      },{
        "symbol": "Σ",
        "latex": "\\Sigma",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "Θ",
        "latex": "\\Theta",
        "type": "Greek and Hebrew letters"
      },
      {
        "symbol": "Υ",
        "latex": "\\Upsilon",
        "type": "Greek and Hebrew letters"
      },{
        "symbol": "∗",
        "latex": "\\ast",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "×",
        "latex": "\\times",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "÷",
        "latex": "\\div",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "",
        "latex": "\\centerdot",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "≡",
        "latex": "\\equiv",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "∼=",
        "latex": "\\cong",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "6=",
        "latex": "\\neq",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "∼",
        "latex": "\\sim",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "'",
        "latex": "\\simeq",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "≈",
        "latex": "\\approx",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "∝",
        "latex": "\\propto",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "|=",
        "latex": "\\models",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "u",
        "latex": "\\approxeq",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "±",
        "latex": "\\pm",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "∓",
        "latex": "\\mp",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "≤",
        "latex": "\\leq",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "<<",
        "latex": "\\ll",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "⊂",
        "latex": "\\subset",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "⊆",
        "latex": "\\subseteq",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "∈",
        "latex": "\\in",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "⊥",
        "latex": "\\perp",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "|",
        "latex": "\\mid",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "k",
        "latex": "\\parallel",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "∈/",
        "latex": "\\notin",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "∩",
        "latex": "\\cap",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "∪",
        "latex": "\\cup",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "≥",
        "latex": "\\geq",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "∧",
        "latex": "\\wedge",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "∨",
        "latex": "\\vee",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "",
        "latex": "\\gg",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "⊃",
        "latex": "\\supset",
        "type": "Binary Operation/Relation Symbols"
      },{
        "symbol": "⊇",
        "latex": "\\supseteq",
        "type": "Binary Operation/Relation Symbols"
      }
    ];
    $scope.symbolType = _.uniqBy($scope.symbols, function(symbol) { return symbol.type; });
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
    $scope.valid = false;
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
            $scope.valid = true;
            latexSpan.textContent = mathField.latex();
          }
        }
      });
      $(mathFieldSpan).keydown(function(e) {
        if (e.keyCode == 86) { //keycode value for "v"
          $timeout(function() {
            if (!$scope.valid) { // checks if the pasted value is not valid
              ecEditor.dispatchEvent("org.ekstep.toaster:error", {
                title: 'Wrong La Tex. Please change the latex...',
                position: 'topCenter',
              });
            }
          }, 1);
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