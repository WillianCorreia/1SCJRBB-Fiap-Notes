import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Note } from 'src/app/services/@types/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input()
  noteProp = {} as Note;

  @Input()
  titleProp: any;

  @Output()
  notifyRemove = new EventEmitter();

  @Output()
  notifyEdit = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  confirmRemove(){
    if(confirm("Deseja realmente apagar?")) {
      this.notifyRemove.emit();
    }
  }

  editNote() {
    this.notifyEdit.emit();
  }
}