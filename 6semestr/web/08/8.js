window.onload = async () => 
{
	sample1();
	const select = document.querySelector("#sample2 #city");
	select.onchange = handleSelect;
	
	const btnAdd = document.querySelector("#sample3 #add");
	btnAdd.onclick = addToList;
	const btnRem = document.querySelector("#sample3 #remove");
	btnRem.onclick = deleteItem;

	const btnTask2 = document.querySelector("#task2 button");
	btnTask2.onclick = changeBtnStyle;

	task4();
	await lvivIndex(79100);
}

function sample1()
{
	const inputs = document.querySelectorAll("#sample1 input");
	const btn = document.querySelector("#sample1 button");
	
	inputs.forEach(input => 
		{
			input.onkeyup = checkDisablet;
		});
		
	function checkDisablet(event)
	{
		let disabled = false;
		for(let i = 0; i<inputs.length; i++)
		{
			if(inputs[i].value.length == 0)
			{
				disabled = true;
			}
		}
		
		btn.disabled = disabled;
	}
}

function handleSelect()
{
	var sel = document.getElementById("city");
	
	if(sel.selectedIndex == 0 || sel.selectedIndex == -1)
	{
		document.getElementById("send").disabled = true;
	}
	else
	{
		document.getElementById("send").disabled = false;
	}
}

function addToList()
{
	if(document.getElementById("newElement").value != "") /*Якщо вміст текстового поля не пустий*/
	{
		var sel = document.getElementById("todo");
		var newItem = new Option();/*Оголошення нового об’єкта типу «Елемент списку»*/
		newItem.text=document.getElementById("newElement").value; /*У властивість text нового елемента списку записуємо вміст текстового поля*/
		newItem.value=sel.options.length-1; /*У властивість value нового елемента списку записуємо його майбутній порядковий номер у списку */
		
		sel.add(newItem, sel.length); /*До списку додаємо визначений елемент на останню позицію */
	}

}

function deleteItem()
{
	var sel = document.getElementById("todo"); /* у змінну sel запишемо посилання на випадаючий список */
	sel.remove(sel.selectedIndex); /* Видаляємо елемент, що є вибраним у списку на даний момент */
	sel.selectedIndex = 0; /* Робимо вибраним елемент з індексом 0*/
}

function formSubmit()
{
	if(document.getElementById("login").value != "" && document.getElementById("password").value != "")
	document.querySelector("#sample5 form").submit();
}

function changeBtnStyle()
{
	const i = document.querySelector("#task2 input");
	i.style.backgroundColor = "red";
	i.style.color = "white";
	i.style.height = "28px";
	i.style.fontSize = "10pt";
}

function task3()
{
	const html =
	'<table>                  ' +
	'	<tr>                  ' +
	'		<th>Firstname</th>' +
	'		<th>Lastname</th> ' +
	'		<th>Age</th>      ' +
	'	</tr>                 ' +
	'	<tr>                  ' +
	'		<td>Jill</td>     ' +
	'		<td>Smith</td>    ' +
	'		<td>50</td>       ' +
	'	</tr>                 ' +
	'	<tr>                  ' +
	'		<td>Eve</td>      ' +
	'		<td>Jackson</td>  ' +
	'		<td>94</td>       ' +
	'	</tr>                 ' +
	'</table>                 ' +
    '<button>Click</button>   ';
	const div = document.createElement("div");
	div.innerHTML = html;
	const btn = div.querySelector("button");
	btn.onclick = () => 
	{
		const arr = div.querySelectorAll("tr");
		arr[0].style.visibility = "collapse";
		arr[2].style.visibility = "hidden";
	}
	document.body.appendChild(div);
}

function task4()
{
	const inputs = document.querySelectorAll("#task4 input");
	const select = document.querySelector("#task4 select");
	inputs.forEach(i => 
	{
		i.onchange = check;
	});
	select.onchange = check;
	
	function check()
	{
		let disabled = false;
		inputs.forEach(input => 
		{
			if(input.value.length == 0) 
			{
				disabled = true;
			}
		});
		if(select.selectedIndex == 0 || select.selectedIndex == -1)
		{
			disabled = true;
		}
		const btn = document.querySelector("#task4 button");
		btn.disabled = disabled;
	}
}

