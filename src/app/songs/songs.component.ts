import {Component, OnInit} from '@angular/core';
import { NgIf, NgFor, UpperCasePipe, } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { SongService } from '../song.service';
import { Song } from '../song';

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrl: './songs.component.css'
})
export class SongsComponent implements OnInit {
  songs: Song[] = [];
  currentFilter: number | undefined;
  favoritesButton: boolean = false;

  constructor(private songService: SongService) { }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(): void {
    this.songService.getSongs()
    .subscribe(songs => this.songs = songs);
  }

  setFilter(filterType: Number){
    if(filterType == 0){
      this.currentFilter = 0;
    }
    if(filterType == 1 || filterType == 3){
      this.songs = this.songs.sort((a,b) => a.id > b.id ? 1 : -1);
      this.currentFilter = 1;
    }
    if(filterType == 2){
      this.songs = this.songs.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
      this.currentFilter = 2;
    }
    if(filterType == 3){
      this.currentFilter = 3; 
    }
    if (filterType === 4) {
      this.currentFilter = 4;
      this.songs = this.songs.sort((a, b) => {
        const aRanking = a.ranking !== null && a.ranking !== undefined ? a.ranking : Number.MIN_SAFE_INTEGER;
        const bRanking = b.ranking !== null && b.ranking !== undefined ? b.ranking : Number.MIN_SAFE_INTEGER;
        if (aRanking === bRanking) {
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        }
        return aRanking < bRanking ? 1 : -1;
      });
    }
    if(filterType == 5){
      this.currentFilter = 5;
      this.songs = this.songs.sort((a,b) => {
        if (a.genre == b.genre){
              return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        }
        return a.genre.toLowerCase() > b.genre.toLowerCase() ? 1 : -1;
      })
    }
    if(filterType == 6){
      this.currentFilter = 6;
      this.songs = this.songs.sort((a,b) => {
        if (a.releaseYear == b.releaseYear){
              return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        }
        return a.releaseYear > b.releaseYear ? 1 : -1;
      })
    }
  }

  starClicked(): void{
    if(this.favoritesButton == false){
      this.favoritesButton = true;
      this.songs = this.songs.filter(song => song.isFavorite);
    }
    else{
      this.favoritesButton = false;
      this.getSongs();
    }
  }

}
