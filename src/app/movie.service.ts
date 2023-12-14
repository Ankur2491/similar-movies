import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiKey = "98c3f8bd00e0a1138dccdc4dc8a7d1b9";
  constructor(private http: HttpClient) { }

  public searchMovies(movieName: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&page=1&include_adult=false&query=${movieName}`);
  }
  public getKeywords(movieId: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=${this.apiKey}`);
  }
  public getMoviesByKeyword(kId: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/keyword/${kId}/movies?api_key=${this.apiKey}&language=en-US&include_adult=false`);
  }
  public getMoviesByGenres(genreList: Array<String>): Observable<any> {
    let genres = "";
    for (let gen of genreList) {
      genres += gen + ","
    }
    genres = genres.substring(0, genres.length - 1);
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_genres=${genres}`);
  }
  public getWatchProviders(movieId: string): Promise<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${this.apiKey}`).toPromise();
  }
  public getTopCast(movieId: string): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${this.apiKey}&language=en-US`)
  }
  public getByCast(pId: string){
    return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&with_cast=${pId}`);
  }
}
