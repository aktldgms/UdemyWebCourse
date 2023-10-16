class MusicPlayer {
    constructor (songs) {
        this.songs = songs;
        this.index = 0;
        this.repeat = "none";
        this.order = [];
        this.orderIndex = 0;
    }

    next (display, audio, isMixed) {
        if(this.repeat == "song")
        {
            this.index = this.index;
            display();
            audio.play();
        }
        else if (this.repeat == "list")
        {
            if(isMixed) 
            {
                if (this.orderIndex < this.songs.length - 1) 
                {
                    this.index = this.order[this.orderIndex];
                    this.orderIndex++;
                }
                else 
                {
                    this.orderIndex = 0;
                }
                display();
                audio.play();
            }
            else 
            {
                if (this.index < this.songs.length - 1) {
                    this.index++;
                }
                else {
                    this.index = 0;
                }
                display();
                audio.play();
            }
        }
        else
        {
            if(isMixed) 
            {
                if(this.orderIndex < this.songs.length - 1)
                {
                    this.index = this.order[this.orderIndex];
                    this.orderIndex++;
                    display();
                    audio.play();
                }
            }
            else 
            {
                if (this.index < this.songs.length - 1) 
                {
                    this.index++;
                    display();
                    audio.play();
                }
            }
        }
    }

    previous (display, audio, isMixed, random) {
        if(this.repeat == "song")
        {
            this.index == this.index;
            display();
            audio.play();
        }
        else if(this.repeat == "list")
        {
            if (this.index != 0) {
                this.index--;
            }
            else {
                this.index = this.songs.length - 1;
            }
            display();
            audio.play();
            if(random.includes(this.index))
            {
                console.log(this.index);
                let index = random.indexOf(this.index);
                random.splice(index,1);
                console.log(random);
            }
            if(isMixed)
            {
                this.order = random;
                this.orderIndex = 0;
            }
        }
        else 
        {
            if (this.index != 0) {
                this.index--;
                display();
                audio.play();
            }
            if(random.includes(this.index))
            {
                console.log(this.index);
                let index = random.indexOf(this.index);
                random.splice(index,1);
                console.log(random);
            }
            if(isMixed)
            {
                this.order = random;
                this.orderIndex = 0;
            }
        }
    }

    pauseMusic() {
        audio.pause();
        play.classList = "fa-solid fa-circle-play";
        music_player.classList.remove("playing");
    }

    playMusic() {
        audio.play();
        play.classList = "fa-solid fa-circle-pause";
        music_player.classList.add("playing");
    }
}