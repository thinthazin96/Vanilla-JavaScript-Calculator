
 class Calculator {
  //  The two parameters of the constructor is what will display as output on calculator
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear() // call this function to clear everything by default once the calculator app starts
  }

  // This function clear the display when the user presses AC
  clear() {
    this.currentOperand = '' //assign the empty string in currentOperand to set clear
    this.previousOperand = '' //assign the empty string in previousOperand to set clear
    this.operation = undefined //assign undefined in operation to set clear
  }

  // This function delete a number when the user presses DEL
  delete() {
    //cast the currentOperand to string and chop from 0 to the second before last (-1) and store it in currentOperand
    this.currentOperand = this.currentOperand.toString().slice(0, -1) // Think of a number delete backwards in calculator
  }

  // This function add a number every time the user click on the number on calculator app
  appendNumber(number) {
    //To allow only decimal operand in calculation, check if the number is already decimal and it's already has a decimal
    if (number === '.' && this.currentOperand.includes('.')) return //if yes, stop the execution and return it and continue to append number.
    this.currentOperand = this.currentOperand.toString() + number.toString() //convert currentOperand and number to string to avoid arithmetic calculation in JS.
  }

  chooseOperation(operation) {
    //Check the currentOperand is empty
    if (this.currentOperand === '') return //if yes, execution the code and return to prevent the further action to continue.
    //Check is there previous input and operation
    if (this.previousOperand !== '') {
      this.compute() //if yes, call compute to do the computation.
    }
    this.operation = operation //store whatever operation user presses in operation
    this.previousOperand = this.currentOperand //store the currentOperand in previousOperand bcz we're done typing in
    this.currentOperand = '' //reset the currentOperand to empty string string to clear out the value
  }

  // This function compute the user input and return the result
  compute() {
    let computation //create a variable to store the result
    const prev = parseFloat(this.previousOperand) //convert the previousOperand from string to float and stroe in variable
    const current = parseFloat(this.currentOperand) //convert the currentOperand from string to float and stroe in variable
    //if the prev or the current does not contain value,
    if (isNaN(prev) || isNaN(current)) return //if yes, stop execution by returning
    switch (this.operation) { //if not, check these cases
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default: // if none of those operation, just stop execution by returning.
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString() //parse the number to string
    const integerDigits = parseFloat(stringNumber.split('.')[0])//split the string at '.' and take the front one and parse it into float and store in variable
    const decimalDigits = stringNumber.split('.')[1] //split the string at '.' and take the last one and store it in variable
    let integerDisplay //create a variable to store the result
    if (isNaN(integerDigits)) {//if the user input is not a number, (eg. '.)
      integerDisplay = '' //return the empty string
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 }) //convert it string and macimumFractionDigits help not to have follow up zero after parsing into string with commas
    }
    if (decimalDigits != null) { //if the user enter a decimal and along with a number after it,
      return `${integerDisplay}.${decimalDigits}`
    } else { //if decimal is not entered
      return integerDisplay //return integer
    }
  }

  // This function update the output after the calculation is done
  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//create an calculator object using Calculator class. Pass constructor as Calculator class parameters.
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

//loop through each button in numberButtons list
numberButtons.forEach(button => {
  //add EventListener to each button on every click
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText) //add the number that is inside that button to the calculator
    calculator.updateDisplay() //call this function to update the display
  })
})

//loop through each button in operationButtons list
operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

//add click EventListener in equalsButton
equalsButton.addEventListener('click', button => {
  calculator.compute() //in button, call compute function to do computation
  calculator.updateDisplay() //Update the display after computation by call updateDisplay function
})

//add click EventListener in allClearButton
allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

//add click EventListener in deleteButton
deleteButton.addEventListener('click', button => {
  calculator.delete() //every DEL click will delete the last element in string
  calculator.updateDisplay()
})