function checkMobileNumber(str)
{
	const res = str.match(/^(\+38|38|)(039|050|063|066|067|068|091|092|093|094|095|096|097|098|099)\d{7}$/s);
	if(res == null){
		return false;
	}
	return true;
}

async function lvivIndex(code)
{
	const lviv = "Lviv";
	const url = "https://index.ukrposhta.ua/endpoints-for-apps/index.php?method=get_postoffices_by_postindex&pc=" + code;
	let entry = await fetch(url).then(x => x.json())
							.then(x => x.Entry);
	if(entry === undefined)
	{
		console.log("fetch error: wrong post code - " + code);
		return false;
	}
	console.log(entry.CITY_EN);
	return entry.CITY_EN == lviv;
}

function checkTownNumber(str)
{
	const res = str.match(/^(\(032\)|)\d{3}(-|)\d{2}(-|)\d{2}$/s);
	if(res == null){
		return false;
	}
	return true;
}

function deleteComents(str)
{
	return str.replace(/<!--[a-zA-Z0-9 \.\/-]+-->/gm, "");
}

function deleteTags(str)
{
	return str.replace(/<(\/|)(p|font|br|hr)>/gm, "");
}

function deleteSpaces(str)
{
	return str.replace(/(^ +)|( +$)/gm, "");
}

function checkYear(str)
{
	const num = parseInt(str, 10);
	if(num === NaN)
	{
		return false;
	}
	if(num < 1900 || num > 2099)
	{
		return false;
	}
	return true;
}

// -----
function checkDigits(str)
{/*У циклі перевіряємо всі символи текстового рядка*/
	for(var i=0; i<str.length; i++)
	{
		/*Якщо код символу є меншим за 48 або більшим за 57, то символ не є цифрою, оскільки символ “0” має код 48, символ 9 – код “57”, а коди всіх інших цифр розміщені в інтервалі (49;56)*/

		if(str.charCodeAt(i) <= 47 || str.charCodeAt(i) >57)
		{
			return "This is not a number";
		}
		
		/*Якщо хоч один із символів у рядку не є цифрою, то весь текстовий рядок не є представленням натурального числа, а тому повертаємо висновок, що це не число */

		return "This is a number"; /*Інакше повертаємо висновок, що у текстовому рядку записане число*/
	}
}

var str = "My text"; /*Задаємо текст біжучої стрічки */
var res = 0;
function floatingText()
{
	console.log(str);
	str = str.substring(1,str.length); /* “відщеплюємо” від текстового рядка перший символ*/
	
	if(str.length){ /* якщо в рядку ще є символи */
		res = setTimeout(floatingText(),200); /* викликаємо метод setTimeout*/
	}
	else
	{
		clearTimeout(res); /* відміняємо дію методу setTimeout*/
	}
}

function checkEmail(str) /*текстовий рядок, що підлягає перевірці, передаємо як параметр функції*/

{

if(str.indexOf("@") == -1) /* Якщо символ “@” відсутній, то текстовий рядок явно не є представленням електронної адреси */

     return "E-mail задано неправильно";

if(str.indexOf("@") != str.lastIndexOf("@")) /*Якщо символ “@” зустрічається у текстовому рядку більше, ніж один раз, то текстовий рядок не є електронною адресою*/

     return "E-mail задано неправильно";

if(str.charAt(0) =="@" || str.charAt(str.length-1) == "@") /*Якщо символ “@” зустрічається на початку або в кінці текстового рядка, то рядок не є електронною адресою*/

     return "E-mail задано неправильно";

return "Потрібна додаткова перевірка"; /* Оскільки наразі не виявлено, що електронна адреса задана неправильно, то повертаємо значення "Потрібна додаткова перевірка" */

}

function chDig0(str){ // варік Віті
	const res = str.match(/^(\d+(,|\.)\d+)$/s);
	if(res == null){
		return "Не дійсне число";
	}
	return "Дійсне число";
}

