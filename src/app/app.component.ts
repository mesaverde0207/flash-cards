import { Component } from '@angular/core';
import { IFlash } from './flash.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  flashes: IFlash[] = [{
    question: 'Question 1',
    answer: 'Answer 1',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 2',
    answer: 'Answer 2',
    show: false,
    id: getRandomNumber(),
  }, {
    question: 'Question 3',
    answer: 'Answer 3',
    show: false,
    id: getRandomNumber(),
  }];

  // Used to keep the list efficient in ngFor loop
  trackByFlashId(index: number, flash: IFlash) {
    return flash.id;
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}
