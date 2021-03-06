import { Component, ViewChild, Input, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IFlash } from './flash.model';
import { FlashService } from './flash.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  @ViewChild('flashForm', { static: true }) flashForm: NgForm;
  flash: IFlash = {
    id: -1,
    question: '',
    answer: '',
    show: false,
  }
  flashes$: Observable<IFlash[]>;
  editing = false;
  private editingId: number;

  constructor(private flashService: FlashService) { }

  ngOnInit() {
    this.flashes$ = this.flashService.flashes$;
  }

  // Used to keep the list efficient in ngFor loop
  trackByFlashId(index: number, flash: IFlash) {
    return flash.id;
  }

  handleToggleCard(id: number) {
    this.flashService.toggleFlash(id);
  }

  handleDelete(id: number) {
    this.flashService.deleteFlash(id);
  }

  handleEdit(id: number) {
    let editingFlash = this.flashService.getFlash(id);
    this.flash.answer = editingFlash.answer;
    this.flash.question = editingFlash.question;
    this.editing = true;
    this.editingId = id;
  }

  handleUpdate() {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }

  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }

  handleRememberedChange({id, flag}) {
    this.flashService.rememberedChange(id, flag);
  }

  handleSubmit() {
    this.flashService.addFlash(this.flash);
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