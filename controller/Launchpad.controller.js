sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("utg.ams.sd.controller.Launchpad", {
		onInit: function() {
			var aUrl = "./data/Person.xsodata";

			var oModel = new sap.ui.model.odata.v2.ODataModel(aUrl, true);
			this.getView().setModel(oModel);
			
			var iTile = this.getView().byId("_idTile");
			iTile.setNumber(200);
		  //  sap.ui.getCore().byId("master--list");
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			//var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
		//	pageId.setSideExpanded(false);
			
// 			var viewId = this.getView().getId();
// 			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
// 			var sideExpanded = toolPage.getSideExpanded();
// 			this._setToggleButtonTooltip(sideExpanded);
// 			toolPage.setSideExpanded(false);
			console.log(iTile, viewId, toolPage);
		},
		onPressTile: function() {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("profile");
			sap.m.MessageToast.show("Profile Pressed!");
		}
	});
});