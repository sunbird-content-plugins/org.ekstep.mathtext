angular.module('editorApp')
  .controller('org.ekstep.mathtext:config-controller', ['$scope', function($scope) {
    $scope.openTransliterator = function() {
      ecEditor.dispatchEvent("org.ekstep.mathtext:showpopup");
    };

    $scope.config = $scope.config;
    $scope.textTypeSelected;
    $scope.refreshTab = true;
    $scope.activeTextPluginControlItem = "";
 

    $scope.fontFamily = [ "NotoSans", "NotoSansKannada", "NotoSansGujarati", "NotoSansBengali", "NotoSansGurmukhi", "NotoSansOriya", "NotoSansDevanagari", "NotoSansTamil", "NotoSansTelugu", "NotoNastaliqUrdu", "NotoSansMalayalam"];
    $scope.fontSize = [18, 20, 22, 24, 26, 28, 32, 36, 40, 44, 48, 54, 60, 66, 72, 80, 88, 96];
    $scope.fontGroupConfig = {
      "propertyName": "font",
      "dataType": "group",
      "description": "Choose fontweight and fontstyle",
      "config": [{
        "propertyName": "fontweight",
        "title": "Font Weight",
        "toolTip": "Bold",
        "description": "Select font size for the text",
        "dataType": "icon",
        "iconClass": "bold icon",
        "required": true,
        "defaultValue": false
      }, {
        "propertyName": "fontstyle",
        "title": "Font Style",
        "toolTip": "Italic",
        "description": "Select font style for the text",
        "dataType": "icon",
        "iconClass": "italic icon",
        "required": true,
        "defaultValue": false
      }]
    };

    $scope.textAlignmentConfig = {
      "propertyName": "align",
      "title": "Align Text",
      "dataType": "buttonToggle",
      "description": "Select text alignment",
      "options": [{
        "value": "left",
        "title": "Text Align Left",
        "toolTip": "Left Align",
        "description": "Align text to left",
        "dataType": "icon",
        "iconClass": "align left icon"
      }, {
        "value": "center",
        "title": "Text Align Center",
        "toolTip": "Center Align",
        "description": "Align text to center",
        "dataType": "icon",
        "iconClass": "align center icon"
      }, {
        "value": "right",
        "title": "Text Align Right",
        "toolTip": "Right Align",
        "description": "Align text to right",
        "dataType": "icon",
        "iconClass": "align right icon"
      }],
      "defaultValue": "left"
    }

    $scope.showColorpicker = function(id, color) {
      var eventData = {
        id: id,
        callback: function(key, value) {
          org.ekstep.contenteditor.api.dispatchEvent('config:on:change', { key: key, value: value });
        },
        color: color
      };
      setTimeout(function() { org.ekstep.contenteditor.api.dispatchEvent("colorpicker:state", eventData) }, 500);
    };

    $scope.showColorpicker('textcolor', $scope.configData['color']);

    $scope.textOpacityConfig = {
      "propertyName": "opacity",
      "title": "Transparency",
      "description": "Set the transparency for element",
      "dataType": "rangeslider",
      "labelSuffix": "%",
      "required": true,
      "defaultValue": 100,
      "minimumValue": 0,
      "maximumValue": 100
    };


  
    // ecEditor.jQuery('.ui.accordion').accordion();


    $scope.collapseAllAccordionItems = function() {
      ecEditor.jQuery(".sidebar-accordion > .title").removeClass('active');
      ecEditor.jQuery('#textFormatting').addClass('active');
      $scope.activeTextPluginControlItem = 'textFormatting';
      // ecEditor.jQuery('.sidebar-accordion').accordion({ active: 0 });
    }

    setTimeout(function() {
      ecEditor.jQuery('.font-face-dropdown').dropdown();
      ecEditor.jQuery('.font-size-dropdown').dropdown();
    }, 0);

    $scope.onTextSelect = function(event, data) {
      data = ecEditor.getCurrentObject() || data;
        $scope.textTypeSelected = undefined;
        $scope.hasReadAlong = false;
        $scope.hasWordInfo = false;
        $scope.updateAdvancedTab();
      $scope.$safeApply();
    };


    $scope.updateAdvancedTab = function() {
      $scope.refreshTab = false;
      $scope.refreshTab = true;
      $scope.$safeApply();
    };   

    $scope.onTextSelect();

    //remove listeners on object:unselect. controller is executed everytime object is selected, 
    //so everytime listeners are registered with new scope.
    //if we dont clean up the listeners, it will pile up the eventbus and causes performance issue.

    // ecEditor.jQuery('.sidebar-accordion').accordion();

    setTimeout(function() {
      ecEditor.jQuery('.font-face-dropdown').dropdown();
      ecEditor.jQuery('.font-size-dropdown').dropdown();
    }, 0);


    $scope.toggleActiveAcordionTitle = function(clickEvent) {
      let targetId = $scope.activeTextPluginControlItem = clickEvent.target.id;
      ecEditor.jQuery(".sidebar-accordion>.title").removeClass('active');
      ecEditor.jQuery('#' + targetId + '').addClass('active');

    };


    $scope.changeConfig = function() {
      ecEditor.dispatchEvent('org.ekstep.mathtext:changeConfig', {
        "configData": $scope.configData,
      });
    }

    ecEditor.addEventListener("org.ekstep.mathtext:add", $scope.onTextSelect, $scope);
    ecEditor.addEventListener("org.ekstep.mathtext:modified", $scope.onTextSelect, $scope);
    ecEditor.addEventListener("org.ekstep.mathtext:unselected", $scope.unregisterListeners, $scope);
    ecEditor.addEventListener("config:show", $scope.onTextSelect, $scope);
  }]);

//# sourceURL=mathConfigController.js