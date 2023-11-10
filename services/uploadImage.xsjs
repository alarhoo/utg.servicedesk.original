// var conn = $.db.getConnection();
// // var userId = $.request.parameters.get("USERID");
// var data = $.request.body.asString();    
// var pstmt = conn.prepareStatement("INSERT INTO \"UTG_AMS_SD\".\"IMAGE_STORE\" (IMAGE_NAME, IMAGE_CONTENT) VALUES (?, ?)");
// pstmt.setString(1, "MKASHI"); // Just hardcoding an id. This can very well be part of the ajax post body or url
// pstmt.setString(2, data);
// pstmt.execute();
// pstmt.close();
// conn.commit();
// conn.close();
// $.response.contentType = "text/plain";
// $.response.setBody("Image uploaded successfully");
// $.response.status = $.net.http.OK;

var schemaName = "UTG_AMS_SD";
var user = $.request.parameters.get("user");
var filename = $.request.parameters.get("filename");
try {
	var conn = $.db.getConnection();
	var pstmt = conn.prepareStatement('UPDATE "UTG_AMS_SD"."utg.ams.sd.data::Person.Employee" SET "AVATAR" = (?) WHERE "USER_NAME" = (?)');
	//var pstmt = conn.prepareStatement("INSERT INTO \"UTG_AMS_SD\".\"IMAGE_STORE\" (IMAGE_NAME, IMAGE_CONTENT) VALUES (?, ?)");
	if ($.request.entities.length > 0) {

		//  Read in the posted image or binary data as an Array Buffer - you can use this to save as a BLOB
		var fileBody = $.request.entities[0].body.asArrayBuffer();
		
		pstmt.setBlob(1, fileBody); // Set the Blob as the array buffer that has the image data
		pstmt.setString(2, user); // Set the file name
		pstmt.execute();

	} else {
		$.response.setBody("No Entries in request");
	}
	pstmt.close();
	conn.commit();
	conn.close();
	$.response.contentType = "text/html";
	$.response.setBody("[200]:Upload for file" + filename + " was successful!");
} catch (err) {
	if (pstmt !== null) {
		pstmt.close();
	}
	if (conn !== null) {
		conn.close();
	}
	$.response.contentType = "text/html";
	$.response.setBody("File could not be saved in the database.  Here is the error:" + err.message);
}