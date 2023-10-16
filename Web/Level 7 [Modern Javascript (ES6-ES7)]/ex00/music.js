class Music {
    constructor (mname, singer, file, img) {
        this.mname = mname;
        this.file = file;
        this.img = img;
        this.singer = singer;
    }

    getName () {
        return `${this.singer}` +  ' - ' + `${this.mname}`;
    }
}

let songs = [
    new Music ("Chill", "NoCopyright","chill.mp3", "chill.jpg"),
    new Music ("Electro", "NoCopyright","electro.mp3", "electro.jpg"),
    new Music ("Movie", "NoCopyright","movie.mp3", "movie.jpg"),
    new Music ("Piano", "NoCopyright","piano.mp3", "piano.jpg"),
    new Music ("Rock", "NoCopyright","rock.mp3", "rock.jpg"),
    new Music ("Upbeat", "NoCopyright","upbeat.mp3", "upbeat.jpg")
]