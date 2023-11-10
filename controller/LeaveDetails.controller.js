sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("utg.ams.sd.controller.LeaveDetails", {
		onInit: function() {
			var aUrl = "./data/Person.xsodata";

			var oModel = new sap.ui.model.odata.v2.ODataModel(aUrl, true);
			this.getView().setModel(oModel);
// 			oModel.read("/LeaveDetails", {
// 				success: mySuccessHandler,
// 				error: myErrorHandler
// 			});

// 			function mySuccessHandler(oLeaveData) {

// 			}
			
// 			function myErrorHandler() {
// 				// console.log("An error occured while reading Employees!");
// 			}
		},
		onPressViewLeave: function() {
			var oComponent = this.getOwnerComponent();
			this._router = oComponent.getRouter();
			this._router.navTo("leave-balance");
			sap.m.MessageToast.show("Leave Balance Pressed!");
		}
	});

});