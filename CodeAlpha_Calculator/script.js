let display = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
buttons.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
let currentInput = '';
function handleClick(event) {
    const buttonValue = event.target.innerHTML;

    if (buttonValue === 'DEL') {
        currentInput = currentInput.slice(0, -1);
    } else if (buttonValue === 'AC') {
        currentInput = '';
    } else if (buttonValue === '=') {
        try {
            currentInput = eval(currentInput);
        } catch (error) {
            currentInput = 'Error';
        }
    } else if (buttonValue === '%') {
        currentInput += '/100';
        try {
            currentInput = eval(currentInput);
        } catch (error) {
            currentInput = 'Error';
        }
    } else {
        currentInput += buttonValue;
    }

    display.value = currentInput;
}