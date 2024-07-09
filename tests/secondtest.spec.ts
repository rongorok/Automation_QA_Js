import { Calculator } from "../src/calculator";

describe('Calculator', () => {
    let calculator:any;

    beforeEach(() => {
        calculator = new Calculator();
    });

    // Положительные тесты
    test('should correctly add two numbers', () => {
        expect(calculator.operate(5, 3, 'add')).toBe(8);
    });

    test('should correctly subtract two numbers', () => {
        expect(calculator.operate(5, 3, 'subtract')).toBe(2);
    });

    test('should correctly multiply two numbers', () => {
        expect(calculator.operate(5, 3, 'multiply')).toBe(15);
    });

    test('should correctly divide two numbers', () => {
        expect(calculator.operate(6, 3, 'divide')).toBe(2);
    });

    test('should correctly power a number', () => {
        expect(calculator.operate(2, 3, 'power')).toBe(8);
    });

    
    // Отрицательные тесты
    test('should throw an error when dividing by zero', () => {
        expect(() => calculator.operate(5, 0, 'divide')).toThrow('Cannot divide by zero');
    });

    test('should throw an error for invalid operation', () => {
        expect(() => calculator.operate(5, 3, 'invalid')).toThrow('Invalid operation');
    });

    test('should throw an error when non-numeric values are provided for addition', () => {
        expect(() => calculator.operate('a', 3, 'add')).toThrow('Invalid input: both arguments must be numbers');
        expect(() => calculator.operate(3, 'b', 'add')).toThrow('Invalid input: both arguments must be numbers');
    });

    test('should throw an error when non-numeric values are provided for subtraction', () => {
        expect(() => calculator.operate('a', 3, 'subtract')).toThrow('Invalid input: both arguments must be numbers');
        expect(() => calculator.operate(3, 'b', 'subtract')).toThrow('Invalid input: both arguments must be numbers');
    });

    test('should throw an error when non-numeric values are provided for multiplication', () => {
        expect(() => calculator.operate('a', 3, 'multiply')).toThrow('Invalid input: both arguments must be numbers');
        expect(() => calculator.operate(3, 'b', 'multiply')).toThrow('Invalid input: both arguments must be numbers');
    });

    test('should throw an error when non-numeric values are provided for division', () => {
        expect(() => calculator.operate('a', 3, 'divide')).toThrow('Invalid input: both arguments must be numbers');
        expect(() => calculator.operate(3, 'b', 'divide')).toThrow('Invalid input: both arguments must be numbers');
    });

    test('should throw an error when non-numeric values are provided for power', () => {
        expect(() => calculator.operate('a', 3, 'power')).toThrow('Invalid input: both arguments must be numbers');
        expect(() => calculator.operate(3, 'b', 'power')).toThrow('Invalid input: both arguments must be numbers');
    });
});