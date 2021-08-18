import { Component, Input, Output , EventEmitter } from '@angular/core';
import { LandingPageService } from 'src/app/landing-page/landing-page.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent{

  @Input() compName : string;
  @Input() message : string;
  @Output() close = new EventEmitter<void>();

  constructor(private landingPageService : LandingPageService){}

  onClose(){
    this.close.emit();
  }

  onYes(){
    this.landingPageService.signOut();
  }

}


