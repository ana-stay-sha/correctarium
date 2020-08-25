let buttonOrder = document.querySelector('.common-button');
let count = document.querySelector('.count')
let symbols = document.querySelector('.symbols');
let price = document.querySelector('.price');
let time = document.querySelector('.time');
let changeLanguage = document.querySelectorAll('input[name="language"]');
let downloadFile = document.querySelector('.input');
let formatOfFiles = document.querySelector('.input').accept.replace(/\s+/g, '').split('.');
let text = document.querySelector('.text-area');

// скрыть блок
document.querySelector('.area').oninput = function(){
  document.querySelector('.download').hidden = true;
}

// загрузить файл (только .txt)
downloadFile.onchange = function(){
  let reader = new FileReader();
  reader.onload = function() {
    text.value = this.result;
  };
  reader.readAsText(this.files[0]);
  reader.onerror = function() {
    console.log(reader.error);
  };
}

// условный файл
let downoaledFile = "filename.txt",
parts, ext = ( parts = downoaledFile.split("/").pop().split(".") ).length > 1 ? parts.pop() : "";


for (let i = 0; i < changeLanguage.length; i++) {
    changeLanguage[i].addEventListener('change', function() {
      let text = document.querySelector('.text-area');
      let leadTime = 0;
      let leadTimeInHours = 0;
      let mainPrice = 0;
      
      text = text.value;
      let textLength = text.length;
      symbols.textContent = textLength;
      
        for (i = 0; i < changeLanguage.length; i++) {
          if (changeLanguage[i].checked && changeLanguage[i].value === 'ua' || changeLanguage[i].value === 'ru'){
            if (ext == "doc" || ext == "docx"  || ext == "rtf"){
              mainPrice = (text.length * 0.05).toFixed(2);
              leadTime = (30 + (textLength * 60 / 1333)).toFixed(0);// время на выполнение + 30 мин
            }
            else{
              mainPrice = ((text.length * 0.05) + ((text.length * 0.05) / 100 * 20)).toFixed(2);
              leadTime = (30 + ((textLength * 60 / 1333) + ((textLength * 60 / 1333) / 100 * 20))).toFixed(0);
            }
             
            leadTimeInHours = (leadTime / 60).toFixed(2);// считаем сколько часов
            leadTimeInHours = ((leadTimeInHours/50).toFixed(2))*50; // округляем до половин часа
          }
          else if (changeLanguage[i].checked && changeLanguage[i].value === 'en'){
            if (ext == "doc" || ext == "docx"  || ext == "rtf"){
              mainPrice = (text.length * 0.12).toFixed(2);
              leadTime = (30 + (textLength * 60 / 333)).toFixed(0);
            }
            else{
              mainPrice = ((text.length * 0.12) + ((text.length * 0.12) / 100 * 20)).toFixed(2);
              leadTime = (30 + ((textLength * 60 / 333) + ((textLength * 60 / 333) / 100 * 20))).toFixed(0);
            }
            leadTimeInHours = (leadTime / 60).toFixed(2);
            leadTimeInHours = ((leadTimeInHours/50).toFixed(2))*50;
          }
        }
        mainPrice < 50 ? mainPrice = 50 : mainPrice;
        leadTime < 1 ? leadTime = 1 : leadTime;
        time.textContent = `Термін виконання: ${leadTimeInHours} год.`
        price.textContent = mainPrice + ' грн';
        });
}