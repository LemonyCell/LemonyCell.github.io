window.onload = async function(){
	
	createList(await getBookmarksAwait());
	
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
  let responseBookmarks = await fetch("https://api12342354.restlet.net/v1/bookmarks/");
  let bookmarks = await responseBookmarks.json();
  console.log("parsed json : ");
  console.log(JSON.stringify(bookmarks, '', ' '));
  return bookmarks;
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

function createList(json){
	const ul = document.getElementsByTagName("ul")[0];
	
	console.log('parsed json', json)
	for(let elem in json){
		console.log('elem: ', json[elem]);
		console.log('id: ', json[elem].id);
		console.log('url: ', json[elem].url);
		console.log('comment: ', json[elem].comment)
		ul.appendChild(createLi(json[elem].url, json[elem].comment));
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














