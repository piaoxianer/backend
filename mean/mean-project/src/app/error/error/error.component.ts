import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
  dataMessage = '';
  // message = 'An unknown error occurred!';
  // Angular dependency injection system uses @Inject to identify this data you're passing around.
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
