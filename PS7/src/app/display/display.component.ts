import { Component, OnInit, Input } from '@angular/core';
import { DbServiceService } from '../db-service.service'
import { SeachFormComponent } from '../seach-form/seach-form.component'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {


  constructor(private db: DbServiceService) {
  }
  @Input() data: object;

  ngOnInit() {
  }

}
