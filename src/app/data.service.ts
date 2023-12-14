import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private genreSource = new BehaviorSubject(new Array<string>());
  currentGenre = this.genreSource.asObservable();

  constructor() { }

  changeGenre(genres: Array<string>) {
    this.genreSource.next(genres)
  }

}