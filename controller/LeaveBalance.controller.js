sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";
	return Controller.extend("utg.ams.sd.controller.LeaveBalance", {
		onInit: function() {
			var oUser = sap.ui.getCore().getModel("usrmodel").oData;
			var oID;
			if (oUser === 'MKASHI') {
				oID = "EMP01";
			}
			var that = this.getView();
			var aUrl = "./data/Person.xsodata";

			var oModel = new sap.ui.model.odata.v2.ODataModel(aUrl, true);
			oModel.read("/LeaveBalance('" + oUser + "')", {
				success: mySuccessHandler,
				error: myErrorHandler
			});
			// 			oModel.read("/Employees", null, null, true, SuccefSuccess, fError);

			function mySuccessHandler(oLeaveData) {
				//                1.Get the id of the VizFrame
				var oVizFrame = that.byId("idVizFrame");
				var iJSONData = {
					"Leave": [{
							"leaveType": "Leave Balance",
							"leaveCount": oLeaveData.LEAVE_BAL
					},
						{
							"leaveType": "Sick Leave",
							"leaveCount": oLeaveData.SICK_LEAVE
					},
						{
							"leaveType": "Paid Leave",
							"leaveCount": oLeaveData.PAID_LEAVE
					},
						{
							"leaveType": "Vacation",
							"leaveCount": oLeaveData.VACATION
					},
						{
							"leaveType": "Comp Off",
							"leaveCount": oLeaveData.COMP_OFF
					}]
				};
				console.log(iJSONData);
				//                2.Create a JSON Model and set the data
				var oLeaveModel = new sap.ui.model.json.JSONModel(iJSONData);
				that.setModel(oLeaveModel, "leave");

				//                3. Create Viz dataset to feed to the data to the graph
				var oDataset = new sap.viz.ui5.data.FlattenedDataset({
					dimensions: [{
						name: "Leave Type",
						value: "{leaveType}"
				}],

					measures: [{
						name: "Leave Count",
						value: "{leaveCount}"
				}],

					data: {
						path: "/Leave"
					}
				});
				oVizFrame.setDataset(oDataset);
				oVizFrame.setModel(oLeaveModel);
				oVizFrame.setVizType("pie");

				//                4.Set Viz properties
				oVizFrame.setVizProperties({
					plotArea: {
						colorPalette: d3.scale.category20().range(),
						dataLabel: {
							visible: true
						}
					},
					tooltip: {
						visible: true
					},
					title: {
						text: "Leave Balance Pie Chart"
					}
				});

				var feedValueAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
						"uid": "size",
						"type": "Measure",
						"values": ["Leave Count"]
					}),
					feedCategoryAxis = new sap.viz.ui5.controls.common.feeds.FeedItem({
						"uid": "color",
						"type": "Dimension",
						"values": ["Leave Type"]
					});
				oVizFrame.addFeed(feedValueAxis);
				oVizFrame.addFeed(feedCategoryAxis);
			}

			function myErrorHandler() {
				// console.log("An error occured while reading Employees!");
			}
		},
		onPressViewAllLeave: function() {
			var oComponent = this.getOwnerComponent();
			this._router = oComponent.getRouter();
			this._router.navTo("leave-details");
			sap.m.MessageToast.show("Leave Details Pressed!");
		}
	});
});