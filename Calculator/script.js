document.addEventListener('DOMContentLoaded', () => {
    const screen = document.getElementById('screen');
    const buttons = document.querySelectorAll('button');
    
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    function createRipple(event) {
        const button = event.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        
        const diameter = Math.max(rect.width, rect.height);
        const radius = diameter / 2;
        
        ripple.style.width = ripple.style.height = `${diameter}px`;
        ripple.style.left = `${event.clientX - rect.left - radius}px`;
        ripple.style.top = `${event.clientY - rect.top - radius}px`;
        ripple.classList.add('ripple');
        
        const rippleContainer = button.getElementsByClassName('ripple')[0];
        if (rippleContainer) {
            rippleContainer.remove();
        }
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;
            
            if (button.classList.contains('number')) {
                // Handle number input
                if (value === '.' && currentInput.includes('.')) return;
                currentInput += value;
                screen.value = currentInput;
            }
            
            else if (button.classList.contains('operator')) {
                // Handle operator input
                if (currentInput === '') return;
                
                // Handle percentage immediately if % is clicked
                if (value === '%') {
                    currentInput = (parseFloat(currentInput) / 100).toString();
                    screen.value = currentInput;
                    return;
                }
                
                if (previousInput !== '') {
                    calculate();
                }
                operation = value;
                previousInput = currentInput;
                currentInput = '';
            }
            
            else if (button.classList.contains('equals')) {
                // Handle equals
                if (currentInput === '' || previousInput === '') return;
                calculate();
                operation = null;
                previousInput = '';
            }
            
            else if (button.classList.contains('clear')) {
                // Clear all
                currentInput = '';
                previousInput = '';
                operation = null;
                screen.value = '';
            }
            
            else if (button.classList.contains('delete')) {
                // Delete last character
                currentInput = currentInput.slice(0, -1);
                screen.value = currentInput;
            }
        });
    });
    
    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;
        
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    return;
                }
                result = prev / current;
                break;
            case '%':
                result = prev * (current / 100);
                break;
            default:
                return;
        }
        
        // Add animation when displaying result
        screen.style.transform = 'scale(1.05)';
        screen.style.backgroundColor = '#e6ffe6';
        
        setTimeout(() => {
            screen.style.transform = 'scale(1)';
            screen.style.backgroundColor = '#fff';
        }, 200);
        
        currentInput = result.toString();
        screen.value = currentInput;
    }
}); 