function chDig(str){
	for(var i=0; i<str.length; i++) // перевірка чи взагалі число
	{
		/*Якщо код символу є меншим за 48 або більшим за 57, то символ не є цифрою, оскільки символ “0” має код 48, символ 9 – код “57”, а коди всіх інших цифр розміщені в інтервалі (49;56)*/
		let code = str.charCodeAt(i);
		if(code != 44 && code != 46) // 44 та 46 це кома та крапка, їх пропускаємо
		{
			if( code < 48 || code > 57 )
			{
				return str + " не число";
			}
			/*Якщо хоч один із символів у рядку не є цифрою, то весь текстовий рядок не є представленням натурального числа, а тому повертаємо висновок, що це не число */
		}
	}
	let numbersBeforeComma = 0;
	let numbersOfCommas = 0;
	for(var i=0; i<str.length; i++)
	{
		let code = str.charCodeAt(i);
		if(code == 44 || code == 46) // якщо символ це кома чи крапка
		{
			if(numbersBeforeComma == 0)
			{
				return "Число неправильного формату"; // перед комою немає чисел
			}
			
			if(numbersOfCommas == 0) // дивимся чи у стрічці одна крапка/кома
			{
				numbersOfCommas++;
			} 
			else
			{ // якщо розділювачів більше ніж 1 то це не число
				return "Число неправильного формату";
			}
		}
		
		numbersBeforeComma++;
	}
	
	return "Це дійсне число"; /*Інакше повертаємо висновок, що у текстовому рядку записане число*/
}

function RemSpaces(str)
{
	return str.replace(/ +/g, " "); // (  +) - означає шукати в тексті місця де більше ніж 2 пробіла. 
									// g значить знайти всі такі місця
									// / / - це початок та кінец регулярного виразу
									// а replace замінює всі знайдені місця
}

function checkEmailUpdate(str) /*текстовий рядок, що підлягає перевірці, передаємо як параметр функції*/
{

if(str.indexOf("@") == -1) /* Якщо символ “@” відсутній, то текстовий рядок явно не є представленням електронної адреси */

     return "E-mail задано неправильно";

if(str.indexOf("@") != str.lastIndexOf("@")) /*Якщо символ “@” зустрічається у текстовому рядку більше, ніж один раз, то текстовий рядок не є електронною адресою*/

     return "E-mail задано неправильно";

if(str.charAt(0) =="@" || str.charAt(str.length-1) == "@") /*Якщо символ “@” зустрічається на початку або в кінці текстового рядка, то рядок не є електронною адресою*/

     return "E-mail задано неправильно";
	 
	 if(str.indexOf(".") != -1 && str.indexOf(".") - str.indexOf("@") > 1)
	 {
		 return "Потрібна додаткова перевірка, але крапки розставлено коректно";
	 }
	 else
	 {
		 return "E-mail задано неправильно";
	 }

return "Потрібна додаткова перевірка"; /* Оскільки наразі не виявлено, що електронна адреса задана неправильно, то повертаємо значення "Потрібна додаткова перевірка" */

}

function getDateFormat()
{
	const d = new Date(2020, 04, 14, 13, 33, 0, 0);
	let res = "Сьогодні " + d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes(); 
	console.log(res);
}

function getStringDay(year, mon, day)
{
	const d = new Date(year, mon, day, 0, 0, 0, 0);
	let b = null;
	switch(d.getDay())
	{
		 case 0: b = "Sunday"; break;
		 case 1: b = "Monday"; break;
		 case 2: b = "Tuesday"; break;
		 case 3: b = "Wednesday"; break;
		 case 4: b = "Thursday"; break;
		 case 5: b = "Friday"; break;
		 case 6: b = "Saturday"; break;
	}
	return b;
}

function shDates(year, mon, day, arr)
{
	mon -= 1; // місяці починаються з 0))
	const d = new Date(year, mon, day, 0, 0, 0, 0);
	arr.forEach(item =>
	{
		console.log("It was " + getStringDay(d.getFullYear()-item, mon, day ) + ", " + item + " years ago");
		console.log("----------")
	})
}

