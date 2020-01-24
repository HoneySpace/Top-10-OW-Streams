import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { StreamerPlateComponent } from './streamer-plate/streamer-plate.component';
import { StreamerDataService } from './streamer-data.service';

import { HttpClientModule }   from '@angular/common/http';
import { ListOfStreamersComponent } from './list-of-streamers/list-of-streamers.component';
import { HatComponent } from './hat/hat.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, HelloComponent, StreamerPlateComponent, ListOfStreamersComponent, HatComponent ],
  bootstrap:    [ AppComponent ],
  providers: [StreamerDataService]
})
export class AppModule { }
