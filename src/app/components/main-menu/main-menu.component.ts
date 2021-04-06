import { Component, OnInit, Input } from '@angular/core';
import { Emoji } from 'src/assets/emoji';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  navbarIcon: string;
  userId: number;
  hasProducts: boolean = false;
  isCollapsed: boolean = true;

  constructor(private loginService: LoginService, private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.navbarIcon = Emoji[Math.floor(Math.random() * Emoji.length)];
  }

  isLoggedIn(): boolean {
    this.userId = this.loginService.userId;
    return this.loginService.hasLoggedIn;
  }

  signOut(): void {
    this.loginService.hasLoggedIn = false;
    setTimeout(() => this.router.navigate(['/store']), 1500);
  }

}
