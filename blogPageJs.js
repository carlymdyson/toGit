function getAllBlogs() {	
	let request = new XMLHttpRequest();
	//console.log("hello");
	request.open("GET", "http://localhost:8080/getAll"); 
	//request.open("GET", "http://" + location.hostname + ":8082" + "/getAll");
	//console.log(location.host);

	// anythign to do with request.response needs to go in here(below)
	request.onload = function() { 
		// onload gets executed when it recieves the information
		renderData(JSON.parse(request.response));
	}
	request.send();
}
// need to actually call getAllBlogs or it wont run
getAllBlogs();

function deleteBlogPost(id) {	
	let request = new XMLHttpRequest();
	console.log("Gonna delete " + id);
	//console.log("hello");
	request.open("GET", "http://localhost:8080/delete/" + id ); 
	//request.open("GET", "http://" + location.hostname + ":8082" + "/delete/" + id);
	//console.log(location.host);
	request.send();
//	getAllBlogs();
	document.location.reload();
}

function updateBlog(id, blogtitle, blogtext) {
	// error checking:
	// console.log("id: " + id);
	// console.log("blogtitle: " + blogtitle);
	// console.log("blogtext: " + blogtext);

	deleteBlogPost(id);
 
	let body = {};

	// puts it into readable format
	//put body as equal to the stringified version of itself
	body = JSON.stringify({'id': id, 'blogtitle' : blogtitle, 'blogtext' : blogtext})
	let request = new XMLHttpRequest();
	request.open("POST", "http://localhost:8080/create");
	//request.open("POST", "http://" + location.hostname + ":8082" + "/create"); 
	// will need to insert request.setRequestHeader here (see header example tab)
	request.setRequestHeader("Content-type","application/json");
	
	request.send(body);
	request.onload = function() {
		// callng getAllBlogs again will refresh the page
		 getAllBlogs();
	}


}
	
function renderData(jsData) {
	// console.log(jsData);
	let list = document.getElementById("blog-list");
	//set list to nothing
	list.innerHTML="";

	//for each blog will be added in as a list item
	// blog is a reference variable
	for (let blog of jsData) {
	//	console.log(blog)
		let blogContainer = document.createElement("div");
		// this creates an item with the element inside
		
		let title = document.createElement("h2");
		title.innerText = blog.blogtitle;
		title.setAttribute("id", "Ti" + blog.id);

		let blogText = document.createElement("p");
		blogText.innerText = blog.blogtext;
		blogText.setAttribute("id", "Tx" + blog.id);

		let deleteBlog = document.createElement("button");
		deleteBlog.setAttribute("id", "deleteBlogPost()");
		deleteBlog.innerHTML = "Delete";
		deleteBlog.onclick = function() {deleteBlogPost(blog.id)};

		let updateBlogTitle = document.createElement("button");
		updateBlogTitle.setAttribute("popup", "updateBlog()" );
		updateBlogTitle.innerHTML = "Edit blog title";
		updateBlogTitle.onclick = function() {document.getElementById("Ti" + blog.id).contentEditable = true;
			let saveBlogTitle = document.createElement("button");
			saveBlogTitle.setAttribute("saveButton", "updateBlog()" );
			saveBlogTitle.innerHTML = "Save title";
			blogContainer.appendChild(saveBlogTitle);
			saveBlogTitle.onclick = function() {
			 	updateBlog(blog.id, title.innerText, blog.blogtext)
			};
		}

		let updateBlogText = document.createElement("button");
		updateBlogText.setAttribute("popup2", "updateBlog()" );
		updateBlogText.innerHTML = "Edit blog text";
		updateBlogText.onclick = function() {document.getElementById("Tx" + blog.id).contentEditable = true;
			let saveBlogText = document.createElement("button");
			saveBlogText.setAttribute("saveButton", "updateBlog()" );
			saveBlogText.innerHTML = "Save text";
			blogContainer.appendChild(saveBlogText);
			saveBlogText.onclick = function() {
			 	updateBlog(blog.id, blog.blogtitle, blogText.innerText)
			};
		}

		blogContainer.appendChild(title);
		blogContainer.appendChild(updateBlogTitle);
		blogContainer.appendChild(updateBlogText);
		blogContainer.appendChild(blogText);
		blogContainer.appendChild(deleteBlog);
		
		// this appends that new item to the rest of the list
		list.appendChild(blogContainer);
	}
}

function postData(form) {
	// blank body
	// console.log("Hello2");
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
	request.open("POST", "http://localhost:8080/create");
	//request.open("POST", "http://" + location.hostname + ":8082" + "/create"); 
	// will need to insert request.setRequestHeader here (see header example tab)
	request.setRequestHeader("Content-type","application/json");
	request.onload = function() {
		// callng getInfo again will refresh the page
		 getAllBlogs();
	}

	request.send(body);
	return false;
}

