import { Component, OnInit } from '@angular/core';
import {DbServiceService} from '../db-service.service'
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-seach-form',
  templateUrl: './seach-form.component.html',
  styleUrls: ['./seach-form.component.css']
})
export class SeachFormComponent implements OnInit {
  inputForm;

  processForm(form) :void {
    this.db.newSearch(form).subscribe( );
    this.inputForm.reset();
  }
  constructor(private db: DbServiceService, private formBuilder: FormBuilder) {}

  ngOnInit() {
  }

}
