window.onload = () => 
{
	assignFunctionToCheckboxes();
}
// ----- sample 1
function editPassword(password, messageId, minLength, maxLength) { /* Параметр password задає атрибут id потрібного поля для вводу паролю, а параметр messageId – атрибут id відповідного дескриптора <font>, в якому розміщатимемо текст-попередження. Параметри minLength та maxLength задають відповідно мінімальну та максимальну довжини поля для вводу паролю у символах */
	console.log("passId - %s | msgId - %s", password, message);
	var password = document.getElementById(password); /* password вказує на поле для вводу паролю */
	var message = document.getElementById(messageId); /* message вказує на контейнер <font></font>, куди будемо виводити текст-попередження */

	if (password.value.length < minLength) /* якщо кількість символів у полі для вводу паролю менша за minLength */
	{/* Формуємо текст-повідомлення про те, що символів замало. Зауважте, що тут ми користуємося властивістю innerText. innerText – це текст, записаний між відкриваючим та закриваючим тегами (в даному випадку, текст, записаний між тегами <font> та </font>)*/

		message.innerText = 'Надійний пароль повинен містити не менше ' + minLength + ' символів';

		message.style.color = '#ff0000'; /* Задаємо тексту червоний колір */

	}
	else if (password.value.length > maxLength) /* якщо кількість символів у полі для вводу паролю більша за maxLength, то формуємо відповідне повідомлення і виводимо його теж червоним шрифтом */
	{

		message.innerText = 'Довжина паролю не повинна перевищувати ' + maxLength + ' символів';

		message.style.color = '#ff0000';

	}
	else /* інакше (коли довжина поля для вводу паролю знаходиться у дозволених межах), виводимо повідомлення “Ok” зеленим шрифтом */
	{

		message.innerText = 'Ok';

		message.style.color = '#00cc00';

		return true;

	}

}

function zoomMap(zoom, imageId) { /* функції в якості параметрів передаємо коефіцієнт масштабування (параметр zoom) та атрибут id того зображення, яке підлягає масштабуванню (параметр imageId) */

	var karta = document.getElementById(imageId); /* karta посилається на тег <img>, що представляє зображення, яке плануємо масштабувати */

	var areas = document.all.map.areas; /* змінна areas є масивом JavaScript-об'єктів, що представляють області карти посилань */

	for(var i=0; i<areas.length; i++) /* у циклі по черзі розглядаємо кожну область карти посилань */
	{

		var coords = (areas[i].coords).split(','); /* змінна coords міститиме координати карти посилань. І справді, після розбиття текстового рядка, що є значенням атрибута coords тега <area> на складові текстові рядки, коли символом-роздільником є ",", буде одержаний масив координат */

		for(var j = 0; j < coords.length; j++) /* "перебираємо" всі елементи масиву coords. Кожен елемент множимо на коефіцієнт масштабування. Результат заокруглюємо до цілого числа, оскільки координати областей карти посилань повинні бути цілими числами. */
		{
			coords[j] = Math.round(coords[j]*zoom);

		}

		areas[i].coords = coords.join(','); /* Зменшені (або збільшені) в zoom разів координати знову "склеюємо" у текстовий рядок (символом-роздільником є ",") та записуємо назад у атрибут coords відповідної області посилання */

	}

	/* масштабуємо саме зображення, що є картою посилань. Для цього ширину та висоту зображення множимо на коефіцієнт масштабування та результати множення заокруглюємо до цілих чисел */

	karta.width = Math.round((karta.width)*zoom);

	karta.height = Math.round((karta.height)*zoom);
}
// ----- sample 2
function showStreets(regionIndex,selectId) {
	/* Для вирішення нашої задачі зручно застосувати масиви. Опишемо 5 масивів, кожен з яких містить назви вулиць одного конкретного району міста Львова: */
	const streetsGal  = new Array('Галицька','Ставропігійська','Краківська','Театральна','Вірменська');
	const streetsShev = new Array('Чорновола','Остряниці','Замарстинівська','Топольна','Варшавська');
	const streetsFran = new Array('Сахарова','Наукова','Княгині Ольги','В.Великого');
	const streetsLych = new Array('Личаківська','Пекарська','Нечуя-Левицького','Зелена');
	const streetsSykh = new Array('Хоткевича','Червоної Калини');
	
	/* Оголосимо масив streetsAll з 6 елементів. Першим елементом зробимо значення null, наступні 5 елементів будуть вже оголошеними масивами streetsGal,streetsFran,streetsLych,streetsSykh та streetsShev. Кількість та послідовність елементів масиву streetsAll повинна відповідати кількості та послідовності елементів списку районів. Елементу "Виберіть район" списку районів відповідає значення null, елементу "Галицький" – масив streetsGal, що описує вулиці Галицького району, елементу streetsFran – масив streetsFran, що перелічує вулиці Франківського району і т.д. Масив streetsAll сформований так, щоб можна було написати лаконічний, мінімізований код функції showStreets */
	let streetsAll = new Array(streetsGal.sort(),streetsFran.sort(),streetsLych.sort(),streetsSykh.sort(),streetsShev.sort());
	const allStreetsInRow = streetsAll.flat().sort();
	
	streetsAll.unshift(allStreetsInRow);
	streetsAll.unshift(null);
	
	/* Змінна streetsSelect вказуватиме на список вулиць, до якого звертаємося за значенням атрибута id: */
	const streetsSelect = document.getElementById(selectId);
	
	if (regionIndex <= 0) /* Якщо зі списку районів не вибрано жоден елемент або ж виділений елемент "Виберіть район", то список вулиць приховуємо (присвоюючи властивості visibility значення 'hidden') і припиняємо роботу функції (за допомогою оператора return). Якщо ж у списку районів вибрано назву району, то виконання функції продовжується */
	{
		streetsSelect.style.visibility = 'hidden';
		return false;
	}

	/* викликаємо допоміжну функцію clearSelect, яку нам ще належить описати. Функція clearSelect здійснює "очищення" списку від елементів. Вона приймає один параметр – об'єкт (а точніше, саме список), з якого слід видалити елементи */
	//clearSelect(streetsSelect); 
	streetsSelect.innerHTML = "";
	
	streetsSelect.style.visibility = 'visible'; /* робимо список вулиць видимим */
	
	/* І зрештою, найголовніше – "населення" списку вулиць новими елементами. Ось для чого нам знадобиться масив streetsAll. Оскільки індекс вибраного району співпадає з індексом елемента масиву streetsAll, який описує вулиці цього району, то до відповідного масиву вулиць можна звернутися так: streetsAll[regionIndex]. У циклі "перебираємо" всі вулиці вибраного району */
	
	for(var i = 0; i < streetsAll[regionIndex].length; i++)
	{/* створюємо новий елемент списку, текст і значення value якого рівний streetsAll[regionIndex])[i] (тобто, i-ій вулиці з масиву потрібних вулиць) */
		const newStreet = new Option((streetsAll[regionIndex])[i],(streetsAll[regionIndex])[i]);
		streetsSelect.add(newStreet,i); /* на i-ту позицію списку вулиць додаємо новостворений елемент */
	}
}

