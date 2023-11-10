sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"utg/ams/sd/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("utg.ams.sd.Component", {

 		metadata: {
 			manifest: "json"
        //    rootView: "utg.ams.sd.view.Launchpad"
 		},

		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		
 			this.getRouter().initialize();
		}
	});
});