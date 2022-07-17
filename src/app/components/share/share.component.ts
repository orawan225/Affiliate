import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { product } from 'src/app/models/product';
import { CallApiService } from 'src/app/services/call-api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  constructor(private callApi: CallApiService, private fb: FormBuilder) { 

  }


  ngOnInit(): void {
  }


}
