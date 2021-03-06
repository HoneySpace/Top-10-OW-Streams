import { Injectable } from "@angular/core";
import { Streamer } from "./streamer";

@Injectable({
  providedIn: "root"
})
export const count = 10;

export class StreamerDataService {
  public Streamers=[];
 

  constructor() {
    
    console.log('Сервис создан');     
    for(let i=0;i<count;i++)
    {      
      this.Streamers.push(new Streamer(i));      
    }
    this.InitObj();   
    setInterval(this.UpdateInfo,60000,this);   
  }  

  public LogIt() {    
    console.log(this);
  }    


  public async InitObj() {
    let p = new Promise((resolve)=>{
        this.SetOWData(resolve);
    })
    p.then(()=>{
      for(let streamer of this.Streamers)
      {
      this.SetUserData(streamer);
      this.SetStreamData(streamer);
      } 
    });    
  }

  public async UpdateInfo(obj:StreamerDataService)
  {
    console.log('Updating...');
    let p = new Promise((resolve)=>{
        obj.SetOWData(resolve);
    })
    p.then(()=>{
      for(let streamer of obj.Streamers)
      {
      obj.SetUserData(streamer);
      obj.SetStreamData(streamer);
      } 
    });
  }

  OverwatchStreams =
    "https://api.twitch.tv/helix/streams/metadata?game_id=488552";
  GetUsers = "https://api.twitch.tv/helix/users";
  GetStreams = "https://api.twitch.tv/helix/streams";
  fetchData = {
    method: "GET",
    headers: {
      "Client-ID": "mqej6d0kd2emxdfxr3mcvnpyk4r0ya"
    }
  };

  //Инфа о трансляции по оверу
  SetOWData( resolve ){
    console.log("Установка OWData");
    fetch(this.OverwatchStreams, this.fetchData).then(response => response.json()).then(response =>
      {
        const data = response;
    console.log(data);
    for(let streamer of this.Streamers)
    {
    let info =data.data[streamer.index];
    streamer.userId = info.user_id;
    streamer.userName = info.user_name;
    if (info.overwatch != null)
      if (info.overwatch.broadcaster.hero != null) {
        streamer.heroName = info.overwatch.broadcaster.hero.name;
        streamer.heroRole = info.overwatch.broadcaster.hero.role;
      }
    streamer.streamURL = "https://www.twitch.tv/"+streamer.userName;
    }   
    console.log("Установка OWData прошла");
        resolve();
      }
    );    
  }
  //Инфа о пользователе?ссылки на изображение
  async SetUserData(streamer: Streamer) {
    console.log("Установка userData");
    const response = await fetch(
      this.GetUsers + "?id=" + streamer.userId,
      this.fetchData
    );
    const data = await response.json();  
    console.log(data);  
    streamer.iconURL = data.data[0].profile_image_url;
    console.log("Установка userData прошла");
  }
  //Инфа о трансляции по оверу
  async SetStreamData(streamer: Streamer) {
    console.log("Установка streamData");
    const response = await fetch(
      this.GetStreams + "?user_id=" + streamer.userId,
      this.fetchData
    );
    const data = await response.json();
    console.log(data);
    let info = data.data[0];
    streamer.language = info.language;
    streamer.title = info.title;
    streamer.viewerCount = info.viewer_count;
    console.log("Установка streamData прошла");
  }

  public GetStreamer(index)
  {
    return this.Streamers[index];
  }
}
