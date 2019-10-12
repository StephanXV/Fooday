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

}
