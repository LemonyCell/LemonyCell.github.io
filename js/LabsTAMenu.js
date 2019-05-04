window.onload = function(){
    const buttons = document.querySelectorAll("div ul button");
    console.log("find buttons", buttons);
    const iframe = document.getElementsByTagName("iframe")[0];
	for(let i=0; i<buttons.length; i++){
        buttons[i].addEventListener("click", function(){
            console.log("value : ", buttons[i].value);
            iframe.src = buttons[i].value;
        });
    }
    console.log("add listener", buttons);
}