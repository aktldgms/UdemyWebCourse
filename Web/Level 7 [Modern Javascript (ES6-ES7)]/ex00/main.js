let player = new MusicPlayer(songs);

//Controls
const list_btn = document.querySelector(".musicList_button").children[0];
const next = document.querySelector("#next");
const previous = document.querySelector("#previous");
const play = document.querySelector("#play");
const progress_range = document.querySelector("#progress-range");
const volume_range = document.querySelector("#volume-range");
const mute = document.querySelector("#mute");
const repeat = document.querySelector("#repeat");
const mix = document.querySelector("#mix");
let isMuted = false;
let isMixed = false;

//Calculate
const time_current = document.querySelector(".current-time");
const time_last = document.querySelector(".last-time");

//HTML Elements
const music_player = document.querySelector(".music_player");
const left_side = document.querySelector(".left-side");
const right_side = document.querySelector(".right-side");
const audio = document.querySelector("#audio");
const img = document.querySelector(".img_wrapper").children[0];
const musicName = document.querySelector("#musicName");

list_btn.addEventListener("click", () => {
    if(left_side.classList.contains("col-7") && music_player.classList.contains("row")) {
        left_side.classList.remove("col-7");
        music_player.classList.remove("row");
        right_side.classList.add("d-none");
        music_player.style.width = "40%";
        img.style.borderRadius = "10px 10px 0 0";
    }
    else {
        left_side.classList.add("col-7");
        music_player.classList.add("row");
        right_side.classList.remove("d-none");
        music_player.style.width = "60%";
        img.style.borderRadius = "10px 0 0 0";

    }
});

const displayPlayer = () => {
    right_side.innerHTML = `<h3 class="text-center">MUSIC LIST</h3>`;
    for (i in player.songs) {
        if(i == player.index)
        {
            right_side.innerHTML += `
                <div id="${i}" class="marked musicList_item row m-1 pb-1 border-bottom">
                    <div class="img-tmb col-2">
                        <img src="photo/${player.songs[i].mname}-tmb.jpg">
                    </div>
                    <div class="name col-8">
                        ${player.songs[i].getName()}
                    </div>
                    <span class="badge text-bg-dark col-2">
                        Song-${(parseInt(i)+1)}
                    </span>
                </div>
            `
        }
        else 
        {
            right_side.innerHTML += `
                <div id="${i}" class="musicList_item row m-1 pb-1 border-bottom">
                    <div class="img-tmb col-2">
                        <img src="photo/${player.songs[i].mname}-tmb.jpg">
                    </div>
                    <div class="name col-8">
                        ${player.songs[i].getName()}
                    </div>
                    <span class="badge text-bg-dark col-2">
                        Song-${(parseInt(i)+1)}
                    </span>
                </div>
            `
        }
    }

    audio.src = "music/" + player.songs[player.index].file;
    img.src = "photo/" + player.songs[player.index].img;
    musicName.innerText = `${player.songs[player.index].getName()}`;

    for(j = 0; j < right_side.children.length; j++)
    {
        let id = right_side.children[j].id;
        if(!right_side.children[j].classList.contains("marked")) {
            right_side.children[j].addEventListener("click", () => {
                player.index = id;
                displayPlayer();
                audio.play();
                play.classList = "fa-solid fa-circle-pause";
                if(!music_player.classList.contains("playing"))
                    music_player.classList.add("playing");
            });   
        }
    }
}

const calculateTime = (toplamSaniye) => {    
    let dakika = Math.floor(toplamSaniye / 60);
    let saniye = Math.floor(toplamSaniye % 60);
    return (saniye < 10) ? `${dakika}:0${saniye}` : `${dakika}:${saniye}`
}

//EVENT LISTENERS
play.addEventListener("click", () => {
    const isPlay = music_player.classList.contains("playing");
    isPlay ? player.pauseMusic() : player.playMusic();
});

next.addEventListener("click", () => {
    if(player.repeat == "none" && player.index == player.songs.length - 1 && Math.floor(audio.currentTime) == Math.floor(audio.duration))
    {
        null;
    }
    else 
    {
        player.next(displayPlayer, audio, isMixed);
        play.classList = "fa-solid fa-circle-pause";
        if(!music_player.classList.contains("playing"))
            music_player.classList.add("playing");
    }
});

previous.addEventListener("click", () => {
    if(audio.currentTime > 3)
    {
        audio.currentTime = 0;
        audio.play();
        play.classList="fa-solid fa-circle-pause";
        if(!music_player.classList.contains("playing"))
            music_player.classList.add("playing");
    }
    else {
        let a = randomList();
        player.previous(displayPlayer, audio, isMixed, a);
        play.classList = "fa-solid fa-circle-pause";
        if(!music_player.classList.contains("playing"))
            music_player.classList.add("playing");
    }
});

mute.addEventListener("click", () => {
    if (isMuted) {
        mute.classList = "mx-1 fa-solid fa-volume-high";
        audio.muted = false;
        isMuted = false;
        volume_range.value = audio.volume * 100;
    }
    else {
        mute.classList = "mx-1 fa-solid fa-volume-xmark";
        audio.muted = true;
        isMuted = true;
        volume_range.value = 0;
    }
});

audio.addEventListener("loadedmetadata", () => {
    time_last.innerText = calculateTime(audio.duration);
    progress_range.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    time_current.innerText = calculateTime(audio.currentTime);
    progress_range.value = Math.floor(audio.currentTime);
    if(volume_range.value == 0)
    {
        mute.classList = "mx-1 fa-solid fa-volume-xmark";
    }
    else
    {
        mute.classList = "mx-1 fa-solid fa-volume-high";
    }
    
});

audio.addEventListener("ended", () => {
    if(player.repeat == "song")
    {
        audio.currentTime = 0;
        audio.play();
    }
    else if (player.repeat == "none" && player.index == player.songs.length - 1)
    {
        player.pauseMusic();
    }
    else 
    {
        player.next(displayPlayer, audio, isMixed);
    }
});

progress_range.addEventListener("input", () => {
    audio.currentTime = progress_range.value;
});

volume_range.addEventListener("input", () => {
    audio.volume = volume_range.value / 100;
});

repeat.addEventListener("click", () => {
    if(player.repeat == "none")
    {
        player.repeat = "list";
        repeat.classList = "fa-solid fa-repeat";
    }
    else if(player.repeat == "list")
    {
        player.repeat = "song";
        repeat.classList = "fa-solid fa-1";
    }
    else {
        player.repeat = "none";
        repeat.classList = "fa-solid fa-repeat pasif";
    }
});

mix.addEventListener("click", () => {
    if(mix.classList.contains("pasif"))
    {
        mix.classList.remove("pasif");
        player.order = randomList();
        isMixed = true;
    }
    else 
    {
        mix.classList.add("pasif");
        isMixed = false;
    }
});

const randomList = () => {
    let randomArray = [];
    let randomTemp;
    for(z = 0; z < player.songs.length; z++)
    {
        randomTemp = Math.floor(Math.random() * (player.songs.length));
        if(!randomArray.includes(randomTemp))
            randomArray[z] = randomTemp;
        else
            z--;
    }
    return randomArray;
}

displayPlayer();