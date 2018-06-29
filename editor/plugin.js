/**
 *
 * Plugin to create question.
 * @class question
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Swati Singh<swati.singh@tarento.com>
 */
org.ekstep.mathtext = {};

org.ekstep.mathtext.EditorPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.mathtext",
  mathTextId: 'mathtext-wrapper',
  /**
   * Register events.
   * @memberof org.ekstep.question
   */
  initialize: function () {
    var instance = this;
    ecEditor.addEventListener("org.ekstep.mathtext:showpopup", this.loadHtml, this);
    var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/mathtext.html');
    var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/mathtext.js');
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
    ecEditor.addEventListener(instance.manifest.id + ":adddiv", this.addDivElement, this);
    ecEditor.addEventListener('stage:unselect', this.removeHtmlElements, this);
    ecEditor.addEventListener('stage:create', this.removeHtmlElements, this);
    window.MQ = MathQuill.getInterface(2);
     var divWrapper = document.createElement('div');
        divWrapper.setAttribute("id", this.mathTextId);
        ecEditor.jQuery(".canvas-container").append(divWrapper);
  },
  /**
   *  Open window to add question and options
   *  @memberof org.ekstep.question
   *  @param {int} event Event Type
   *  @param {Object} data Data passed during event dispatch
   */
  loadHtml: function (event, data) {
      var currentInstance = this;
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).open({
      template: 'mathTextBrowser',
      controller: 'mathTextController',
      controllerAs: '$ctrl',
      resolve: {
        'instance': function () {
          return currentInstance;
        }
      },
      width: 900,
      showClose: false,
      className: 'qc-ngdialog-custome'
    });
  },
   newInstance: function() {
        var instance = this;
        this.configManifest = _.remove(this.configManifest, function(property) {
           return property.propertyName != "stroke";
        });                
        var props = this.convertToFabric(this.attributes);
        if (ecEditor._.isUndefined(this.config.text))
               this.config.latex = ecEditor._.isUndefined(this.attributes.latex) ? "" : this.attributes.latex;
        delete props.latex;
        this.editorObj = new fabric.Rect(props);
        this.editorObj.visible = true;
        if (this.editorObj) this.editorObj.setFill(props.fill);
        instance.addDivElement({},instance);
    },

         /**
     * Resize the mathtext element 
     * @memberof mathtext
     */
    resizeObject: function(e) {
        if (ecEditor.getCurrentObject() && ecEditor.getCurrentObject().manifest.id == 'org.ekstep.mathtext') {
               var canvasCord = ecEditor.jQuery('#canvas').offset();
               ecEditor.jQuery("#" + e.target.id).offset({
                     'top':e.target.top + canvasCord.top, 
                     'left':e.target.left + canvasCord.left
               });
               ecEditor.jQuery("#" + e.target.id).width(e.target.getWidth());
               ecEditor.jQuery("#" + e.target.id).height(e.target.getHeight());
        }
    },

    /**
     * Move the mathtext element across canvas
     * @memberof mathtext
     */
    moving: function(instance) {
        var canvasCord = ecEditor.jQuery('#canvas').offset();
        ecEditor.jQuery("#" + this.editorObj.id).offset({
               'top':this.editorObj.top + canvasCord.top, 
               'left':this.editorObj.left + canvasCord.left
        });
    },

    /**
     * Add listener for double click event on selection of mathtext
     * @memberof mathtext
     */
    selected: function(instance) {
        fabric.util.addListener(fabric.document, 'dblclick', this.dblClickHandler);
    },

    /**
     * Remove listener of double click event on selection of mathtext
     * @memberof mathtext
     */
    deselected: function(instance, options, event) {
        fabric.util.removeListener(fabric.document, 'dblclick', this.dblClickHandler);
    },

    removed: function(instance, options, event) {
        ecEditor.jQuery("div#" + instance.id).remove();
    },

    /**
     * Remove existing richtext element available in canvas
     * @memberof RichText
     */
    removeHtmlElements: function() {
        var richtextDiv = org.ekstep.contenteditor.api.jQuery('#' + this.mathTextId);
        richtextDiv.empty();
    },

 
    addDivElement: function(event, instance) {
      if(!(_.isUndefined(instance.data))){
        instance = instance.data;
      }
        var canvasCord = ecEditor.jQuery('#canvas').offset();
        var div = document.createElement('div');
        div.setAttribute("id", instance.id);
        div.style.position = 'absolute';
        div.style.fontSize = '14px';
        div.style.fontFamily = 'NotoSans';
        div.style.width = instance.editorObj.width ? instance.editorObj.width + 1 + 'px' : "auto";
        div.style.height = instance.editorObj.height ? instance.editorObj.height + 1 + 'px' : "auto";
        div.style.pointerEvents = "none";
        ecEditor.jQuery(".canvas-container #" + this.mathTextId).append(div);
        ecEditor.jQuery("#" + instance.id).offset({'top':instance.editorObj.top + canvasCord.top, 'left':Number(parseInt(ecEditor.jQuery(".canvas-container").css('margin-left'))) + (instance.editorObj.left + canvasCord.left)});
        this.latexToEquation(instance.config.latex, div.id);
        var elemWidth = ecEditor.jQuery('#' + instance.id).width();
        var elemHeight = ecEditor.jQuery('#' + instance.id).height();
        ecEditor.jQuery("#" + instance.id).width(elemWidth);
        ecEditor.jQuery("#" + instance.id).height(elemHeight);
        instance.editorObj.width = elemWidth;
        instance.editorObj.height = elemHeight;
    },
    latexToEquation: function(mathText, id) {
      var mathDiv = document.getElementById(id);
      katex.render(mathText, mathDiv, { displayMode: true }); // eslint-disable-line no-undef
    },
    /**
     * his method overridden from org.ekstep.contenteditor.basePlugin and renders the richtext plugin to canvas.
     * @memberof RichText
     * @param {Object} canvas this is canvas element
     */
    render: function(canvas) {
        canvas.add(this.editorObj);
        ecEditor.dispatchEvent(this.manifest.id + ":adddiv", { data: this });
    }
});
//# sourceURL=mathtextplugin.js