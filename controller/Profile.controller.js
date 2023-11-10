sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("utg.ams.sd.controller.Profile", {

		onPressBackBtn: function() {
			this.getOwnerComponent().navBack();
		},
		onInit: function() {
			var oUser = sap.ui.getCore().getModel("usrmodel").oData;
			var oImage = this.getView().byId("idPageObj");
			oImage.setObjectImageURI("./services/retrieveImage.xsjs?user=" + oUser);
			// var oImage = this.getView().getContent()[1].getHeaderTitle().mAggregations._objectImage;
			// console.log(oImage);
			// Image control to render retrieved image

			//var objectHead = this.getView().byId("idPageObj");
			//objectHead.setObjectImageURI("./services/retrieveImage.xsjs?user=" + oUser);

			// 			var oDBImage = new sap.ui.commons.Image(“img_db”).addStyleClass(‘dBImage’);

			// 			var oGetImageButton = new sap.ui.commons.Button({
			// 				text: “Retrieve Image”,
			// 				press: function() {
			// 					/** Get Saved Image for entered User Id */
			// 					$.ajax({
			// 						url: "./services/retrieveImage.xsjs?user=" + oUser,
			// 						type: "GET",
			// 						async: false,
			// 						success: function(data, textStatus, XMLHttpRequest) {
			// 							document.getElementById(“img_db”).src = img;
			// 						},
			// 						error: function(XMLHttpRequest, textStatus, errorThrown) {
			// 							console.error(“Error in retrieving image”);
			// 						}
			// 					});
			// 				}
			// 			});

			var that = this.getView();
			var aUrl = "./data/Person.xsodata";

			var oModel = new sap.ui.model.odata.ODataModel(aUrl, true);
			oModel.read("/Employees('" + oUser + "')", {
				success: mySuccessHandler,
				error: myErrorHandler
			});
			// 			oModel.read("/Employees", null, null, true, SuccefSuccess, fError);

			function mySuccessHandler(oData) {
				var oEmployee = new JSONModel(oData);
				that.setModel(oEmployee, "emp");
				that.byId("idPageObj").setObjectTitle(oData.FNAME + " " + oData.LNAME);
				that.byId("idPageObj").setObjectSubtitle(oData.ROLE);
				that.byId("iPhone").setText(oData.PHONE1);
				that.byId("iMail").setText(oData.EMAIL);
				that.byId("iPhone2").setText(oData.PHONE1);
				that.byId("iOffice").setText(oData.PHONE2);
				that.byId("iEdu").setText(oData.EDUCATION);
				//	console.log(oData, oEmployee.oData, oData.FNAME);
			}

			function myErrorHandler() {
				// console.log("An error occured while reading Employees!");
			}

			// 			var manifestModel = this.getOwnerComponent().getManifestEntry("sap.ui5").models.empModel;

			// 			sap.m.MessageToast.show(aUrl);
			// 			this.getView().byId("idPageObj").setObjectSubtitle(aUrl);
			// 			var oDataRespose = new sap.ui.model.odata.v2.ODataModel(aUrl, true);
			// 	var oModel = new JSONModel(aUrl);
			//  oModel = oModel.oData.d;
			// 			var oUserData = oDataRespose.getData("/Employees('MKASHI')");
			//	this.getView().setModel(oModel, "emp");
			// 	var oUData = this.getView().getModel("emp").oData;
			// 			console.log(manifestModel, oDataRespose, oUserData);
		},
		handleEmailPress: function() {
// 			var cmail = sap.ui.getCore().getModel().oData.coreMail;
			sap.m.URLHelper.triggerEmail("manjunatha.kashirudraiah@utegration.com", "Test Subject", "test body");

			var aUrl = "./services/sendMail.xsjs";
			jQuery.ajax({
				url: aUrl,
				success: function(res) {
					sap.m.MessageToast.show(res);
				},
				error: function() {
					sap.m.MessageToast.show("fail");
				}
			});
		},
		_getVal: function(evt) {
			return sap.ui.getCore().byId(evt.getParameter('id')).getValue();
		},

		handleTelPress: function(evt) {
		    var eVal = this.getView().byId("iPhone").getText();
			sap.m.URLHelper.triggerTel(eVal);
		},
		handleUploadPress: function() {
			var oUser = sap.ui.getCore().getModel("usrmodel").oData;
			//	var oUser = sap.ui.getCore().getModel("usrmodel").oData; + "&user=" + oUser
			var oFileUploader = this.getView().byId("fileUploader");
			// Combine the URL with the filename....
			// 			jQuery.ajax({
			// 				url: aUrl,
			// 				success: function(res) {
			// 					sap.m.MessageToast.show(res);
			// 				},
			// 				error: function() {
			// 					sap.m.MessageToast.show("fail");
			// 				}
			// 			});
			oFileUploader.setUploadUrl("./services/uploadImage.xsjs?filename=" + oFileUploader.getValue() + "&user=" + oUser);
			oFileUploader.upload();
		}
	});
});