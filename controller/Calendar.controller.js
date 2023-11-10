sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("utg.ams.sd.controller.Calendar", {

		onInit: function() {
		    //setup router variable
			var oComponent = this.getOwnerComponent();
			this._router = oComponent.getRouter();
			var oModel = new JSONModel();
			oModel.setData({
				startDate: new Date("2017", "9", "2"),
				people: [{
					pic: "sap-icon://employee",
					name: "Manjunatha K",
					role: "team member",
					appointments: [{
						start: new Date("2017", "9", "2", "14", "30"),
						end: new Date("2017", "9", "2", "23", "30"),
						title: "A Shift",
						type: "Type01",
						tentative: false
					}],
					headers: [{
						start: new Date("2017", "9", "2", "14", "30"),
						end: new Date("2017", "9", "2", "23", "30"),
						title: "Reminder",
						type: "Type06"
					}]
				}, {
					pic: "sap-icon://employee",
					name: "Nagesh B",
					role: "team member",
					appointments: [{
						start: new Date("2017", "9", "2", "22", "30"),
						end: new Date("2017", "9", "3", "7", "30"),
						title: "Shift B",
						info: "Night Shift",
						type: "Type02",
						tentative: false
					}],
					headers: [{
						start: new Date("2017", "9", "2", "22", "30"),
						end: new Date("2017", "9", "3", "7", "30"),
						title: "Payment reminder",
						type: "Type06"
					}]
				}, {
					pic: "sap-icon://employee",
					name: "Rajath G",
					role: "team member",
					appointments: [{
						start: new Date("2017", "9", "3", "6", "30"),
						end: new Date("2017", "9", "3", "15", "30"),
						title: "C Shift",
						type: "Type03",
						tentative: false
					}],
					headers: [{
						start: new Date("2017", "9", "3", "6", "30"),
						end: new Date("2017", "9", "3", "15", "30"),
						title: "Private",
						type: "Type05"
					}]
				}]
			});
			this.getView().setModel(oModel);
		},
		onPressSwitchView: function() {
			this._router.navTo("plan-calendar");
			sap.m.MessageToast.show("Plan Calendar Pressed!");
		}

	});

});