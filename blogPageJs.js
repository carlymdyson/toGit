function getAllBlogs() {	
	let request = new XMLHttpRequest();
	console.log("hello");
	//going to send a get request to the address
	//request.open("GET", "http://localhost:8081/getAll"); 
	request.open("GET", "http://" + location.hostname + ":8082" + "/getAll");
	console.log(location.host);

	// anythign to do with request.response needs to go in here(below)
	request.onload = function() { 
		// onload gets executed when it recieves the information
		renderData(JSON.parse(request.response));
	}
	request.send();
}
// need to actually call getInfo or it wont run
getAllBlogs();

function renderData(jsData) {
	// console.log(jsData);
	let list = document.getElementById("blog-list");
	//set list to nothing
	list.innerHTML="";

	//for each duck will be added in as a list item
	// duck is a reference variable
	for (let blog of jsData) {
	//	console.log(blog)
		let blogContainer = document.createElement("div");
		// this creates an item with the element inside
		let title = document.createElement("h2");
		title.innerText = blog.blogtitle;

		let blogText = document.createElement("p");
		blogText.innerText = blog.blogtext;
		blogContainer.appendChild(title);
		blogContainer.appendChild(blogText);
		// this appends that new item to the rest of the list
		list.appendChild(blogContainer);
	}
}

function postData(form) {
	// blank body
	let body = {};

	// form is sort of an array of inputs
	// inputty is each input
	for (let inputty of form) {
		// this if statement stops the final colon from appearing
		// further reading 'truthy and falsey'
		if(inputty.name) {
			// create key in body, and it's value 
			body[inputty.name] = inputty.value
		}
		
	}	
	// puts it into readable format
	//put body as equal to the stringified version of itself
	body = JSON.stringify(body);
	
	let request = new XMLHttpRequest();
	//request.open("POST", "http://localhost:8080/create");
	request.open("POST", "http://" + location.hostname + ":8082" + "/create"); 
	// will need to insert request.setRequestHeader here (see header example tab)
	request.setRequestHeader("Content-type","application/json");
	request.onload = function() {
		// callng getInfo again will refresh the page
		getAllBlogs();
	}

	request.send(body);
}

