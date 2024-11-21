var s = new Audio();
playbtn.addEventListener("click", () => {
    if (playbtn.src.includes("play.svg")) {
        playbtn.src = 'pause.svg';
        s.pause();
    }
    else {
        playbtn.src = 'play.svg';
        s.play();
    }
});
function PlayMusic(song)
{
    var curr = new Audio(`${song}.mp3`);
    if(!s.paused)
        s.pause();
    if(curr != s)
    {
        s = curr; 
    }
    if(s.paused)
    {
        playbtn.src = 'play.svg';
        s.play();
    }
    else
    {
        playbtn.src = 'pause.svg';
        s.pause();
    }
    document.querySelector(".playbar").firstElementChild.innerText = song;
    document.querySelector(".CurrSong").innerText = `${song}`;
    s.addEventListener("timeupdate",()=>{
        let time = s.duration;
        let mins = parseInt(time/60);
        let seconds = parseInt(time % 60);
        let CurrTime = s.currentTime;
        let CurrMins = parseInt(CurrTime/60);
        let CurrSecs = parseInt(CurrTime % 60); 
        document.querySelector(".time").innerText = `${CurrMins}:${CurrSecs}/${mins}:${seconds}`;
        let l = (CurrTime/time) * 100 + "%";
        document.querySelector(".circle").style.left = `${l}`;
    })
}
async function main() {
    let p = await fetch("http://127.0.0.1:5500//Clone/music-app/songs.html");
    // console.log(p);
    let response = await p.text();
    let x = document.createElement("div");
    x.innerHTML = response;
    let all = (x.getElementsByTagName("a"));
    for (let i = 0; i < all.length; i++) {
        let name = all[i].href.slice(38);
        name = name.split(".mp3");
        let here = document.createElement("div");
        here.setAttribute("class", "st");
        here.innerText = name[0];
        here.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/128/461/461146.png" alt="">
        <p>${name[0]}</p>
        <img src="pause.svg" alt="">`
        document.querySelector(".songs").append(here);
    }
}
async function fun() {
    await main();
    const songs = document.querySelectorAll(".st")
    songs.forEach(song => {
    song.addEventListener("click", () => {
        console.log(song.children[1].innerText);
        PlayMusic(song.children[1].innerText)
    })
})
    prevbtn.addEventListener("click",() =>{
    let find = s.src;
    for(let i = 0 ; i < songs.length; i++)
    {
        let text = songs[i].innerText;
        if(find.includes(text))
        {
            PlayMusic(songs[(i - 1 + songs.length) % songs.length].innerText);
        }
    }
})
    nextbtn.addEventListener("click",() =>{
    let find = s.src;
    for(let i = 0 ; i < songs.length; i++)
    {
        let text = songs[i].innerText;
        if(find.includes(text))
        {
            PlayMusic(songs[(i + 1 + songs.length) % songs.length].innerText);
        }
    }
})
}
fun()
