import { Injectable } from '@angular/core';
import { Observable, catchError, tap, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Song } from './song';
import { allSongs } from './allSongs';
@Injectable({
  providedIn: 'root'
})
export class SongService {
  private songsUrl = 'api/songs';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private http: HttpClient) { }

  getSongs(): Observable<Song[]> {
    return of(allSongs)
      .pipe(
        tap(_ => this.log('fetched songs')),
        catchError(this.handleError<Song[]>('getSongs', []))
      );
  }

  getSong(id: number): Observable<Song> {
    const song = allSongs.find(s => s.id === id);
    if (song) {
      return of(song)
        .pipe(
          tap(_ => this.log(`fetched song id=${id}`)),
          catchError(this.handleError<Song>(`getSong id=${id}`))
        );
    } else {
      // Return an observable with an error message or handle it accordingly
      return of(null as unknown as Song);
    }
  }

  searchSongs(term: string): Observable<Song[]> {
    if (!term.trim()) {
      return of([]);
    }
    const filteredSongs = allSongs.filter(song => song.name.toLowerCase().includes(term.toLowerCase()));
    return of(filteredSongs)
      .pipe(
        tap(x => x.length ?
          this.log(`found songs matching "${term}"`) :
          this.log(`no songs matching "${term}"`)),
        catchError(this.handleError<Song[]>('searchSongs', []))
      );
  }
  
  addSong(song: Song): Observable<Song> {
    // Add your logic to handle adding a song to the collection
    // You might need to update 'allSongs' accordingly
    return of(song)
      .pipe(
        tap(_ => this.log(`added song w/ id=${song.id}`)),
        catchError(this.handleError<Song>('addSong'))
      );
  }

  deleteSong(id: number): Observable<Song> {
    const index = allSongs.findIndex(song => song.id === id);
    if (index !== -1) {
      const deletedSong = allSongs.splice(index, 1)[0];
      return of(deletedSong)
        .pipe(
          tap(_ => this.log(`deleted song id=${id}`)),
          catchError(this.handleError<Song>('deleteSong'))
        );
    } else {
      // Return an observable with an error message or handle it accordingly
      return of(null as unknown as Song);
    }
  }

  updateSong(song: Song): Observable<any> {
    const index = allSongs.findIndex(s => s.id === song.id);
    if (index !== -1) {
      allSongs[index] = song;
      return of(null)
        .pipe(
          tap(_ => this.log(`updated song id=${song.id}`)),
          catchError(this.handleError<any>('updateSong'))
        );
    } else {
      // Return an observable with an error message or handle it accordingly
      return of(null);
    }
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(message);
  }
}