function createTimeDif()
{
	const div = document.createElement("div");
	const p = document.createElement("p");
	
	const hour0 = document.createElement("input");
	const hour1 = document.createElement("input");
	const min0 = document.createElement("input");
	const min1 = document.createElement("input");
	hour0.type = hour1.type = min0.type = min1.type = "number";
	
	const ph0 = document.createElement("p");
	const ph1 = document.createElement("p");
	const phText = "Hour: ";
	ph0.innerText = ph1.innerText = phText;
	
	const pm0 = document.createElement("p");
	const pm1 = document.createElement("p");
	const pmText = "Minute: ";
	pm0.innerText = pm1.innerText = pmText;
	
	const b = document.createElement("button");
	b.innerText = "Calculate";
	b.onclick = () => 
	{
		const res = ( parseInt(hour0.value) * 60 +  parseInt(min0.value)) - ( parseInt(hour1.value) * 60 +  parseInt(min1.value))
		p.innerText = "Res = " + res;
	}
	
	div.appendChild(ph0);
	div.appendChild(hour0);
	div.appendChild(pm0);
	div.appendChild(min0);
			  
	div.appendChild(document.createElement("br"));
			  
	div.appendChild(ph1);
	div.appendChild(hour1);
	div.appendChild(pm1);
	div.appendChild(min1);
	
	div.appendChild(document.createElement("br"));
			  
	div.appendChild(b);
	div.appendChild(document.createElement("br"));
	div.appendChild(p);
	
	document.body.appendChild(div);
}

function createHipot()
{
	const div = document.createElement("div");
	const p = document.createElement("p");
	
	const k0 = document.createElement("input");
	const k1 = document.createElement("input");
	k0.type = k1.type = "number";
	
	const p0 = document.createElement("p");
	const p1 = document.createElement("p");
	p0.innerText = p1.innerText = "Katet: ";
	
	const b = document.createElement("button");
	b.innerText = "Calculate";
	b.onclick = () => 
	{
		const h2 = parseInt(k0.value) * parseInt(k0.value) + parseInt(k1.value) * parseInt(k1.value);
		const h = Math.round(Math.sqrt(h2), 2);
		p.innerText = "Hipotenuza = " + h;
	}
	
	div.appendChild(p0);
	div.appendChild(k0);
			  
	div.appendChild(document.createElement("br"));
			  
	div.appendChild(p1);
	div.appendChild(k1);
	
	div.appendChild(document.createElement("br"));
			  
	div.appendChild(b);
	div.appendChild(document.createElement("br"));
	div.appendChild(p);
	
	document.body.appendChild(div);
}

function convertTo2(num){ //num = 1025
	
	let res = "";
		while (num > 2)
		{
			let temp = num % 2; // temp буде 1 або 0 ( 1025 % 2 = 1 )
			num = (num - temp) / 2 // ділимо число для некст ітерації ( (1025 -1) / 2 = 512 ) 
			res = temp + res; // запис результат від ділення по модулю на початок стрічки ( "1" + "" = "1")
		}
	res = num + res; // дописуємо остачу
	return res;
}

function get16Code(code) // перетворення остачі від ділення по модулю на код 16вої системи
{
	switch(code)
	{
		case 0 : return "0";
		case 1 : return "1";
		case 2 : return "2";
		case 3 : return "3";
		case 4 : return "4";
		case 5 : return "5";
		case 6 : return "6";
		case 7 : return "7";
		case 8 : return "8";
		case 9 : return "9";
		case 10: return "A";
		case 11: return "B";
		case 12: return "C";
		case 13: return "D";
		case 14: return "E";
		case 15: return "F";
	}
}

function convertTo16(num){
	const base = 16
	let res = "";
		while (num > base)
		{
			let temp = num % base;
			num = (num - temp) / base;
			res = get16Code(temp) + res; // остачу перетв на 16вий код
		}
	res = get16Code(num) + res;
	return res;
}










