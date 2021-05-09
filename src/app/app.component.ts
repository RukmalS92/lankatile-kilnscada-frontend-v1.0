import { Component } from '@angular/core';
import { AppServiceService } from './app-service/app-service.service';

/**
 * in angular always the relevant services run when on its child component is running
 * here when one component had instantiated the service and if service uses the same service by else component
 * then earlier srvice instance will be shared if not lazy-loaded
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kilnScadaV1';

  constructor(private appservice : AppServiceService) {}
}
