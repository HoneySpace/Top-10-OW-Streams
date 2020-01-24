import { Component, OnInit } from '@angular/core';
import {count} from '../streamer-data.service';

@Component({
  selector: 'app-list-of-streamers',
  templateUrl: './list-of-streamers.component.html',
  styleUrls: ['./list-of-streamers.component.css']
})
export class ListOfStreamersComponent implements OnInit {

  constructor() { }
  
  count = count;
  
  ngOnInit() {
  }

  counter(i: number) {
    return new Array(i);
  }

}