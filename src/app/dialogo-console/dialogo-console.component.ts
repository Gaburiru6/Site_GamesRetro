import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-dialogo-console',
  templateUrl: './dialogo-console.component.html',
  styleUrls: ['./dialogo-console.component.css'],
  imports:[
    MatDialogModule,
  ],
})
export class ConsoleDialogoComponent {
  constructor(public dialogRef: MatDialogRef<ConsoleDialogoComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
