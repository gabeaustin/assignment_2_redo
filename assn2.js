function MenuChoice(selection)
{
document.getElementById("customerlist").style.visibility = "hidden";
document.getElementById("orderhistory").style.visibility = "hidden";
document.getElementById("about").style.visibility = "hidden";
switch (selection)
{
case "customerlist":
document.getElementById("customerlist").style.visibility = "visible"; //Makes the Customer List HTML section visible
ListCustomers(); //Calls the function that creates the store list
break;
case "orderhistory":
document.getElementById("orderhistory").style.visibility = "visible";
break;
case "about":
document.getElementById("about").style.visibility = "visible";
break;
case "None":
//No menu item selected, so no section should be displayed
break;
default:
alert("Please select a different menu option");
}
}

function ListCustomers() //This sends a request to the GetAllStores service and creates a table with the data returned
{
var xmlhttp = new XMLHttpRequest(); //Creates the XMLHttpRequest object
var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getAllCustomers"; //URL for the service
xmlhttp.onreadystatechange = function() { //Creates the event handler for service request
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
var output = JSON.parse(xmlhttp.responseText); //Captures the data returned form the service and puts in an object
GenerateOutput(output); //Calls the function that creates the output table and passes the data object to it
}
}
xmlhttp.open("GET", url, true); //Sets the options for requesting the service
xmlhttp.send(); //Calls the service
function GenerateOutput(result) //This function receives the data form the service and creates a table to display it
{
var display = "<table><tr><th>Customer ID</th><th>Customer Name</th><th> City</th></tr>"; //Table Headings
var count = 0; //Count variable to loop
var companyname = "";
var customerid = "";
var city = "";
for(count = 0; count < result.GetAllCustomersResult.length; count ++) //Loop for creating table rows
{
//Anchor link: <a href="javascript:function("parameter");">
customerid = result.GetAllCustomersResult[count].CustomerID; //Assigns the Store ID to a variable
companyname = '<a href="javascript:Orders(' + "'" + customerid + "');" + '">';
companyname += result.GetAllCustomersResult[count].CompanyName;
companyname += '</a>';
city = result.GetAllCustomersResult[count].City; //Assigns the Store City to a variable
display += "<tr><td>" + customerid + "</td><td>" + companyname + "</td><td>" + city +
"</td></tr>"; //Creates a table row
}
display += "</table>"; //Closes the table HTML after table rows are added
document.getElementById("customerlist").innerHTML = display; //Displays the table in the HTML page
}
}


function Orders(customerid)
{
var xmlhttp = new XMLHttpRequest();
var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/"; // Service URL

url += customerid;
xmlhttp.onreadystatechange = function() {
if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
var output = JSON.parse(xmlhttp.responseText);
GenerateOutput(output);
}
}
xmlhttp.open("GET", url, true);
xmlhttp.send();
function GenerateOutput(result) //Function that displays results
{
var display = "<table><tr><th>Product Name</th><th>Quantity</th></tr>";
var count = 0;
for(count = 0; count < result.length; count ++)
{
display += "<tr><td>" + result[count].ProductName + "</td><td>" +
result[count].Total + "</td></tr>";
}
display += "</table>";
document.getElementById("orderhistory").innerHTML = display;
MenuChoice("orderhistory");
}
}