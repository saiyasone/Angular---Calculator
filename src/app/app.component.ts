import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  currentNumber = '';
  thinNumber = '';
  calculate = '';
  firstNumber = 0;
  secondNumber = 0;
  isCal = false;
  isFinish = false;
  isPlusMinius = false;

  onInput(val: string) {
    this.currentNumber += val;
    if (this.isCal) {
      this.secondNumber = +this.currentNumber;
    } else {
      this.firstNumber = +this.currentNumber;
    }
  }

  onCalculate(val: string) {
    if (!this.currentNumber) {
      if (this.isCal) {
        return;
      }

      console.log('add first number');
      return;
    }

    this.isCal = true;
    this.thinNumber = `${this.currentNumber} ${val}`;
    if (this.firstNumber !== 0) {
      this.currentNumber = '';
    }
    this.calculate = val;
  }

  onSubmit() {
    if (!this.isCal) {
      return;
    }

    let result = 0;
    switch (this.calculate) {
      case '+':
        result = this.firstNumber + this.secondNumber;
        this.showResult(result);
        break;
      case '-':
        result = this.firstNumber - this.secondNumber;
        this.showResult(result);
        break;
      case 'x':
        result = this.firstNumber * this.secondNumber;
        this.showResult(result);
        break;
      case '/':
        result = this.firstNumber / this.secondNumber;
        this.showResult(result);
        break;

      default:
        break;
    }
  }

  showResult(val: number) {
    this.thinNumber = `${this.firstNumber} ${this.calculate} ${this.secondNumber} =`;
    this.currentNumber = val.toString();
    this.firstNumber = +this.currentNumber;
  }

  onDel() {
    if (!this.currentNumber) {
      this.onReset();
      return;
    }

    this.currentNumber = this.currentNumber.slice(0, -1);
    if (this.isCal) {
      this.secondNumber = +this.currentNumber;
    }
  }

  onTag() {
    if (!this.currentNumber) {
      return;
    }

    this.isPlusMinius = !this.isPlusMinius;
    if (!this.isPlusMinius) {
      if (this.isCal) {
        this.firstNumber = this.firstNumber * -1;
        this.currentNumber = this.firstNumber.toString();
      } else {
        this.secondNumber = this.secondNumber * -1;
        this.currentNumber = this.secondNumber.toString();
      }
    } else {
      this.currentNumber = '-' + this.currentNumber;
      if (this.isCal) {
        this.secondNumber = +this.currentNumber;
        console.log('second Number=> ' + this.secondNumber);
      } else {
        this.firstNumber = +this.currentNumber;
        console.log('first Number=> ' + this.firstNumber);
      }
    }
  }

  onReset() {
    this.isCal = false;
    this.isPlusMinius = false;
    this.currentNumber = '';
    this.thinNumber = '';
    this.firstNumber = 0;
    this.secondNumber = 0;
  }
}
