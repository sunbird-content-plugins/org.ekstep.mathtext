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
      }, {
        "symbol": "ϵ",
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
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
      }, {
        "symbol": "∗",
        "latex": "\\ast",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "×",
        "latex": "\\times",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "÷",
        "latex": "\\div",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "",
        "latex": "\\centerdot",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "≡",
        "latex": "\\equiv",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "∼=",
        "latex": "\\cong",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "6=",
        "latex": "\\neq",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "∼",
        "latex": "\\sim",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "'",
        "latex": "\\simeq",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "≈",
        "latex": "\\approx",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "∝",
        "latex": "\\propto",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "|=",
        "latex": "\\models",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "u",
        "latex": "\\approxeq",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "±",
        "latex": "\\pm",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "∓",
        "latex": "\\mp",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "≤",
        "latex": "\\leq",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "<<",
        "latex": "\\ll",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "⊂",
        "latex": "\\subset",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "⊆",
        "latex": "\\subseteq",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "∈",
        "latex": "\\in",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "⊥",
        "latex": "\\perp",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "|",
        "latex": "\\mid",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "k",
        "latex": "\\parallel",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "∈/",
        "latex": "\\notin",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "∩",
        "latex": "\\cap",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "∪",
        "latex": "\\cup",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "≥",
        "latex": "\\geq",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "∧",
        "latex": "\\wedge",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "∨",
        "latex": "\\vee",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "",
        "latex": "\\gg",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "⊃",
        "latex": "\\supset",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "⊇",
        "latex": "\\supseteq",
        "type": "Binary Operation/Relation Symbols"
      }, {
        "symbol": "←",
        "latex": "\\leftarrow",
        "type": "Arrow"
      }, {
        "symbol": "⇐",
        "latex": "\\Leftarrow",
        "type": "Arrow"
      }, {
        "symbol": "→",
        "latex": "\\rightarrow",
        "type": "Arrow"
      }, {
        "symbol": "⇒",
        "latex": "\\Rightarrow",
        "type": "Arrow"
      }, {
        "symbol": "↔",
        "latex": "\\leftrightarrow",
        "type": "Arrow"
      }, {
        "symbol": "⇔",
        "latex": "\\Leftrightarrow",
        "type": "Arrow"
      }, {
        "symbol": "-->",
        "latex": "\\dashrightarrow",
        "type": "Arrow"
      },
      {
        "symbol": "←",
        "latex": "\\leftrightarrows",
        "type": "Arrow"
      }, {
        "symbol": "",
        "latex": "\\rightleftharpoons",
        "type": "Arrow"
      }, {
        "symbol": "⇀",
        "latex": "\\rightharpoonup",
        "type": "Arrow"
      }, {
        "symbol": "⇁",
        "latex": "\\rightharpoondown",
        "type": "Arrow"
      }, {
        "symbol": "<--",
        "latex": "\\dashleftarrow",
        "type": "Arrow"
      }, {
        "symbol": "∞",
        "latex": "\\infty",
        "type": "Miscellaneous"
      }, {
        "symbol": "∇",
        "latex": "\\nabla",
        "type": "Miscellaneous"
      }, {
        "symbol": "∂",
        "latex": "\\partial",
        "type": "Miscellaneous"
      }, {
        "symbol": "∠",
        "latex": "\\angle",
        "type": "Miscellaneous"
      }, {
        "symbol": "4",
        "latex": "\\triangle",
        "type": "Miscellaneous"
      }
    ];

    $scope.equations = [{
        "symbol": "cos",
        "latex": "\\cos",
        "type": "Trigonometric functions"
      }, {
        "symbol": "csc",
        "latex": "\\csc",
        "type": "Trigonometric functions"
      }, {
        "symbol": "lg",
        "latex": "\\lg",
        "type": "Trigonometric functions"
      }, {
        "symbol": "ln",
        "latex": "\\ln",
        "type": "Trigonometric functions"
      }, {
        "symbol": "cot",
        "latex": "\\cot",
        "type": "Trigonometric functions"
      }, {
        "symbol": "lim",
        "latex": "\\lim",
        "type": "Trigonometric functions"
      }, {
        "symbol": "log",
        "latex": "\\log",
        "type": "Trigonometric functions"
      },
      {
        "symbol": "sec",
        "latex": "\\sec",
        "type": "Trigonometric functions"
      }, {
        "symbol": "tan",
        "latex": "\\tan",
        "type": "Trigonometric functions"
      }, {
        "symbol": "dim ",
        "latex": "\\dim",
        "type": "Trigonometric functions"
      }, {
        "symbol": "sin",
        "latex": "\\sin",
        "type": "Trigonometric functions"
      }, {
        "symbol": "",
        "latex": "\\left\\{\\right\\}^\\left\\{\\right\\}",
        "type": "Superscripts and subscripts"
      }, {
        "symbol": "",
        "latex": "\\left\\{\\right\\}_\\left\\{\\right\\}",
        "type": "Superscripts and subscripts"
      }, {
        "symbol": "",
        "latex": "\\frac{\\left\\{\\right\\}}{\\left\\{\\right\\}}\\left\\{\\right\\}",
        "type": "Superscripts and subscripts"
      }, {
        "symbol": "",
        "latex": "\\left\\{\\right\\}\\left\\frac{\\left\\{\\right\\}}{\\left\\{\\right\\}}\\right",
        "type": "Superscripts and subscripts"
      }, {
        "symbol": "",
        "latex": "\\",
        "type": "Fractions"
      }, {
        "symbol": "",
        "latex": "\\",
        "type": "Fractions"
      }, {
        "symbol": "",
        "latex": "\\",
        "type": "Fractions"
      },
      {
        "symbol": "",
        "latex": "\\",
        "type": "Fractions"
      }
    ];

    var MQ = MathQuill.getInterface(2); // eslint-disable-line no-undef
    $scope.valid = false;
    $scope.symbolType = _.uniqBy($scope.symbols, function(symbol) { return symbol.type; });
    $scope.equationType = _.uniqBy($scope.equations, function(equation) { return equation.type; });
    $scope.symbolsDivision = {};
    $scope.equationsDivision = {};
    $scope.latexDivision = {};

    _.each($scope.symbolType, function(value, key) {
      $scope.symbolsDivision[value.type] = [];
      $scope.latexDivision[value.type] = [];
      _.each($scope.symbols, function(val, key) {
        if (value.type == val.type) {
          $scope.symbolsDivision[value.type].push(val);
          $scope.latexDivision[val.type].push(val);
        }
      });
    });

    _.each($scope.equationType, function(value, key) {
      $scope.equationsDivision[value.type] = [];
      _.each($scope.equations, function(val, key) {
        if (value.type == val.type) {
          $scope.equationsDivision[value.type].push(val);
        }
      });
    });

    $scope.symbolsDropDown = $scope.symbolsDivision;
    $scope.equationsDropDown = $scope.equationsDivision;
    $scope.latexDropDown = $scope.latexDivision;

    $scope.$on('ngDialog.opened', function(e, $dialog) {
      var mathTextElement = document.getElementsByClassName('mathtextEditor_1');
      mathTextElement = mathTextElement[0];
      $scope.selectedText = false;
      var textObj = ecEditor.getCurrentObject();
      if (e.currentScope.ngDialogData && e.currentScope.ngDialogData.textSelected && textObj) {
        $scope.selectedText = true;
        $timeout(function() {
          $scope.latexToEquations(textObj.config.latex);
        }, 500);
      }
    });
    $timeout(function() {
      $('.menu .item').tab();
      $('.ui.dropdown.latex-dropdown').dropdown({
        onChange: function(val, text, $choice) {
          $scope.latexDropDown = $scope.latexDivision;
          if (val != "all") {
            $scope.latexDropDown = {};
            $scope.latexDropDown[text] = $scope.latexDivision[text];
          }
          $scope.$safeApply();
        }
      });
      $('.ui.dropdown.equations-dropdown').dropdown({
        onChange: function(val, text, $choice) {
          $scope.equationsDropDown = $scope.equationsDivision;
          if (val != "all") {
            $scope.equationsDropDown = {};
            $scope.equationsDropDown[text] = $scope.equationsDivision[text];
          }
          $scope.$safeApply();
        }
      });
      $('.ui.dropdown.symbols-dropdown').dropdown({
        onChange: function(val, text, $choice) {
          $scope.symbolsDropDown = $scope.symbolsDivision;
          if (val != "all") {
            $scope.symbolsDropDown = {};
            $scope.symbolsDropDown[text] = $scope.symbolsDivision[text];
          }
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
        "fontSize": 18,
        "backgroundcolor" : "#fff"
      });
      $scope.closeThisDialog();
    }
  }])

//# sourceURL=mathText.js