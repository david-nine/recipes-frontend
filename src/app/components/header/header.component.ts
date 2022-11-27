import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onSelect(feature: string) {
    this.router.navigate([feature]);
  }

}
