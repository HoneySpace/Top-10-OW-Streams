import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { StreamerDataService } from '../streamer-data.service';


@Component({
  selector: 'app-streamer-plate',
  templateUrl: './streamer-plate.component.html',
  styleUrls: ['./streamer-plate.component.css']
})
export class StreamerPlateComponent implements OnInit {
  
  @Input() index;
  updateTime =1000;
  
  userId;
  userName: Observable<string>; 
  heroName: Observable<string>;
  heroRole: Observable<string>;  
  viewerCount: Observable<number>;
  title: Observable<string>;
  iconURL: Observable<string>;
  language: Observable<string>;

    constructor(private SDataService: StreamerDataService) {}

  ngOnInit() {     
    this.setInfo();        
  }     

  setInfo()
  {    
    this.userName = Observable.create(observer =>setInterval(() => observer.next(this.SDataService.GetStreamer(this.index).userName), this.updateTime));
    this.iconURL = Observable.create(observer =>setInterval(() => observer.next(this.SDataService.GetStreamer(this.index).iconURL), this.updateTime));
    this.title = Observable.create(observer =>setInterval(() => observer.next(this.SDataService.GetStreamer(this.index).title), this.updateTime));
    this.viewerCount = Observable.create(observer =>setInterval(() => observer.next(this.SDataService.GetStreamer(this.index).viewerCount), this.updateTime));
    this.language = Observable.create(observer =>setInterval(() => observer.next(this.SDataService.GetStreamer(this.index).language), this.updateTime));
    this.heroRole = Observable.create(observer =>setInterval(() => observer.next(this.SDataService.GetStreamer(this.index).heroRole), this.updateTime));
    this.heroName = Observable.create(observer =>setInterval(() => observer.next(this.SDataService.GetStreamer(this.index).heroName), this.updateTime));
  }

  GoToStream()
  {
    window.open(this.SDataService.GetStreamer(this.index).streamURL,"_self");
  }

  
 

}