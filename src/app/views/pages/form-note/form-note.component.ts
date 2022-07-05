import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from 'src/app/services/note.service';
import { Subscription } from 'rxjs';
import { Note } from 'src/app/services/@types/note';

@Component({
  selector: 'app-form-note',
  templateUrl: './form-note.component.html',
  styleUrls: ['./form-note.component.css'],
})

export class FormNoteComponent implements OnInit {
  title = 'FIAP NOTES';
  logoImage = '/assets/logo.png';

  checkoutForm: FormGroup;
  subscription: Subscription;

  noteToEdit = {} as Note;

  constructor(private formBuilder: FormBuilder, private noteService: NoteService) {
    this.checkoutForm = this.formBuilder.group({
      textNote: ['', [Validators.required, Validators.minLength(5)]],
    });

    this.subscription = this.noteService.editNoteProvider.subscribe({
      next: (note: Note) => {
        this.noteToEdit = note;
        this.checkoutForm.setValue({ textNote : note.text });
      },
      error: () => {}
    });
  }

  ngOnInit(): void {}

  sendNote() {
    if (this.checkoutForm.valid) {
      const edit = !!this.noteToEdit.id;
      if (edit) {
        this.editNote();
      } else {
        this.newNote();
      }
    }
  }

  newNote() {
    this.noteService.postNotes(this.checkoutForm.value.textNote).subscribe({
      next: (note) => {
        this.checkoutForm.reset();
        this.noteService.notifyNewNote(note);
      },
      error: (error) => alert("Ops! Algo deu errado." + error),
      complete: () => alert("Inclusão realizada")
    });
  }

  editNote() { 
    this.noteToEdit.text = this.checkoutForm.value.textNote;    
    this.noteService.editNote(this.noteToEdit).subscribe({
      next: () => {
        this.checkoutForm.reset();
        this.noteToEdit = {} as Note;
      },
      error: (error) => alert("Ops! Algo deu errado." + error),
      complete: () => alert("Alteração realizada!")
    });
  }

  get textNote() {
    return this.checkoutForm.get('textNote');
  }
}