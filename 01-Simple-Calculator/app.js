// app.js
document.addEventListener("DOMContentLoaded", () => {
  const btnCalculate = document.getElementById("btn");
  const inputNum1 = document.getElementById("num1");
  const inputNum2 = document.getElementById("num2");
  const selectOperator = document.getElementById("selectOp");
  const displayResult = document.querySelector(".result");
  const displayHistory = document.getElementById("historyLabel");

  /**
   * Performs the mathematical operation based on the selected operator.
   * @param {number} a First operand
   * @param {number} b Second operand
   * @param {string} operator The mathematical operator
   * @returns {number} The calculation result
   */
  const calculateOperation = (a, b, operator) => {
    switch (operator) {
      case "plus":
        return a + b;
      case "minus":
        return a - b;
      case "divide":
        // Edge case: division by zero
        if (b === 0) throw new Error("Cannot divide by zero");
        return a / b;
      case "multiply":
        return a * b;
      default:
        throw new Error("Invalid operator");
    }
  };

  /**
   * Formats the operator strings into readable symbols.
   */
  const formatOperator = (operator) => {
    const symbols = {
      plus: "+",
      minus: "-",
      divide: "/",
      multiply: "×"
    };
    return symbols[operator] || "";
  };

  btnCalculate.addEventListener("click", () => {
    // Reset visual errors
    displayResult.classList.remove("error");

    // Extract inputs safely
    const val1 = inputNum1.value.trim();
    const val2 = inputNum2.value.trim();
    const operator = selectOperator.value;

    // Validate inputs
    if (!val1 || !val2) {
      displayResult.classList.add("error");
      displayResult.textContent = "Err: Empty fields";
      displayHistory.textContent = "Please provide both numbers";
      return;
    }

    const num1 = Number(val1);
    const num2 = Number(val2);

    if (isNaN(num1) || isNaN(num2)) {
      displayResult.classList.add("error");
      displayResult.textContent = "Err: Invalid inputs";
      displayHistory.textContent = "Numbers must be valid";
      return;
    }

    // Execute logic
    try {
      let finalResult = calculateOperation(num1, num2, operator);
      
      // Floating-point bug fix (e.g. 0.1 + 0.2 in JS)
      finalResult = Math.round(finalResult * 1000000) / 1000000;
      
      displayResult.textContent = finalResult;
      displayHistory.textContent = `${num1} ${formatOperator(operator)} ${num2}`;
    } catch (err) {
      displayResult.classList.add("error");
      displayResult.textContent = "Err: Math";
      displayHistory.textContent = err.message;
    }
  });
});
