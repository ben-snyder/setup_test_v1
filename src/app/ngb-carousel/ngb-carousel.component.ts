import { Component, OnInit } from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ngb-carousel',
  templateUrl: './ngb-carousel.component.html',
  styleUrls: ['./ngb-carousel.component.css']
})
export class NgbCarouselComponent implements OnInit {

  // constructor(config: NgbCarouselConfig) {
  //   // customize default values of carousels used by this component tree
  //   config.interval = 1000;
  //   config.wrap = false;
  //   config.keyboard = false;
  //   config.pauseOnHover = false;
  // }
  constructor(){}

  ngOnInit(): void {
  }

}