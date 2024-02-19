export class Song {
    id: number;
    name: string;
    album: string;
    ranking: number | undefined;
    genre: string;
    releaseYear: number;
    isFavorite: boolean;
    constructor(id: number, name: string, album: string, genre: string, releaseYear: number, isFavorite: boolean) {
        this.id = id;
        this.name = name;
        this.album = album;
        this.genre = genre;
        this.releaseYear = releaseYear;
        this.isFavorite = false;
    }
}