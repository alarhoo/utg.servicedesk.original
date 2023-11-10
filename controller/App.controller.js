sap.ui.define([
	"jquery.sap.global",
	"sap/ui/layout/form/SimpleForm",
	"sap/ui/core/mvc/Controller"
], function(jQuery, SimpleForm, Controller) {
	"use strict";

	return Controller.extend("utg.ams.sd.controller.App", {
	    oUser: null,
		onInit: function() {
		    //Get the logged in user information and set it core model
		    var aUrl = "./services/serverLogic.xsjs";
			var oUsrBtn = this.getView().byId("idUserBtn");
			var oModel = new sap.ui.model.json.JSONModel();
			jQuery.ajax({
				url: aUrl,
				method: "GET",
				async: false,
				dataType: 'json',
				success: function(responseText) {
					oUsrBtn.setText(responseText.UserName);
					var usr = oUsrBtn.getText();
					oModel.setData(usr);
				},
				error: function() {
					oUsrBtn.setText("fail");
				}
			});
			sap.ui.getCore().setModel(oModel, "usrmodel");
			var user = sap.ui.getCore().getModel("usrmodel").oData;
			
			//setup router variable
			var oComponent = this.getOwnerComponent();
			this._router = oComponent.getRouter();
			
			var that = this;
			var thisView = this.getView();
			var oCloseButton = new sap.m.Button({
				text: "Close",
				press: function() {
					that._oPopover.close();
				}
			});

			var oPopoverToolbar = new sap.m.Toolbar({
				content: [
					new sap.m.ToolbarSpacer(),
					new sap.ui.core.Icon({
						color: "#bb0000",
						src: "sap-icon://message-error"
					}),
					new sap.m.Text({
						text: "User Information"
					}),
					new sap.m.ToolbarSpacer()
				]
			});

			//var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			
			//console.log(user);

			this._oPopover = new sap.m.ResponsivePopover({
				showHeader: true,
				customHeader: oPopoverToolbar,
				contentWidth: "300px",
				contentHeight: "60px",
				verticalScrolling: false,
				modal: true,
				placement: "Bottom",
				content: [
				    new sap.ui.layout.form.SimpleForm({
						//layout: new sap.ui.layout.form.SimpleFormLayout(),
						editable: true,
						content: [
						    new sap.m.Text({
								text: "User Name"
							}),
					        new sap.m.Text({
								text: user
							})
						    ]
					})
				//     new sap.m.HBox({
				// 		justifyContent: "Center",
				// 		alignItems: "Center",
				// 		alignContent: "Center",
				// 		items: [
				//             new sap.m.Label({
				// 				text: "User Name : "
				// 			}),
				// 	        new sap.m.Text({
				// 				text: user
				// 			})
				//             ]
				// 	}),
				//     new sap.m.HBox({
				// 		justifyContent: "Center",
				// 		alignItems: "Center",
				// 		alignContent: "Stretch",
				// 		items: [
				//             new sap.m.Label({
				// 				text: "Email : "
				// 			}),
				// 	        new sap.m.Text({
				// 				text: "manjunath"
				// 			})
				//             ]
				// 	})
				],
				endButton: oCloseButton
			});
		},
		onCollapseExpandPresss: function() {
			var oSideNavigation = this.getView().byId("sideNavigation");
			var bExpanded = oSideNavigation.getExpanded();

			oSideNavigation.setExpanded(!bExpanded);
		},
		onCollapseExpandPress: function() {
			var viewId = this.getView().getId();
			var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			var sideExpanded = toolPage.getSideExpanded();
			this._setToggleButtonTooltip(sideExpanded);

			console.log(viewId, toolPage);
			toolPage.setSideExpanded(!toolPage.getSideExpanded());
		},

		_setToggleButtonTooltip: function(bLarge) {
			var toggleButton = this.getView().byId("sideNavigationToggleButton");
			if (bLarge) {
				toggleButton.setTooltip("Large Size Navigation");
			} else {
				toggleButton.setTooltip("Small Size Navigation");
			}
		},
		onExit: function() {
			if (this._oPopover) {
				this._oPopover.destroy();
			}
		},
		handleUserInfoBtnPress: function(oEvent) {
			// create popover
			// 			if (!this._oPopover) {
			// 				this._oPopover = sap.ui.xmlfragment("utg.ams.sd.view.UserInfo", this);
			// 				this.getView().addDependent(this._oPopover);
			// 			}
			// 			// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
			// 			var oButton = oEvent.getSource();
			// 			jQuery.sap.delayedCall(0, this, function() {
			// 				this._oPopover.openBy(oButton);
			// 			});
			this._oPopover.openBy(oEvent.getSource());
		},

		handleClosePress: function() {
			if (this._oPopover) {
				this._oPopover.close();
			}
		},
		handleProfilePress: function() {
			this._router.navTo("profile");
			sap.m.MessageToast.show("Profile Pressed!");
			if (sap.ui.Device.system.phone) {
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				toolPage.setSideExpanded(!toolPage.getSideExpanded());
			}
		},
		handleCalendarPress: function() {
			this._router.navTo("calendar");
			sap.m.MessageToast.show("Calendar Pressed!");
			if (sap.ui.Device.system.phone) {
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				toolPage.setSideExpanded(!toolPage.getSideExpanded());
			}
		},
		handlePlanCalendarPress: function() {
			this._router.navTo("plan-calendar");
			sap.m.MessageToast.show("Plan Calendar Pressed!");
			if (sap.ui.Device.system.phone) {
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				toolPage.setSideExpanded(!toolPage.getSideExpanded());
			}
		},
		handleTeamPress: function() {
			this._router.navTo("team");
			sap.m.MessageToast.show("Team Pressed!");
			if (sap.ui.Device.system.phone) {
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				toolPage.setSideExpanded(!toolPage.getSideExpanded());
			}
		},
		handleLeaveReqPress: function() {
			this._router.navTo("leave-request");
			sap.m.MessageToast.show("Leave Request Pressed!");
			if (sap.ui.Device.system.phone) {
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				toolPage.setSideExpanded(!toolPage.getSideExpanded());
			}
		},
		handleLeaveBalPress: function() {
			this._router.navTo("leave-balance");
			sap.m.MessageToast.show("Leave Balance Pressed!");
			if (sap.ui.Device.system.phone) {
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				toolPage.setSideExpanded(!toolPage.getSideExpanded());
			}
		},
		handleLeaveDetailPress: function() {
			this._router.navTo("leave-details");
			sap.m.MessageToast.show("Leave Details Pressed!");
			if (sap.ui.Device.system.phone) {
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				toolPage.setSideExpanded(!toolPage.getSideExpanded());
			}
		},
		handleHandoverPress: function() {
			this._router.navTo("shift-handover");
			sap.m.MessageToast.show("Handover Pressed!");
			if (sap.ui.Device.system.phone) {
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				toolPage.setSideExpanded(!toolPage.getSideExpanded());
			}
		},
		handleHandoverDetailsPress: function() {
			this._router.navTo("handoverDetails");
			sap.m.MessageToast.show("Handover Details Pressed!");
			if (sap.ui.Device.system.phone) {
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				toolPage.setSideExpanded(!toolPage.getSideExpanded());
			}
		},
		onPressHome: function() {
			this._router.navTo("launchpad");
			sap.m.MessageToast.show("Home Pressed!");
			if (sap.ui.Device.system.phone) {
				var viewId = this.getView().getId();
				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
				toolPage.setSideExpanded(!toolPage.getSideExpanded());
			}
		},
		onPressLogout: function() {
			var dialog = new sap.m.Dialog({
				title: "Confirm",
				type: "Message",
				state: "Warning",
				content: new sap.m.Text({
					text: "Are you sure to Logout?"
				}),
				beginButton: new sap.m.Button({
					text: "OK",
					press: function() {
						$.ajax({
							url: "/sap/hana/xs/formLogin/token.xsjs",
							type: "GET",
							beforeSend: function(e) {
								e.setRequestHeader("X-CSRF-Token", "Fetch");
							},
							success: function(e, s, o) {
								var n = o.getResponseHeader("X-CSRF-Token");
								$.ajax({
									url: "/sap/hana/xs/formLogin/logout.xscfunc",
									type: "POST",
									beforeSend: function(i) {
										i.setRequestHeader("X-CSRF-Token", n);
									},
									success: function() {
										sap.m.MessageToast.show("Successfully Logged Out");
										window.location.reload();
									}
								});
							}
						});
						dialog.close();
					}
				}),
				endButton: new sap.m.Button({
					text: "Cancel",
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});

			dialog.open();

		},
		onPressLogouta: function() {
			//	var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var CSRFToken = this.getCSRFTthis();
			jQuery.ajax({
				url: "/sap/hana/xs/formLogin/logout.xscfunc",
				type: "POST",
				beforeSend: function(xhr) {
					xhr.setRequestHeader("X-CSRF-Token", CSRFToken);
				},
				success: function() {
					document.location.reload(true);
				}
			});
			// 			this._router.navTo("launchpad");
			// 			sap.m.MessageToast.show("Logout Successful!");
			// 			if (sap.ui.Device.system.phone) {
			// 				var viewId = this.getView().getId();
			// 				var toolPage = sap.ui.getCore().byId(viewId + "--toolPage");
			// 				var sideExpanded = toolPage.getSideExpanded();
			// 				toolPage.setSideExpanded(!toolPage.getSideExpanded());
			// 			}
		}
	});
});