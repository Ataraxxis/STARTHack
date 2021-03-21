import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  constructor(public dataservice: DataService, private router: Router) { }

  ngOnInit() {
  }

  showdetails(file: string) {
    console.log(file)
    this.dataservice.setactivedataset(file);
    this.router.navigateByUrl("/track");
  }

}
