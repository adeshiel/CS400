/// <reference types="@types/googlemaps" />
import { Component, OnInit, Input, Renderer2, Inject, ViewChild } from '@angular/core';
import { DbServiceService } from '../db-service.service'
import { SeachFormComponent } from '../seach-form/seach-form.component'
import { } from "googlemaps"



@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  public marks: any;

  constructor(private renderer: Renderer2, private db: DbServiceService) {
  }
  @Input() data: object[];
  @ViewChild('gmap', {static: false}) gmapElement: any;
  map: google.maps.Map;
  gatherMarks() :object[] {
    let latlongs = [];
    for(let i=0; i < this.data.length; i++){
      this.data[i]._embedded.venues.forEach((item, index) => {
        console.log("Iter" + i + ": ", item)
        latlongs.push(item.location);
      })
    }
    console.log(typeof latlongs, "LatLongs:", latlongs)

    return latlongs
  }
  makeMap() :void {
    let heat = [];
    let avg_lat :number = 0;
    let avg_long :number = 0;
    this.marks.forEach((item, index) => {
      avg_lat += Number(item.latitude);
      avg_long += Number(item.longitude);
      heat.push(new google.maps.LatLng(item.latitude, item.longitude))
    })
    console.log("ALong", avg_long)
    avg_lat = avg_lat / this.marks.length;
    avg_long = avg_long / this.marks.length;
    let map_prop = {
      zoom: 2,
      center: new google.maps.LatLng(avg_lat, avg_long),
      mapTypeId: 'terrain'
    }

    this.map = new google.maps.Map(this.gmapElement.nativeElement, map_prop)
    let heatmap = new google.maps.visualization.HeatmapLayer({
      data: heat
    });
    heatmap.setMap(this.map);
  }
  ngOnChanges(changes) {
      this.marks = this.gatherMarks()
      console.log("Marks:", this.marks)
      this.makeMap()
    }

  ngOnInit() {

  }


}
