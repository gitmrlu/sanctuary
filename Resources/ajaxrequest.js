

function getTasks(callback)
{
	var url = 'https://my.engr.illinois.edu/labtrack/util_data_json.asp?';
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.onload=function() {
		// this.responseText holds the raw text return of the message (used for JSON)
		// this.responseXML holds any returned XML (used for SOAP web services)
		// this.responseData holds any returned binary data
		var tasks=[];
		Ti.API.debug(this.responseText);
		var content = this.responseText;
		obj = JSON.parse(content);		
		tasks.push(obj.data[6].inusecount);
		tasks.push(obj.data[6].machinecount);
		tasks.push(obj.data[7].inusecount);
		tasks.push(obj.data[7].machinecount);
		
		callback(tasks);
	};
	
	//Sending asynchronous requests, thus third parameter need set to be true. 
	xhr.open("GET", url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send();
}