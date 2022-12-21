import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  message = 'An unknown error occurred!';

  constructor() {}

  ngOnInit() {}
}
