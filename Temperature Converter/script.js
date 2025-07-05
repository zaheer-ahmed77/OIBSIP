let selectedUnit = 'celsius';
        
function selectUnit(unit) {
selectedUnit = unit;
            
document.querySelectorAll('.unit-option').forEach(opt => {
opt.classList.remove('selected');
});
            
document.getElementById(unit).classList.add('selected');
}
        
        
function convertTemperature() {
const input = document.getElementById('temperature');
const error = document.getElementById('error-message');
const resultDiv = document.getElementById('result');
const resultValue = document.getElementById('result-value');
            
            
if (input.value === '' || isNaN(input.value)) {
input.classList.add('error');
error.style.display = 'block';
resultDiv.style.display = 'none';
return;
}
            
       
input.classList.remove('error');
error.style.display = 'none';
            
const temperature = parseFloat(input.value);
let convertedTemp, unitSymbol;
            
            
switch(selectedUnit) {
case 'celsius':
convertedTemp = {
fahrenheit: (temperature * 9/5) + 32,
kelvin: temperature + 273.15
};
resultValue.innerHTML = `${convertedTemp.fahrenheit.toFixed(2)} °F<br>${convertedTemp.kelvin.toFixed(2)} K`;
break;

                    
case 'fahrenheit':
convertedTemp = {
celsius: (temperature - 32) * 5/9,
kelvin: (temperature - 32) * 5/9 + 273.15
};
resultValue.innerHTML = `${convertedTemp.celsius.toFixed(2)} °C<br>${convertedTemp.kelvin.toFixed(2)} K`;
break;
                    

case 'kelvin':
convertedTemp = {
celsius: temperature - 273.15,
fahrenheit: (temperature - 273.15) * 9/5 + 32
};
resultValue.innerHTML = `${convertedTemp.celsius.toFixed(2)} °C<br>${convertedTemp.fahrenheit.toFixed(2)} °F`;
break;
}
            
resultDiv.style.display = 'block';
}
selectUnit('celsius');
    