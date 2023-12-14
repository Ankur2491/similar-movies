import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit {

  similarKeywords: Array<any> = [];
  movieId: string = "";
  movieName: string = "";
  genres: any;
  providers: Array<string> = [];
  fetchedProviderFor: string = "";
  similarMovieList: Array<any> = [];
  hasProvider: boolean = true;
  topCast: Array<any> = [];
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private movieService: MovieService, private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.currentGenre.subscribe(genreList => {
      this.genres = genreList;
    })
    this.activatedRoute.params.subscribe(routeData => {
      this.movieId = routeData['id'];
      this.movieName = routeData['name'];
      this.movieService.getTopCast(this.movieId).subscribe(castData=>{
        let shortenedList = castData.cast.slice(0,5);
        this.topCast = shortenedList.map((cObj:any)=>{
          const castObject= {id:'',character:'',name:'',photo:''};
          castObject.id = cObj['id']
          castObject.character = cObj['character']
          castObject.name = cObj['original_name']
          castObject.photo = cObj['profile_path']
          return castObject;
        })
      });
      this.movieService.getKeywords(routeData['id']).subscribe(similarKeywordMap => {
        this.similarKeywords = similarKeywordMap.keywords;
      });
    })
  }
  goBack() {
    this.router.navigate(['/']);
  }
  searchSimilar(kId: string) {
    this.movieService.getMoviesByKeyword(kId).subscribe(movieData => {
      let filteredList = movieData.results.filter((data: any) => {
        return data.id != this.movieId;
      })
      this.similarMovieList = filteredList.map((obj: any) => {
        const newObj = { id: '', title: '', overview: '', poster: '', rating: '', releaseDate: '' };
        newObj.id = obj['id']
        newObj.title = obj['original_title']
        newObj.overview = obj['overview']
        newObj.poster = obj['poster_path']
        newObj.rating = obj['vote_average']
        newObj.releaseDate = obj['release_date']
        return newObj;
      })
    })
  }
  searchByGenre() {
    this.movieService.getMoviesByGenres(this.genres).subscribe(movieData => {
      let filteredList = movieData.results.filter((data: any) => {
        return data.id != this.movieId;
      })
      this.similarMovieList = filteredList.map((obj: any) => {
        const newObj = { id: '', title: '', overview: '', poster: '', rating: '', releaseDate: '' };
        newObj.id = obj['id']
        newObj.title = obj['original_title']
        newObj.overview = obj['overview']
        newObj.poster = obj['poster_path']
        newObj.rating = obj['vote_average']
        newObj.releaseDate = obj['release_date']
        return newObj;
      });
    })
  }

  async viewProviders(movieId: string) {
    this.fetchedProviderFor = movieId;
    this.providers = [];
    this.hasProvider = true;
    let movieProviders: any = [];
    let watchList = await this.movieService.getWatchProviders(movieId)
    if (watchList && watchList.results) {
      let indWatchObj = watchList.results['IN']
      if (indWatchObj) {
        let flatrate = indWatchObj['flatrate'];
        if (flatrate && flatrate.length > 0) {
          for (let prov of flatrate) {
            movieProviders.push(prov['provider_name']);
          }
        }
      }
    }
    this.providers = movieProviders;
    if(this.providers.length == 0){
      this.hasProvider = false;
    }
  }
  viewByCast(castId: string){
    this.movieService.getByCast(castId).subscribe((moviesByCast:any)=>{
      let filteredList = moviesByCast.results.filter((data: any) => {
        return data.id != this.movieId;
      })
      this.similarMovieList = filteredList.map((obj: any) => {
        const newObj = { id: '', title: '', overview: '', poster: '', rating: '', releaseDate: '' };
        newObj.id = obj['id']
        newObj.title = obj['original_title']
        newObj.overview = obj['overview']
        newObj.poster = obj['poster_path']
        newObj.rating = obj['vote_average']
        newObj.releaseDate = obj['release_date']
        return newObj;
      });
    })
  }
}