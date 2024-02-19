import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SongService } from '../song.service';
import { Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Song } from '../song';

@Component({
  selector: 'app-song-detail',
  templateUrl: './song-detail.component.html',
  styleUrl: './song-detail.component.css'
})
export class SongDetailComponent implements OnInit {
  song: Song | undefined;
  selectedAlbum: string | undefined;
  starIsClicked: boolean | undefined;
  validationErrorMessage: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private SongService: SongService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSong();
    this.starIsClicked = this.song?.isFavorite;
  }

  getSong(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.SongService.getSong(id)
      .subscribe(song => this.song = song);
  }

  printSomeIsh(): void {
    console.log(this.song);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.song) {
      if (this.validateInputs()) {
        if (this.selectedAlbum) {
          this.song.album = this.selectedAlbum;
        }
        if (this.starIsClicked !== undefined) {
          this.song.isFavorite = this.starIsClicked;
        }
        this.SongService.updateSong(this.song)
          .subscribe();
        console.log("SAVE");
      } 
    }
  }

  setAlbum(event: any): void{
  const selectEelement = event.target as HTMLSelectElement;
  const inputValue = selectEelement.value;    

    if(inputValue == "Unknown"){
      this.selectedAlbum = "Unknown";
    }
    if(inputValue == "Taylor Swift"){
      this.selectedAlbum = "Taylor Swift";
    }
    if(inputValue == "Fearless"){
      this.selectedAlbum = "Fearless";
    }
    if(inputValue == "Speak Now"){
      this.selectedAlbum = "Speak Now";
    }
    if(inputValue == "Red"){
      this.selectedAlbum = "Red";
    }
    if(inputValue == "1989"){
      this.selectedAlbum = "1989";
    }
    if(inputValue == "Reputation"){
      this.selectedAlbum = "Reputation";
    }
    if(inputValue == "Lover"){
      this.selectedAlbum = "Lover";
    }
    if(inputValue == "Folklore"){
      this.selectedAlbum = "Folklore";
    }
    if(inputValue == "Evermore"){
      this.selectedAlbum = "Evermore";
    }
    if(inputValue == "Midnights"){
      this.selectedAlbum = "Midnights";
    }
  }

  starClicked(): void{
    this.starIsClicked = !this.starIsClicked;
  }

  // In your component class
  validateRanking(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const enteredValue = parseFloat(inputElement.value);

    if (isNaN(enteredValue) || enteredValue < 0 || enteredValue > 10) {
      inputElement.setCustomValidity('invalid-input');
      inputElement.style.borderLeft = '5px solid #a94442'; // Apply red border directly
    } else {
      inputElement.setCustomValidity('');
      inputElement.style.borderLeft = ''; // Remove the red border
    }
  }


  validateYear(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const enteredValue = parseFloat(inputElement.value);

    if (isNaN(enteredValue) || enteredValue < 0 || enteredValue > 9999) {
      inputElement.setCustomValidity('invalid-input');
      inputElement.style.borderLeft = '5px solid #a94442'; // Apply red border directly
    } else {
      inputElement.setCustomValidity('');
      inputElement.style.borderLeft = ''; // Remove the red border
    }
  }

  validateInputs(): boolean {
    if (!this.song) {
      return false;
    }
    const enteredRanking = this.song.ranking !== undefined ? parseFloat(this.song.ranking.toString()) : undefined;
    const isRankingValid = enteredRanking === undefined || (!isNaN(enteredRanking) && enteredRanking >= 0 && enteredRanking <= 10);
    const isNameValid = typeof this.song.name === 'string' && this.song.name.trim() !== '';
    const isGenreValid = typeof this.song.genre === 'string' && this.song.genre.trim() !== '';
    const isReleaseYearValid = typeof this.song.releaseYear === 'number' && this.song.releaseYear < 10000;
    if(isRankingValid && isNameValid && isGenreValid && isReleaseYearValid){
      this.validationErrorMessage = '';
      return true;
    }
    else{
      this.validationErrorMessage = '***Invalid input(s) Changes Have Not Been Saved***';
      return false;
    }
  }
}