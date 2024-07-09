// import assert from "assert"
// import { Methods } from "../src/methods"
// import { notEqualMessage } from "../const/consts"

// describe("First test", () => {
//     const numberArray = [1, 3, 2, 4, 9, 6, 7, 0];
//     it("Correcct work of asc sort", () => {
//         const actualResult = Methods.sortNumberArray(numberArray, "asc");
//         const expectedReasult = [0, 1, 2, 3, 4, 6, 7, 9];

//     //    expect(actualResult).to.be.equal(expectedReasult)
//         assert.deepEqual(actualResult, expectedReasult, notEqualMessage)
//     })
// })

import assert from "assert"
import { Calculator } from "../src/calculator";

describe('Calculator', () => {
    let calculator:any;

    beforeEach(() => {
        calculator = new Calculator();
    });

    // Положительные тесты
    it('should correctly add two numbers', () => {
        const result = calculator.operate(5, 3, 'add');
        assert.strictEqual(result, 8);
    });

    it('should correctly subtract two numbers', () => {
        const result = calculator.operate(5, 3, 'subtract');
        assert.strictEqual(result, 2);
    });

    it('should correctly multiply two numbers', () => {
        const result = calculator.operate(5, 3, 'multiply');
        assert.strictEqual(result, 15);
    });

    // Отрицательные тесты
    it('should throw an error when dividing by zero', () => {
        assert.throws(() => {
            calculator.operate(5, 0, 'divide');
        }, /Cannot divide by zero/);
    });

    it('should throw an error for invalid operation', () => {
        assert.throws(() => {
            calculator.operate(5, 3, 'invalid');
        }, /Invalid operation/);
    });

    it('should throw an error when non-numeric values are provided', () => {
        assert.throws(() => {
            calculator.operate('a', 'b', 'add');
        });
    });
});
