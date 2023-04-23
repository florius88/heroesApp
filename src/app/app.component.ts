import { Component, OnInit } from '@angular/core';
/* import { AuthService } from './auth/services/auth.service'; */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent /* implements OnInit */ {
  title = 'heroesApp';

  /* Esta sería una de las maneras de hacerlo, pero no la mejor
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.checkAuthentication()
      .subscribe( () => {
        console.log('checkAuthentication finished')
      } );
  } */
}
