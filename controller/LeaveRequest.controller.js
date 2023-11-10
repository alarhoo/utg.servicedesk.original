sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/unified/DateRange"
], function(Controller, DateRange) {
	"use strict";

	return Controller.extend("utg.ams.sd.controller.LeaveRequest", {
		oFormatYyyymmdd: null,

		onInit: function() {
			this.oFormatYyyymmdd = sap.ui.core.format.DateFormat.getInstance({
				pattern: "yyyy-MM-dd",
				calendarType: sap.ui.core.CalendarType.Gregorian
			});
			if (sap.ui.Device.system.phone) {
				var cal = this.getView().byId("calendarSelect");
				cal.setVisible(false);
			}
		},

		handleCalendarSelect: function(oEvent) {
			var oCalendar = oEvent.oSource;
			this._updateText(oCalendar);
		},

		_updateText: function(oCalendar) {
			var oSelectedDateFrom = this.getView().byId("selectedDateFrom");
			var oSelectedDateTo = this.getView().byId("selectedDateTo");
			var aSelectedDates = oCalendar.getSelectedDates();
			// var oNoOfHours = this.getView().byid("idHours");
			// if(oSelectedDateFrom === oSelectedDateTo) {
			// 	oNoOfHours.setEnabled(false);
			// }
			var oDate;
			if (aSelectedDates.length > 0) {
				oDate = aSelectedDates[0].getStartDate();
				if (oDate) {
					oSelectedDateFrom.setValue(this.oFormatYyyymmdd.format(oDate));
				}
				// else {
				// 	oSelectedDateTo.setText("No Date Selected");
				// }
				oDate = aSelectedDates[0].getEndDate();
				if (oDate) {
					oSelectedDateTo.setValue(this.oFormatYyyymmdd.format(oDate));
				}
				// else {
				// 	oSelectedDateTo.setText("No Date Selected");
				// }
			}

			// else {
			// 	oSelectedDateFrom.setText("No Date Selected");
			// 	oSelectedDateTo.setText("No Date Selected");
			// }
		},

		handleSelectThisWeek: function(oEvent) {
			this._selectWeekInterval(6);
		},

		handleSelectWorkWeek: function(oEvent) {
			this._selectWeekInterval(4);
		},

		_selectWeekInterval: function(iDays) {
			var oCurrent = new Date(); // get current date
			var iWeekstart = oCurrent.getDate() - oCurrent.getDay() + 1;
			var iWeekend = iWeekstart + iDays; // end day is the first day + 6
			var oMonday = new Date(oCurrent.setDate(iWeekstart));
			var oSunday = new Date(oCurrent.setDate(iWeekend));

			var oCalendar = this.getView().byId("calendar");

			oCalendar.removeAllSelectedDates();
			oCalendar.addSelectedDate(new DateRange({
				startDate: oMonday,
				endDate: oSunday
			}));

			this._updateText(oCalendar);
		},

		onPressLeaveRequestBtn: function() {

			var oDateFrom = this.getView().byId("selectedDateFrom").getValue();
			var oDateTo = this.getView().byId("selectedDateTo").getValue();
			var oLType = this.getView().byId("idLeaveType").getSelectedItem().getText();
			var oApprover = this.getView().byId("idApprover").getSelectedItem().getText();
			//var oNote = this.getView().byId("idNotes").getText();

			var dialog = new sap.m.Dialog({
				title: "Confirm",
				type: "Message",
				state: "Warning",
				content: new sap.m.Text({
					text: "Are you sure to send request to " + oApprover + " for " + oLType + " from " + oDateFrom + " to " + oDateTo + "?"
				}),
				beginButton: new sap.m.Button({
					text: "OK",
					press: function() {
						sap.m.MessageToast.show("Sent Successfully!");
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
		}
	});
});