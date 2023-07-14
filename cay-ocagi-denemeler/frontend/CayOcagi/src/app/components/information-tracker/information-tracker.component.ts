import { Component } from '@angular/core';

@Component({
  selector: 'app-information-tracker',
  templateUrl: './information-tracker.component.html',
  styleUrls: ['./information-tracker.component.css']
})
export class InformationTrackerComponent {

 
  kcals = new Map<string, number>([
    ['Sade Türk Kahvesi', 7],
    ['Şekerli Türk Kahvesi',42],
    ['Orta Türk Kahvesi ', 17],
    ['Ihlamur',11], 
    ['Normal Çay',0], 
    ['Açık Çay',0], 
    ['Filtre Kahve',4],
    
  ]);

  caffeine = new Map<string, number>([
    ['Sade Türk Kahvesi', 7],
    ['Şekerli Türk Kahvesi',42],
    ['Orta Türk Kahvesi ', 17],
    ['Ihlamur',11], 
    ['Normal Çay',0], 
    ['Açık Çay',0], 
    ['Filtre Kahve',4],
    
  ]);


}
