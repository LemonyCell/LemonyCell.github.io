window.onload = function(){
	
	const res = fetch("https://api12342354.restlet.net/v1/bookmarks/")
    .then(response => response.json())
	.then(createList)
    .catch(function(ex) {
    console.log('parsing failed: ', ex)
  })
  
  
	
	
	
	/*
	const btn = document.getElementById('btn')
	
	console.log(btn);
//	document.getElementsByTagName("button")[0].addEventListener(fun);
	
	btn.addEventListener( "click" , function() {
		const table = fun();
	});
	*/
}

function getLi(url, comment){
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
		ul.appendChild(getLi(json[elem].url, json[elem].comment));
	}
}

function fun(){
	const request = fetch("https://wrapapi.com/use/Vitya80100/tntu/kyrs/latest?wrapAPIKey=83wS8aKHmtyblx1ubmYunc1EHd7vpk5o")
	.then(res => res.text()).
	then(json => JSON.parse(json).data.table.rows)
	.then(gotData);
}

function gotData(matr){
	console.log(matr);
	console.log(typeof(matr));

	let matrix = [];
	let i = 0;
	let j = 0;

	for (let r in matr){ 
		let row = matr[r];
		matrix[i] = [];
		for (let c in row){
			let column = row[c]
			for (let index in column){
				//console.log(column[index]);
				matrix[i][j] = column[index];
				j = j + 1;
			}
			j = 0;
			console.log(matrix[i]);
		}
		i = i + 1;
	}
	console.log(typeof(matrix));
	console.log(matrix);
	
	printTable(matrix);
}

function printTable(matrix){
	console.log("Creating Table");
	var table = document.createElement("table");
	table.style.border = "thick solid #0000FF";
	
	for (let r in matrix){
		let row = matrix[r];
		let tr = document.createElement("tr");
		for (let c in row){
			var column = row[c];
			console.log("column - " + column);
			
			let td = document.createElement("td");
			td.style.border = "thick solid #0000FF";
			let p = document.createElement("p");
			let node = document.createTextNode(column);
			
			p.appendChild(node);
			td.appendChild(p);
			tr.appendChild(td);
		}
		table.appendChild(tr);
	}
	
	const body = document.getElementsByTagName("body")[0];
	body.appendChild(table);
}















