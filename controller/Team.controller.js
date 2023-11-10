sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("utg.ams.sd.controller.Team", {
	    
	    onInit: function() {
	   //     var oUser = sap.ui.getCore().getModel("usrmodel").oData;
		  //  var oImage = this.getView().byId("idList");
		  //  oImage.setIcon("./services/retrieveImage.xsjs?user=" + oUser);
	    },

		onListItemPress: function (evt) {
			sap.m.MessageToast.show("Pressed : " + evt.getSource().getTitle());
		}

	});

});