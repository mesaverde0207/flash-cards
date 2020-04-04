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

  private editing = false;
  private editingId: number;

  // Used to keep the list efficient in ngFor loop
  trackByFlashId(index: number, flash: IFlash) {
    return flash.id;
  }

  handleToggleCard(id: number) {
    const flash = this.flashes.find(flash => flash.id === id);
    flash.show = !flash.show;
  }

  handleDelete(id: number) {
    const flashId = this.flashes.findIndex(flash => flash.id === id);
    this.flashes.splice(flashId, 1);
  }

  handleEdit(id: number) {
    this.editing = true;
    this.editingId = id;
    // TODO: Add editing logic after adding the form
  }

  handleRememberedChange({id, flag}) {
    const flash = this.flashes.find(flash => flash.id === id);
    flash.remembered = flag;
    console.log("flag", flash);
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}
