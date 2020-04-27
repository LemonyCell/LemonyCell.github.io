function chimg(parent)
{
	const ImgPath1 = "https://i.pinimg.com/564x/d9/6c/52/d96c52866e11dc04bde0dc9be09fd0cb.jpg";
	const ImgPath2 = "https://i.pinimg.com/564x/91/c4/4a/91c44a652f1aaef2f4aca4fab4030057.jpg";
	
	const img = document.createElement("img");
	img.src = ImgPath1;
	img.onmouseover = () => 
	{
		img.src = ImgPath2;
	}
	img.onmouseout = () => 
	{
		img.src = ImgPath1;
	}
	
	parent.appendChild(img);
}

function ninput(parent)
{
	const p = document.createElement("p");
	p.innerText = "Number input";
	
	const input = document.createElement("input");
	//input.type = "number";
	input.onkeypress = checkDigit;
	
	parent.appendChild(p);
	parent.appendChild(input);
}

function checkDigit(event)
{
	const code = event.keyCode;
	if(code <= 47 || code >57)
		{
			return false;
		}
		
	return true;
}

function setMenu()
{
	window.addEventListener('contextmenu', 
	function (e) {
			e.preventDefault();
			showCustomMenu(true,event.clientX, event.clientY);
		}
		, false);
		
	window.addEventListener('click', 
	function (e) {
			showCustomMenu(false,event.clientX, event.clientY);
		}
		, false);
		
	const menuHtml = 
	'<div id="custommenu" style="width: 250px; height; 80px;visibility: hidden;">                                                      ' +
		'<div style="background-Color: silver; color: navy; font-Size: 10pt;" onclick="doAction(\'copy\');">Скопіювати вміст документа</div> ' +
		'<div style="background-Color: silver; color: navy; font-Size: 10pt;" onclick="doAction(\'close\');">Закрити вікно</div>             ' +
		'<div style="background-Color: silver; color: navy; font-Size: 10pt;" onclick="doAction(\'fontIncrease\');">Збільшити шрифт</div>    ' +
		'<div style="background-Color: silver; color: navy; font-Size: 10pt;" onclick="doAction(\'changeBkg\');">Змінити фон</div>           ' +
	'</div>';
	
	const div = document.createElement("div");
	div.innerHTML = menuHtml;
	
	document.body.appendChild(div);
	
}


function setMenuUpdate()
{
	window.addEventListener('contextmenu', 
	function (e) {
			e.preventDefault();
			showCustomMenu(true,event.clientX, event.clientY);
		}
		, false);
		
	window.addEventListener('click', 
	function (e) {
			showCustomMenu(false,event.clientX, event.clientY);
		}
		, false);
		
	const menuHtml = 
	'<style>                            ' +
	'	#custommenu:hover {border: solid 5px;}' +
	'</style>                           ' +
	'<div id="custommenu" style="width: 250px; height; 80px;visibility: hidden;">                                                      ' +
		'<div style="background-Color: silver; color: navy; font-Size: 10pt;" onclick="doAction(\'copy\');">Скопіювати вміст документа</div> ' +
		'<div style="background-Color: silver; color: navy; font-Size: 10pt;" onclick="doAction(\'close\');">Закрити вікно</div>             ' +
		'<div style="background-Color: silver; color: navy; font-Size: 10pt;" onclick="doAction(\'fontIncrease\');">Збільшити шрифт</div>    ' +
		'<div style="background-Color: silver; color: navy; font-Size: 10pt;" onclick="doAction(\'Зменшити шрифт\');">Зменшити шрифт</div>    ' +
		'<div style="background-Color: silver; color: navy; font-Size: 10pt;" onclick="doAction(\'changeBkg\');">Змінити фон</div>           ' +
	'</div>';
	
	const div = document.createElement("div");
	div.onmouseover = () => 
	{
		div.border = "3pt";
	}
	div.onmouseout = () => 
	{
		div.border = "0pt";
	}
	
	div.innerHTML = menuHtml;
	
	document.body.appendChild(div);
	
}

function showCustomMenu(sign, x, y) 
{
	/*  Функція приймає три параметри. Перший параметр (sign) є логічного типу. Він задає, що слід зробити з меню – показати чи приховати. Другий параметр (x) та третій параметр (y)  задають горизонтальну та вертикальну екранні координати точки, в якій користувач натиснув праву кнопку миші  */
	var cm = document.getElementById("custommenu"); /* Змінна cm буде вказувати на наше «меню» */

		if(sign) /* Якщо передано параметр sign, рівний true, то меню покажемо, а інакше приховаємо */
		{
			cm.style.visibility = 'visible';
		}
		else
		{
			cm.style.visibility = 'hidden';
		}
	/* Задаємо меню абсолютну позицію та встановлюємо координати його лівого верхнього кута */
	cm.style.position = 'absolute';
	cm.style.left = x;
	cm.style.top = y;
}

function doAction(actionType)
{
	switch(actionType)
	{
		case "copy":
			break;
		case "close":
			window.close();
			break;
		case "fontIncrease":
			document.body.style.fontSize="20pt";
			break;
		case "Зменшити шрифт":
			document.body.style.fontSize-=2;
			break;
		case "changeBkg":
			document.body.style.background = bg();
			break;
	}
}

function bg() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
  
    return bgColor;
    }


