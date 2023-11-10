sap.ui.define(['jquery.sap.global',
		'sap/m/MessageBox',
		'sap/m/Button',
		'sap/m/Dialog',
		'sap/m/List',
		'sap/m/StandardListItem',
		'sap/ui/core/Fragment',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel'
	],
	function(MessageBox, jQuery, Button, Dialog, List, StandardListItem, Fragment, Controller, JSONModel) {
		"use strict";

		var PageController = Controller.extend("utg.ams.sd.controller.PlanCalendar", {

			onInit: function() {
				//setup router variable
				var oComponent = this.getOwnerComponent();
				this._router = oComponent.getRouter();
				var oModel = new JSONModel();
				oModel.setData({
					startDate: new Date(),
					people: [{
						pic: "sap-icon://employee",
						name: "Manjunath",
						role: "team member",
						appointments: [{
							start: new Date("2017", "10", "07", "14", "30"),
							end: new Date("2017", "10", "07", "23", "30"),
							title: "A",
							type: "Type02",
							pic: "sap-icon://employee",
							tentative: true,
							color: "green"
						}]
					}, {
						pic: "sap-icon://employee",
						name: "Nagesh",
						role: "team member",
						appointments: [{
							start: new Date("2017", "10", "07", "22", "30"),
							end: new Date("2017", "10", "08", "7", "30"),
							title: "B",
							type: "Type02",
							tentative: false,
							color: "red"
						}]
					}, {
						pic: "sap-icon://employee",
						name: "Rajath",
						role: "team member",
						appointments: [{
							start: new Date("2017", "10", "08", "6", "30"),
							end: new Date("2017", "10", "08", "15", "30"),
							title: "C",
							type: "Type02",
							tentative: true,
							color: "blue"
						}]
					}]
				});
				this.getView().setModel(oModel);
				console.log(oModel);
			},

			handleAppointmentSelect: function(oEvent) {
				var oFrag = sap.ui.core.Fragment,
					oAppointment = oEvent.getParameter("appointment"),
					oAppBC,
					oDateTimePickerStart,
					oDateTimePickerEnd,
					oInfoInput,
					oOKButton,
					aAppointments,
					sValue;

				if (oAppointment) {
					if (!this._oPopover) {
						this._oPopover = sap.ui.xmlfragment("myPopoverFrag", "utg.ams.sd.view.Details", this);
						this.getView().addDependent(this._oPopover);
					}

					// the binding context is needed, because later when the OK button is clicked, the information must be updated
					oAppBC = oAppointment.getBindingContext();

					this._oPopover.setBindingContext(oAppBC);

					oDateTimePickerStart = oFrag.byId("myPopoverFrag", "startDate");
					oDateTimePickerEnd = oFrag.byId("myPopoverFrag", "endDate");
					oInfoInput = oFrag.byId("myPopoverFrag", "moreInfo");
					oOKButton = oFrag.byId("myPopoverFrag", "OKButton");

					oDateTimePickerStart.setDateValue(oAppointment.getStartDate());
					oDateTimePickerEnd.setDateValue(oAppointment.getEndDate());
					oInfoInput.setValue(oAppointment.getText());

					oDateTimePickerStart.setValueState("None");
					oDateTimePickerEnd.setValueState("None");

					this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, oOKButton);
					this._oPopover.openBy(oAppointment);
				} else {
					aAppointments = oEvent.getParameter("appointments");
					sValue = aAppointments.length + " Appointments selected";
					sap.m.MessageBox.information(
						sValue
					);
				}
			},

			handleOkButton: function(oEvent) {
				var oFrag = sap.ui.core.Fragment,
					oStartValue = oFrag.byId("myPopoverFrag", "startDate").getDateValue(),
					oEndValue = oFrag.byId("myPopoverFrag", "endDate").getDateValue(),
					sInfoValue = oFrag.byId("myPopoverFrag", "moreInfo").getValue(),
					sAppointmentPath = this._oPopover.getBindingContext().sPath;

				this._oPopover.getModel().setProperty(sAppointmentPath + "/start", oStartValue);
				this._oPopover.getModel().setProperty(sAppointmentPath + "/end", oEndValue);
				this._oPopover.getModel().setProperty(sAppointmentPath + "/info", sInfoValue);
				this._oPopover.close();
			},

			handleCancelButton: function(oEvent) {
				this._oPopover.close();
			},

			handleAppointmentCreate: function(oEvent) {
				var oFrag = sap.ui.core.Fragment,
					oDateTimePickerStart,
					oDateTimePickerEnd,
					oBeginButton;

				this._createDialog();

				oFrag.byId("myFrag", "selectPerson").setSelectedItem(oFrag.byId("myFrag", "selectPerson").getItems()[0]);

				oDateTimePickerStart = oFrag.byId("myFrag", "startDate");
				oDateTimePickerEnd = oFrag.byId("myFrag", "endDate");
				oBeginButton = this.oNewAppointmentDialog.getBeginButton();

				oDateTimePickerStart.setValue("");
				oDateTimePickerEnd.setValue("");
				oDateTimePickerStart.setValueState("None");
				oDateTimePickerEnd.setValueState("None");

				this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, oBeginButton);
				this.oNewAppointmentDialog.open();
			},

			handleAppointmentAddWithContext: function(oEvent) {
				var oFrag = sap.ui.core.Fragment,
					currentRow,
					sPersonName,
					oSelect,
					oSelectedItem,
					oSelectedIntervalStart,
					oStartDate,
					oSelectedIntervalEnd,
					oEndDate,
					oDateTimePickerStart,
					oDateTimePickerEnd,
					oBeginButton;

				this._createDialog();

				currentRow = oEvent.getParameter("row");
				sPersonName = currentRow.getTitle();
				oSelect = this.oNewAppointmentDialog.getContent()[0].getContent()[1];
				oSelectedItem = oSelect.getItems().filter(function(oItem) {
					return oItem.getText() === sPersonName;
				})[0];
				oSelect.setSelectedItem(oSelectedItem);

				oSelectedIntervalStart = oEvent.getParameter("startDate");
				oStartDate = oFrag.byId("myFrag", "startDate");
				oStartDate.setDateValue(oSelectedIntervalStart);

				oSelectedIntervalEnd = oEvent.getParameter("endDate");
				oEndDate = oFrag.byId("myFrag", "endDate");
				oEndDate.setDateValue(oSelectedIntervalEnd);

				oDateTimePickerStart = oFrag.byId("myFrag", "startDate");
				oDateTimePickerEnd = oFrag.byId("myFrag", "endDate");
				oBeginButton = this.oNewAppointmentDialog.getBeginButton();

				oDateTimePickerStart.setValueState("None");
				oDateTimePickerEnd.setValueState("None");

				this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, oBeginButton);
				this.oNewAppointmentDialog.open();
			},

			_validateDateTimePicker: function(sValue, oDateTimePicker) {
				if (sValue === "") {
					oDateTimePicker.setValueState("Error");
				} else {
					oDateTimePicker.setValueState("None");
				}
			},

			updateButtonEnabledState: function(oDateTimePickerStart, oDateTimePickerEnd, oButton) {
				var bEnabled = oDateTimePickerStart.getValueState() !== "Error" && oDateTimePickerStart.getValue() !== "" && oDateTimePickerEnd.getValue() !==
					"" && oDateTimePickerEnd.getValueState() !== "Error";

				oButton.setEnabled(bEnabled);
			},

			handleDetailsChange: function(oEvent) {
				var oFrag = sap.ui.core.Fragment,
					oDTPStart = oFrag.byId("myPopoverFrag", "startDate"),
					oDTPEnd = oFrag.byId("myPopoverFrag", "endDate"),
					oOKButton = oFrag.byId("myPopoverFrag", "OKButton");

				this._validateDateTimePicker(oEvent.getParameter("value"), oEvent.oSource);
				this.updateButtonEnabledState(oDTPStart, oDTPEnd, oOKButton);
			},

			handleCreateChange: function(oEvent) {
				var oFrag = sap.ui.core.Fragment,
					oDateTimePickerStart = oFrag.byId("myFrag", "startDate"),
					oDateTimePickerEnd = oFrag.byId("myFrag", "endDate"),
					oBeginButton = this.oNewAppointmentDialog.getBeginButton();

				this._validateDateTimePicker(oEvent.getParameter("value"), oEvent.oSource);
				this.updateButtonEnabledState(oDateTimePickerStart, oDateTimePickerEnd, oBeginButton);
			},

			_createDialog: function() {
				var oFrag = sap.ui.core.Fragment,
					that = this,
					oStartDate,
					oEndDate,
					sTitle,
					sInfoResponse,
					oNewAppointment,
					oModel,
					sPath,
					oPersonAppointments;

				if (!that.oNewAppointmentDialog) {

					that.oNewAppointmentDialog = new Dialog({
						title: 'Add a new appointment',
						content: [
							sap.ui.xmlfragment("myFrag", "utg.ams.sd.view.Create", this)
						],
						beginButton: new Button({
							text: 'Create',
							enabled: false,
							press: function() {
								oStartDate = oFrag.byId("myFrag", "startDate").getDateValue();
								oEndDate = oFrag.byId("myFrag", "endDate").getDateValue();
								sTitle = oFrag.byId("myFrag", "inputTitle").getValue();
								sInfoResponse = oFrag.byId("myFrag", "moreInfo").getValue();

								if (oFrag.byId("myFrag", "startDate").getValueState() !== "Error" && oFrag.byId("myFrag", "endDate").getValueState() !==
									"Error") {

									oNewAppointment = {
										start: oStartDate,
										end: oEndDate,
										title: sTitle,
										info: sInfoResponse
									};
									oModel = that.getView().getModel();
									sPath = "/people/" + oFrag.byId("myFrag", "selectPerson").getSelectedIndex() + "/appointments";
									oPersonAppointments = oModel.getProperty(sPath);

									oPersonAppointments.push(oNewAppointment);

									oModel.setProperty(sPath, oPersonAppointments);
									that.oNewAppointmentDialog.close();
								}
							}
						}),
						endButton: new Button({
							text: 'Close',
							press: function() {
								that.oNewAppointmentDialog.close();
							}
						})
					});

					that.oNewAppointmentDialog.addStyleClass("sapUiContentPadding");
					this.getView().addDependent(that.oNewAppointmentDialog);

				}
			},
			onPressSwitchView: function() {
				this._router.navTo("calendar");
				sap.m.MessageToast.show("Calendar Pressed!");
			}
		});

		return PageController;

	});