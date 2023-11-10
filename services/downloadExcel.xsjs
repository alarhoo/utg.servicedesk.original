// $.import("sap.hana.democontent.epm.services", "messages");
// var MESSAGES = $.sap.hana.democontent.epm.services.messages;
// function downloadExcel() {
// var	body = '';

// try {
// 	var	query = 'SELECT TOP 25000 "PurchaseOrderId", "PartnerId", "CompanyName", "CreatedByLoginName", "History.CREATEDAT", "GrossAmount" ' +
// 		'FROM "sap.hana.democontent.epm.data::purchaseOrderHeaderExternal" order by "PurchaseOrderId"';
// 	$.trace.debug(query);
// 	var	conn = $.db.getConnection();
// 	var pstmt = conn.prepareStatement(query);
// 	var	rs = pstmt.executeQuery();
// 	body = MESSAGES.getMessage('SEPM_POWRK', '002') + "\t" + // Purchase Order ID
// 	MESSAGES.getMessage('SEPM_POWRK', '003') + "\t" + // Partner ID
// 	MESSAGES.getMessage('SEPM_POWRK', '001') + "\t" + // Company Name
// 	MESSAGES.getMessage('SEPM_POWRK', '004') + "\t" + // Employee Responsible
// 	MESSAGES.getMessage('SEPM_POWRK', '005') + "\t" + // Created At
// 	MESSAGES.getMessage('SEPM_POWRK', '006') + "\n"; // Gross Amount

// 	while (rs.next()) {
// 		body += rs.getNString(1) + "\t" + rs.getNString(2) + "\t"
// 		+ rs.getNString(3) + "\t" + rs.getNString(4) + "\t"
// 		+ rs.getDate(5) + "\t" + rs.getDecimal(6) + "\n";
// 	}
// } catch (e) {
// 	$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
// 	$.response.setBody(e.message);
// 	return;
// }

// $.response.setBody(body);
// $.response.contentType = 'application/vnd.ms-excel; charset=utf-16le';
// $.response.headers.set('Content-Disposition', 'attachment; filename=Excel.xls');
// $.response.status = $.net.http.OK;
// }

//function downloadExcel(){
    var body = '';
    var query = 'SELECT TOP 1000 \"USER_NAME\", \"DATE\", \"COMPLETED\", \"PENDING\", \"FOLLOWUP\" FROM \"UTG_AMS_SD\".\"utg.ams.sd.data::Person.Handover\"';    $.trace.debug(query);
    var conn = $.db.getConnection();
    var pstmt = conn.prepareStatement(query);
    var rs = pstmt.executeQuery();
    body = "User Name \tDate \tCompleted \tPending \tFollowup \n";
   while(rs.next()) {
        body = body + rs.getString(1) + "\t" + rs.getTimestamp(2) + "\t" + rs.getString(3) + "\t" + rs.getString(4) + "\t" + rs.getString(5) + "\t" + "\n";
    }
    rs.close();
    pstmt.close();
    conn.close();
    $.response.setBody(body);   
    $.response.contentType = 'application/vnd.ms-excel; charset=utf-16le';
    $.response.headers.set('Content-Disposition','attachment; filename=Handover.xls');
    $.response.headers.set('access-control-allow-origin','*');
    $.response.status = $.net.http.OK;
//}