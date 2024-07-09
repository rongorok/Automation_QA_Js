export class Calculator {
    validateInput(a:any, b:any):any {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error('Invalid input: both arguments must be numbers');
        }
    }
   
    // Метод для сложения
    add(a: number, b: number): number {
        return a + b;
    }

    // Метод для вычитания
    subtract(a: number, b: number): number {
        return a - b;
    }

    // Метод для умножения
    multiply(a: number, b: number): number {
        return a * b;
    }

    // Метод для деления
    divide(a: number, b: number): number {
        if (b === 0) {
            throw new Error('Cannot divide by zero');
        }
        return a / b;
    }

    // Метод для возведения в степень
    power(a: number, b: number): number {
        return Math.pow(a, b);
    }

    // Метод для выполнения операции
    operate(a: number, b: number, operation: string): number {
        switch (operation) {
            case 'add':
                return this.add(a, b);
            case 'subtract':
                return this.subtract(a, b);
            case 'multiply':
                return this.multiply(a, b);
            case 'divide':
                return this.divide(a, b);
            case 'power':
                return this.power(a, b);
            default:
                throw new Error('Invalid operation');
        }
    }
}


const calculator = new Calculator();

// console.log(calculator.operate(5, 3, 'add')); 
// console.log(calculator.operate(5, 3, 'subtract')); 
// console.log(calculator.operate(5, 3, 'multiply')); 
// console.log(calculator.operate(6, 3, 'divide')); 
// console.log(calculator.operate(2, 3, 'power')); 
