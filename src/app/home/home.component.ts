import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movieName: string = "";
  movieList: Array<any> = [];

  constructor(private movieService: MovieService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    let savedData = localStorage.getItem('savedMovieList');
    let savedName = localStorage.getItem('savedMovieName');
    if (savedData) {
      this.movieList = JSON.parse(savedData);
    }
    if (savedName) {
      this.movieName = savedName;
    }
  }
  searchMovie() {
    this.movieService.searchMovies(this.movieName).subscribe(data => {
      this.movieList = data.results.map((obj: any) => {
        const newObj = { id: '', title: '', overview: '', poster: '', rating: '', releaseDate: '', genres: [] };
        newObj.id = obj['id']
        newObj.title = obj['original_title']
        newObj.overview = obj['overview']
        newObj.poster = obj['poster_path']
        newObj.rating = obj['vote_average']
        newObj.releaseDate = obj['release_date']
        newObj.genres = obj['genre_ids']
        return newObj;
      })
    })
  }
  viewSimilar(movieId: string, movieName: string, genres: any) {
    this.dataService.changeGenre(genres);
    localStorage.setItem('savedMovieName', this.movieName);
    localStorage.setItem('savedMovieList', JSON.stringify(this.movieList));
    this.router.navigate(['/similar', movieId, movieName]);
  }
}
