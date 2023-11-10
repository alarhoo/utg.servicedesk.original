sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("utg.ams.sd.controller.Handover", {

		onInit: function() {
			var oComponent = this.getOwnerComponent();
			this._router = oComponent.getRouter();
		},
		handleIconTabBarSelect: function(oEvent) {
			var sKey = oEvent.getParameter("key");

			if (sKey === "send") {
				var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
				var today = new Date();
				var day = days[today.getDay()];
				var dd = today.getDate();
				var mm = today.getMonth() + 1;
				var yyyy = today.getFullYear();
				if (dd < 10) {
					dd = '0' + dd;
				}
				if (mm < 10) {
					mm = '0' + mm;
				}
				today = dd + "/" + mm + "/" + yyyy + " " + day;
				this.getView().byId("dateLabel").setText("Your Shift Log for the day -- " + today);
				//var dd = today.getDate();
				var iText = this.getView().byId("allHandoverText");
				var iCompletedText = this.getView().byId("completedText").getValue();
				var iPendingText = this.getView().byId("pendingText").getValue();
				var iFollowupText = this.getView().byId("followupText").getValue();
				iText.setText(iCompletedText + "\n" + iPendingText + "\n" + iFollowupText);
				console.log(iText, iCompletedText);
			}
		},
		onPressHandoverSendBtn: function() {
			//get current user details and send handover details using oData CREATE function
			var oEntry = {};
			oEntry.USER_NAME = sap.ui.getCore().getModel("usrmodel").oData;
			oEntry.DATE = new Date();
			oEntry.COMPLETED = this.getView().byId("completedText").getValue();
			oEntry.PENDING = this.getView().byId("pendingText").getValue();
			oEntry.FOLLOWUP = this.getView().byId("followupText").getValue();

			// 			iText.setText(iCompletedText + "\n" + iPendingText + "\n" + iFollowupText);

			var aUrl = "./data/Person.xsodata";

			var oModel = new sap.ui.model.odata.ODataModel(aUrl);
			console.log(oEntry);
			// 			var oEntry = this.getView().getModel("user").getData();

			// 			oModel.setHeaders({
			// 				"content-type": "application/json;charset=utf-8"
			// 			});
            var thisView = this.getView();
			oModel.create("/ShiftHandover", oEntry, null, function() {
				sap.m.MessageToast.show("Record Created Successfully!");
				thisView.byId("completedText").setValue("");
				thisView.byId("pendingText").setValue("");
				thisView.byId("followupText").setValue("");
				//this.resetUserModel();
			}, function() {
				sap.m.MessageToast.show("Please check the records!");
			});
			//sap.m.MessageToast.show("Sent Successfully!");
		},
		onPressSwitchView1: function() {
			this._router.navTo("handoverDetails");
			sap.m.MessageToast.show("Shift Details Pressed!");
		},
		onPressSwitchView2: function() {
			this._router.navTo("shift-handover");
			sap.m.MessageToast.show("Shift Details Pressed!");
		}
	});

});