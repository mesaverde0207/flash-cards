import { Component, ViewChild, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IFlash } from './flash.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('flashForm', { static: true }) flashForm: NgForm;
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

  flash: IFlash = {
    id: -1,
    question: '',
    answer: '',
    show: false,
  }

  editing = false;
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
    const flash = this.flashes.find(flash => flash.id === id);
    // this.flash = flash;  // this causes some kind of call-by-reference
    this.flash.answer = flash.answer;
    this.flash.question = flash.question;
  }

  handleUpdate() {
    const flash = this.flashes.find(flash => flash.id === this.editingId);
    flash.question = this.flash.question;
    flash.answer = this.flash.answer;
    this.handleCancel();
  }

  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

  handleRememberedChange({id, flag}) {
    const flash = this.flashes.find(flash => flash.id === id);
    flash.remembered = flag;
    console.log("flag", flash);
  }

  handleSubmit() {
    this.flash.id = getRandomNumber();
    this.flashes.push(this.flash);
    this.handleClear();
  }

  handleClear() {
    this.flash = {
      id:  -1,
      question: '',
      answer: '',
      show: false,
    };
    this.flashForm.reset();
  }
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}
