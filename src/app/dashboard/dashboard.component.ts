import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { Song } from '../song';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  songs: Song[] = [];

  constructor(private SongService: SongService) { }

  ngOnInit(): void {
    this.getSongs();
  }

  getSongs(): void {
    this.SongService.getSongs()
      .subscribe(songs => {
        const rankedSongs = songs.filter(song => song.ranking !== undefined && song.ranking !== null);
        rankedSongs.sort((a, b) => (b.ranking as number) - (a.ranking as number));
        this.songs = rankedSongs.slice(0, 4);
      });
  }
}