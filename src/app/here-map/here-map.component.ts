import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';

declare var H: any;

@Component({
  selector: 'here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss'],
})
export class HereMapComponent implements OnInit {

  @ViewChild('map')
  public mapElement: ElementRef;

  @Input()
  public appId: any;

  @Input()
  public appCode: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  constructor() { }

  ngOnInit() {}

  // tslint:disable-next-line:use-life-cycle-interface
  public ngAfterViewInit() {
    const platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(
        this.mapElement.nativeElement,
        defaultLayers.normal.map,
        {
          zoom: 10,
          center: { lat: this.lat, lng: this.lng }
        },
    );
    const icon = new H.map.Icon('/assets/images/logo-no-write.png', {size: {w: 56, h: 64}});
    const marker = new H.map.Marker({ lat: this.lat, lng: this.lng}, { icon });
    map.addObject(marker);
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  }

  /*addMarkersToMap(map) {
    var parisMarker = new H.map.Marker({lat:48.8567, lng:2.3508});
    map.addObject(parisMarker);

    var romeMarker = new H.map.Marker({lat:41.9, lng: 12.5});
    map.addObject(romeMarker);

    var berlinMarker = new H.map.Marker({lat:52.5166, lng:13.3833});
    map.addObject(berlinMarker);

    var madridMarker = new H.map.Marker({lat:40.4, lng: -3.6833});
    map.addObject(madridMarker);

    var londonMarker = new H.map.Marker({lat:51.5008, lng:-0.1224});
    map.addObject(londonMarker);
  }*/

}
