import { Injectable } from '@angular/core';
import { IFlash } from './flash.model';

function getRandomNumber() {
  return Math.floor(Math.random() * 10000);
}

@Injectable({
  providedIn: 'root'
})
export class FlashService {
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

  trackByFlashId(index: number, flash: IFlash) {
    return flash.id;
  }

  addFlash(flash: IFlash) {
    this.flashes.push({
      ...flash,
      show: false,
      id: getRandomNumber(),
    });
  }

  toggleFlash(id: number) {
    const flash = this.flashes.find(flash => flash.id === id);
    flash.show = !flash.show;
  }

  deleteFlash(id: number) {
    const flashId = this.flashes.findIndex(flash => flash.id === id);
    this.flashes.splice(flashId, 1);
  }

  updateFlash(id: number, updatedFlash: IFlash) {
    const flash = this.flashes.find(flash => flash.id === id);
    flash.question = updatedFlash.question;
    flash.answer = updatedFlash.answer;
  }

  rememberedChange(id: number, flag: "correct" | "incorrect") {
    const flash = this.flashes.find(flash => flash.id === id);
    flash.remembered = flag;
    console.log("flag", flash);
  }

  getFlash(id: number): IFlash {
    const flash = this.flashes.find(flash => flash.id === id);
    return flash;
  }
}
