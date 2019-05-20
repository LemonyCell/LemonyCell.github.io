window.addEventListener('load', function(){
  const obj = new Addition();
  window.objHtml = obj.html.bind(obj);
});
