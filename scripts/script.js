const MUL = '\u00D7';
const DIV = '\u00F7';

const screen = document.querySelector('.calc-screnn p');
const clearButton = document.querySelector('.btn.ac');

clearButton.addEventListener('click', () => {
  screen.textContent = '0';
});

const buttons = document.querySelectorAll('.btn:not(.ac)');

const binaryOperators = ['+', '-', MUL, DIV];

const handleOperation = (operation, buttonText) => {
  const last = screen.textContent.charAt(screen.textContent.length - 1);
  if (binaryOperators.includes(last)) {
    return;
  }

  if (last === '.') {
    screen.textContent = screen.textContent.slice(0, -1);
  }

  switch (operation) {
    case '=':
      try {
        const parsed = screen.textContent.replace(MUL, '*').replace(DIV, '/');
        const result = eval(parsed);
        screen.textContent = result;
      } catch (error) {
        screen.textContent = 'Error';
      }
      break;

    case 'reverse':
      screen.textContent = parseFloat(screen.textContent) * -1;
      break;

    case '%':
      screen.textContent = parseFloat(screen.textContent) / 100;
      break;

    default:
      screen.textContent += buttonText; 
      break;
  }
}

buttons.forEach(button => {
  const operation = button.getAttribute('data-op') || '';

  button.addEventListener('click', () => {
    const buttonText = button.textContent;

    if (operation && screen.textContent !== 'Error') {
      handleOperation(operation, buttonText);
    } else if (
      (screen.textContent === '0' && buttonText !== '.') || 
      screen.textContent === 'Error'
    ) {
      screen.textContent = buttonText;
    } else {
      screen.textContent += buttonText;
    }
  });
});
