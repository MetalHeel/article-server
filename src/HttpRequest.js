// Todo: Check the responses better.
export class HttpRequest {
	static post(url, body, cb) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState === XMLHttpRequest.DONE)
				cb();
		};
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(body));
	}

	static get(url, cb) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState === XMLHttpRequest.DONE)
				cb(JSON.parse(xmlHttp.responseText));
		};
    xmlHttp.open("GET", url, true);
    xmlHttp.send();
	}

	static put(url, body) {
		var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PUT", url, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify(body));
	}

	static delete(url, cb) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState === XMLHttpRequest.DONE)
				cb();
		};
    xmlHttp.open("DELETE", url, true);
    xmlHttp.send();
	}
}