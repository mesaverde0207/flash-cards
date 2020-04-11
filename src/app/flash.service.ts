import { Injectable } from '@angular/core';
import { IFlash } from './flash.model';
import { BehaviorSubject } from 'rxjs';

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

  flashes$ = new BehaviorSubject<IFlash[]>(this.flashes);

  trackByFlashId(index: number, flash: IFlash) {
    return flash.id;
  }

  addFlash(flash: IFlash) {
    this.flashes = [
      ...this.flashes, {
        ...flash,
        show: false,
        id: getRandomNumber(),
      }
    ];
    this.flashes$.next(this.flashes);
  }

  toggleFlash(id: number) {
    const index = this.flashes.findIndex(flash => flash.id === id);
    this.flashes = [
      ...this.flashes.slice(0, index),
      {
        ...this.flashes[index],
        show: !this.flashes[index].show
      },
      ...this.flashes.slice(index+1)
    ];
    this.flashes$.next(this.flashes);
  }

  deleteFlash(id: number) {
    const flashId = this.flashes.findIndex(flash => flash.id === id);
    this.flashes = [
      ...this.flashes.slice(0, flashId),
      ...this.flashes.slice(flashId+1)
    ];
    this.flashes$.next(this.flashes);
  }

  updateFlash(id: number, updatedFlash: IFlash) {
    const index = this.flashes.findIndex(flash => flash.id === id);
    this.flashes = [
      ...this.flashes.slice(0, index),
      {
        ...this.flashes[index],
        question: updatedFlash.question,
        answer: updatedFlash.answer,
      },
      ...this.flashes.slice(index+1)
    ];
    console.log("update: ", this.flashes);
    this.flashes$.next(this.flashes);
  }

  rememberedChange(id: number, flag: "correct" | "incorrect") {
    const index = this.flashes.findIndex(flash => flash.id === id);
    this.flashes = [
      ...this.flashes.slice(0, index),
      {
        ...this.flashes[index],
        remembered: flag
      },
      ...this.flashes.slice(index+1)
    ];
    this.flashes$.next(this.flashes);
  }

  getFlash(id: number): IFlash {
    const flash = this.flashes.find(flash => flash.id === id);
    return flash;
  }
}
