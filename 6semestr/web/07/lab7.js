window.onload = () => 
{
	assignFunctionToCheckboxes();
	checkbox();
	doMem();
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

// ----- sample 2
function doMem(mapName = "oneMem")
{
	const imgId = "3rgvrt4";
	const mapId = "drgr445gr5t";
	createImageMap(imgId, mapName, mapId);
	ninput(imgId, mapId);
}

function ninput(imgId, mapId)
{
	const p = document.createElement("p");
	p.innerText = "Zoom input";
	
	const input = document.createElement("input");
	input.type = "number"
	
	const btn = document.createElement("button");
	btn.value = "Try zoom";
	btn.onclick = (e) => 
	{
		const zoom = parseFloat(input.value, 10);
		zoomMap(zoom, imgId, mapId);
	};
	document.body.appendChild(input);
	btn.appendChild(p);
	document.body.appendChild(btn);
}

function createImageMap(imgId, mapName, mapId)
{
	const src = "https://i.pinimg.com/564x/43/d8/89/43d889b0b78d9f6c52f51e575dd5c4b7.jpg";
	const img = document.createElement("img");
	img.src = src;
	img.id = imgId;
	img.useMap = "#" + mapName;
	
	img.onload = () => 
	{
		const colgate = "https://www.colgate.com.ua/products/toothpaste";
		const onePunch = "https://mangapoisk.ru/manga/vanpanchmen";
		console.log(img, img.height, img.width);
		const ar0 = createArea(colgate, 0, 0, img.width, (img.height/2) - 1);/* верх лівий кут, середина прав сторони мінус 1 */
		const ar1 = createArea(onePunch, 0, (img.height/2) + 1, img.width, img.height);/*середина лів сторони плюс 1, нижній правий кут */
		
		const map = document.createElement("map");
		map.name = mapName;
		map.id = mapId;
		map.innerHTML = ar0.outerHTML + ar1.outerHTML;
		
		document.body.appendChild(document.createElement("br"));
		document.body.appendChild(img);
		document.body.appendChild(map);
	}
}

function createArea(href, x0, y0, x1, y1, shape = "rect")
{
	const area = document.createElement("area");
	area.target = "_blank";
	area.shape = shape;
	area.coords = [x0, y0, x1, y1].join(",");
	area.href = href;
	return area;
}

function zoomMap(zoom, imageId, mapId) { /* функції в якості параметрів передаємо коефіцієнт масштабування (параметр zoom) та атрибут id того зображення, яке підлягає масштабуванню (параметр imageId) */

	var karta = document.getElementById(imageId); /* karta посилається на тег <img>, що представляє зображення, яке плануємо масштабувати */

	var areas = document.getElementById(mapId).areas; /* змінна areas є масивом JavaScript-об'єктів, що представляють області карти посилань */

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

// ----- sample 3
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

// ------ task 3

function checkbox()
{
	const boxName = "box";
	const resId = "boxSum";
	
	const boxes = document.getElementsByName(boxName);
	const span = document.getElementById(resId);
	
	for(var i = 0; i < boxes.length; i++) /* у циклі “перебираємо” усі прапорці цієї групи */
	{
		boxes[i].onclick = click;
	}
	
	function click()
	{
		let count = 0;
		for(var i = 0; i < boxes.length; i++) /* у циклі “перебираємо” усі прапорці цієї групи */
		{
			if(boxes[i].checked)
			{
				count++;
			}
		}
		if(count < 5)
		{
			span.style.color = "red";
			span.innerText = "Відміть більше 4 прапорців";
		}
		else
		{
			span.style.color = "green";
			span.innerText = "Усе добре!";
		}
	}
}