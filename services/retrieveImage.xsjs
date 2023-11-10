//   var userImageData = "";
//   //var userName = $.request.parameters.get("user");
//   var conn = $.db.getConnection();
//   var query = "SELECT \"IMAGE_CONTENT\" FROM \"UTG_AMS_SD\".\"IMAGE_STORE\" WHERE \"IMAGE_NAME\" = 'Manja.jpg'";
//   var pstmt = conn.prepareStatement(query);
//   var userImageResult = pstmt.executeQuery();
//   //   if (userImageResult.next()) { // User Image retrieved
//   //   	userImageData = userImageResult.getString(2);
//   //   }
//   pstmt.close();
//   conn.close();
//   $.response.setBody(userImageResult);
//   $.response.contentType = "text/html";
//   $.response.status = $.net.http.OK;

   // var query = "SELECT EMPID FROM \"UTG_AMS_SD\".\"utg.ams.sd.data::Person.Employee\" WHERE \"USER_NAME\" = 'MKASHI'"; 
   // // var query = "SELECT SUM(\"Column_Name\") FROM \"Schema_Name\".\"Table_Name\""; 
   // var oConnection = $.db.getConnection(); 
   // var oStatement = oConnection.prepareStatement(query); 
   // oStatement.execute(); 
   // var oResultSet = oStatement.getResultSet();
   // var result = {
   //     records : [ ]   
   // }; 
   // while (oResultSet.next()) { 
   //   result.records.push({value: oResultSet.getInteger(1)}); 
   // } 
   // oResultSet.close(); 
   // oStatement.close(); 
   // oConnection.close(); 
   // $.response.contentType = "text/html"; 
   // $.response.setBody(JSON.stringify(query)); 
   // $.response.status = $.net.http.OK; 

$.response.contentType = "text/html";
var user = $.request.parameters.get("user");
var output = "My Personal Library!<br><br>";

//Open a database connection
var conn = $.db.getConnection();

//Prepare a simple SQL statement on the system table "DUMMY"
var pstmt = conn.prepareStatement('SELECT "AVATAR" FROM "UTG_AMS_SD"."utg.ams.sd.data::Person.Employee" WHERE "USER_NAME" = (?)');
pstmt.setString(1, user);
//Execute the query
var rs = pstmt.executeQuery();

//Check the query result
if (!rs.next()) {
    //Something went wrong: Return an error
    $.response.setBody("Failed to retrieve data");
    //$.response.status = $.net.http.INTERNAL_SERVER_ERROR;
} else {
    //All went fine: Return the Query result
    output = output + "This is the response from my SQL:<br><br>";
    output = rs.getBlob(1);
}

//Close the database connection
rs.close();
pstmt.close();
conn.close();

//Return the HTML response.
$.response.setBody(output);