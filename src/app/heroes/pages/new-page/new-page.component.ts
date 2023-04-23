import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { switchMap } from 'rxjs';

import { Publisher, Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';



@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  })

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ]

  // CONSTRUCTOR
  constructor(
    private heroService: HeroesService,
    private activaterRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activaterRoute.params
      .pipe(
        switchMap(({ id }) => this.heroService.getHeroById(id)),
      )
      .subscribe(hero => {
        if (!hero) return this.router.navigateByUrl('/');
        this.heroForm.reset(hero);
        return;
      })
  }

  // METODOS
  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  onSubmit() {
    if (this.heroForm.invalid) return;

    if (this.currentHero.id) {
      this.heroService.updateHero(this.currentHero)
        .subscribe(hero => {
          this.showSnackbar(`${hero.superhero} created`);
        });

      return;
    }

    this.heroService.addHero(this.currentHero)
      .subscribe(hero => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackbar(`${hero.superhero} created`);
      });
  }

  showSnackbar(message: string): void {
    this.snackbar.open(message, 'DONE', { duration: 2500 })
  }

}
