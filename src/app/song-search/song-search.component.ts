import { Component, OnInit } from '@angular/core';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SongService } from '../song.service';
import { Song } from '../song';

@Component({
  selector: 'app-song-search',
  templateUrl: './song-search.component.html',
  styleUrl: './song-search.component.css'
})

export class SongSearchComponent implements OnInit {
  songs$!: Observable<Song[]>;
  private searchTerms = new Subject<string>();

  constructor(private SongService: SongService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.songs$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.SongService.searchSongs(term)),
    );
  } 
}