function clearSelect(selectObject){
	while(selectObject.length) /* Поки у списку ще є елементи, видаляємо елемент списку з індексом 0. Зауважте, що для запису умови циклу while тут використано наступну властивість мови JavaScript: ціле число інтерпретується як false, якщо воно нульове, і як true у протилежному випадку. Поки властивість length не рівна 0, цикл виконуватиметься */
	{
		selectObject.remove(0);
	}
}

// ----- sample 4
/* Функція getTotalPrice() призначена власне для обчислення сумарної вартості вибраних товарів */
function getTotalPrice() {  
	var sum = 0; /* змінна sum зберігатиме сумарну вартість вибраних товарів */
	var boxes = document.getElementsByName('goods'); /* За значенням атрибута name звертаємося до групи прапорців. Змінна boxes зберігатиме цілу колекцію прапорців, об’єднаних у групу. Звертатися до кожного окремого прапорця будемо за індексом, використовуючи для цього цикл. Таким чином, ми одержимо компактний, уніфікований код. Ось для чого нам треба було задати спільне значення атрибута name всім прапорцям */
	
	//У циклі “перебираємо” всі прапорці
	for(var i = 0; i < boxes.length; i++)
	{
		if(boxes[i].checked) /* Перевіряємо, чи i-ий прапорець відмічений (тобто, чи його властивість checked рівна true). Якщо так, то це означає, що відповідний товар вибраний. Ціна товару, як вже було сказано раніше, записана в атрибуті value даного прапорця. Ціну (тобто, вміст атрибута value i-ого прапорця) додаємо до змінної sum. Зауваження: значення атрибута value є текстовим рядком. Тому здійснюємо “перетворення текстового рядка в число”, конструюючи об’єкт Number (інакше застосування оператора “+” спричинить конкатенацію рядків, а зовсім не додавання чисел). */
		{
			sum = sum + (new Number(boxes[i].value)); 
		}
	}
	
	document.getElementById('price').innerText = sum;
	//Зрештою, записуємо обчислену поточну сумарну вартість вибраних товарів у тег з атрибутом id=“price”.
}

function assignFunctionToCheckboxes() {
	var boxes = document.getElementsByName('goods'); /* знайомим способом звертаємося до групи прапорців, з атрибутом name= ‘goods’ */
	for(var i = 0; i < boxes.length; i++) /* у циклі “перебираємо” усі прапорці цієї групи */
	{
		boxes[i].onclick = getTotalPrice; /* в атрибут onclick записуємо функцію-обробник getTotalPrice */
	}
}

// ----- task 2

function checkBtn(index, btnId)
{
	const btn = document.getElementById(btnId);
	if(index == 0)
	{
		btn.disabled = true;
	}
	else
	{
		btn.disabled = false;
	}
}

//--------------------
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
			document.body.style.fontSize="10pt";
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


