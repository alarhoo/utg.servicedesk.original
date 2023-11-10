sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("utg.ams.sd.controller.Handover2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf com.sdcom.sd.view.ShiftHandover
		 */
		onInit: function() {
			var oComponent = this.getOwnerComponent();
			this._router = oComponent.getRouter();
		},
		onPressSwitchView1: function() {
			this._router.navTo("handoverDetails");
			sap.m.MessageToast.show("Shift Details Pressed!");
		},
		onPressSwitchView2: function() {
			this._router.navTo("shift-handover");
			sap.m.MessageToast.show("Shift Details Pressed!");
		},
		onBeforeRendering: function() {
			//var oModelData = this.getOwnerComponent().getModel("empModel");
			//var oModel = this.getView().byId("idTimeline").getModel();
			//console.log(oModel);
			//oModel.refresh();
// 			var iText = this.getView().byId("idTemplateItem");
// 			iText.setText("Completed:\u000adds \n asf");
		},
		handleExportExcel: function() {
		    window.open("./services/downloadExcel.xsjs");
// 			var aUrl = './services/downloadExcel.xsjs';
//             jQuery.ajax({
//                       url: aUrl,
//                       method: 'GET',
//                       success: function(result){
//                           console.log("Success!" + result);
//                       },
//                       error: function(result){
//                           console.log("Fail!" + result);
//                       }});
		}
	});
});