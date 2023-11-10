var smtpConnection = new $.net.SMTPConnection();
var mail = new $.net.Mail({
	sender: {address: "manjunatha.kashirudraiah@utegration.com"},
	to: [{
		name: "Manja",
		address: "manjunatha.kashirudraiah@utegration.com"
	}],
	subject: "subject",
	subjectEncoding: "UTF-8",
	parts: [new $.net.Mail.Part({
		type: $.net.Mail.Part.TYPE_TEXT,
		text: "The body of the mail.",
		contentType: "text/html",
		encoding: "UTF-8"
	})]
});
var returnValue = smtpConnection.send(mail);

// var returnValue = mail.send();
var response = "MessageId = " + returnValue.messageId + ", final reply = " + returnValue.finalReply;
// smtpConnection.close();

$.response.status = $.net.http.OK;
$.response.contentType = "text/html";
$.response.setBody(JSON.stringify(response));