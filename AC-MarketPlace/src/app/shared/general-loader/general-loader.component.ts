import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-loader',
  templateUrl: './general-loader.component.html',
  styleUrls: ['./general-loader.component.css']
})
export class GeneralLoaderComponent implements OnInit {

  @Input() msg:string = 'Your request is in progress, Please wait!';
  constructor() { }

  ngOnInit(): void {
  }

}
