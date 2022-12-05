import {Component, EventEmitter, Output, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../entities/user/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  onSelect(feature: string) {
    this.router.navigate([feature]);
  }

  isLogged() {
    return this.authService.isLogged();
  }

  onLogOut() {
    this.authService.logOut();
    this.router.navigate(['recipes']);
  }
}
