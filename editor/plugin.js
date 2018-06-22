/**
 *
 * Plugin to create question.
 * @class question
 * @extends org.ekstep.contenteditor.basePlugin
 * @author Swati Singh<swati.singh@tarento.com>
 */
org.ekstep.question = {};
org.ekstep.question.EditorPlugin = org.ekstep.contenteditor.basePlugin.extend({
  type: "org.ekstep.mathtext",
  /**
   * Register events.
   * @memberof org.ekstep.question
   */
  initialize: function () {
    var instance = this;
    ecEditor.addEventListener("org.ekstep.mathtext:showpopup", this.loadHtml, this);
    var templatePath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/mathText.html');
    var controllerPath = ecEditor.resolvePluginResource(instance.manifest.id, instance.manifest.ver, 'editor/mathText.js');
    ecEditor.getService(ServiceConstants.POPUP_SERVICE).loadNgModules(templatePath, controllerPath);
    window.MQ = MathQuill.getInterface(2);
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
      controller: 'MathTextController',
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
  }
});