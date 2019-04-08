window.onload = function(){
	const btn = document.getElementById('btn')
	
	console.log(btn);
//	document.getElementsByTagName("button")[0].addEventListener(fun);
	
	btn.addEventListener( "click" , function() {
		const table = fun();
	});
	
	
}

function Iqals() {
    var num1,num2,num3,num4,result;
   num1 = document.getElementById("money").value;
   num1 =parseInt(num1);
   num2 = document.getElementById("volume").value;
   num2 =parseInt(num2);
   num3 = document.getElementById("age").value;
   num3 =parseInt(num3);
   var select = document.getElementById("type");
    var value = select.value;

   
   if(value == "Дизель") {num4=75}
   else {
    num4=50
   }

   if(num3>15) {num3=15}
result = num1*0.1 + num1*0.2 + num2*num3*num4; 
document.getElementById("out").innerHTML=result;
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















