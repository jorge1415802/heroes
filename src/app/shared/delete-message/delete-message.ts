import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogContent, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-message',
  imports: [MatButtonModule,MatDialogContent,MatDialogActions,MatDialogModule],
  templateUrl: './delete-message.html',
  styleUrl: './delete-message.css'
})
export class DeleteMessage {

  dialogRef = inject(MatDialogRef<DeleteMessage>)

  deleteHero() {
    this.dialogRef.close('ok')
  }

}
