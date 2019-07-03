window.onload = async function(){

	const bookmarks = await getBookmarksAwait();

	if(bookmarks === undefined){
		return;
	}
	
	createList(bookmarks);
	
    const footer = document.getElementById("footer");
    const addBtn = createAddBtn();
    footer.appendChild(addBtn);
}

function getBookmarks(){
	const res = fetch("https://api12342354.restlet.net/v1/bookmarks/")
    .then(response => response.json())
	.then(createList)
    .catch(function(ex) {
    console.log('parsing failed: ', ex)
  });
}

async function getBookmarksAwait() {
  return await fetch("https://api12342354.restlet.net/v1/bookmarks/")
  .then(response => {
	if(response.ok) {
		return response.json();
	  }
	  throw new Error('Network response was not ok.');
  }).catch(function(error) {
	console.log('There has been a problem with your fetch operation: ' + error.message);
  });
}


function createLi(url, comment){
	const div = document.createElement("div");
	div.classList.add("bookmark");
	
	const urlText = document.createTextNode("Url: ");
	const commentText = document.createTextNode("Comment: " + comment);
	
	let p = document.createElement("p");
	
	const a = document.createElement("a");
	//a.appendChild(document.createTextNode(url));
	a.innerText = url;
	a.href = url;
	a.setAttribute("target", "_blank"); // to open link in new page
	
	p.appendChild(urlText);
	p.appendChild(a);
	div.appendChild(p);
	
	p = document.createElement("p");
	p.appendChild(commentText);
	div.appendChild(p);
	
	
	const li = document.createElement("li");
	li.appendChild(div);
	return li;
}

function createList(bookmarks){
	const ul = document.getElementsByTagName("ul")[0];
	
	console.log('arr of objects : ', bookmarks)
	for(const {comment, url} of bookmarks){
		console.log('url: ', url);
		console.log('comment: ', comment)
		ul.appendChild(createLi(url, comment));
	}
}

function createAddBtn(){
	const button = document.createElement("button");
	const node = document.createTextNode("Add");
	button.appendChild(node);
	
	button.addEventListener("click", function(){
		const form = document.getElementById("addBookmarkForm");
		
		if(form.className == "hide"){
			form.classList.remove("hide");
		} else {
			addBookmark(); // send new bookmark to db and attach to page
			form.classList.add("hide");
		}
		
	});
	
	return button;
}

function addBookmark(){
	const form = document.getElementById("addBookmarkForm");
	const url = form.querySelector('[name="url"]');
	
	if (url.value == ""){
		alert("Url is empty");
		return;
	}
	
	const comment = form.querySelector('[name="comment"]');
	
	const ul = document.getElementsByTagName("ul")[0];
	ul.appendChild(createLi(url.value, comment.value));
	
	postBookmarkFetch(url.value, comment.value);
	
	url.value = "";
	comment.value = "";
}

function postBookmark(url, comment){
	var data = JSON.stringify({
	"url": url,
	"comment": comment
	});

	var xhr = new XMLHttpRequest();
	xhr.withCredentials = true;

	xhr.addEventListener("readystatechange", function () {
	  if (this.readyState === 4) {
		console.log(this.responseText);
	  }
	});

	xhr.open("POST", "https://api12342354.restlet.net/v1/bookmarks/");
	xhr.setRequestHeader("Content-Type", "application/json");

	xhr.send(data);
}

function postBookmarkFetch(url, comment){
	var data = JSON.stringify({
	"url": url,
	"comment": comment
	});
	
	fetch("https://api12342354.restlet.net/v1/bookmarks/", {  
    method: 'post',  
    headers: {  
      "Content-type": "application/json"  
    },  
    body: data
  })
  .catch(function (error) {  
    console.log('Request failed', error);  
  });
}














