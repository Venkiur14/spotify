let cursong = new Audio()
let songs
function convertSecondsToMinutes(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00"
    }
    // Calculate minutes
    const minutes = Math.floor(seconds / 60);

    // Calculate remaining seconds and round to 2 decimal places
    const remainingSeconds = (seconds % 60).toFixed(2);

    // Format the result as "minutes:seconds"
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}


const palymusic = (track, pause = false) => {
    // let audio=new Audio("http://spotifywebby.freewebhostmost.com/songs/"+track+".mp3")
    if (track.startsWith("https")) {
        cursong.src = track
        console.log("hi"+track)
    }
    else {

        cursong.src ="https://venkiur14.github.io/spotify/"+ track + ".mp3"
    }
    if (!pause) {
        cursong.play()
        play.src = "pause.svg"
    }
    if (track.startsWith("https")) {

        document.querySelector(".songinfo").innerHTML = "Bajrang_Baan"
    }
    else {
        document.querySelector(".songinfo").innerHTML = track 
    }
    document.querySelector(".songtime").innerHTML = "00:00 / 00.00"

}

async function getsongs() {
    let a = await fetch("http://spotifywebby.freewebhostmost.com/songs/")
    let response = await a.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let tds = div.getElementsByTagName("td")
    console.log(tds)
}
// getsongs()

async function main() {
    songs = ["https://venkiur14.github.io/spotify/Bajrang_Baan.mp3", "https://venkiur14.github.io/spotify/Ganpati_Aarti.mp3","https://venkiur14.github.io/spotify/Krishna_Main.mp3", "https://venkiur14.github.io/spotify/Arere_Avala_Naguva.mp3", "https://venkiur14.github.io/spotify/Dwapara.mp3", "https://venkiur14.github.io/spotify/Good_Morning.mp3", "https://venkiur14.github.io/spotify/Aasa_Kooda.mp3", "https://venkiur14.github.io/spotify/Chaleya.mp3" , "https://venkiur14.github.io/spotify/Deva_Deva.mp3" , "https://venkiur14.github.io/spotify/Hawayein.mp3" , "https://venkiur14.github.io/spotify/Heeriye.mp3" ,  "https://venkiur14.github.io/spotify/Raataan_Lambiyan.mp3" , "https://venkiur14.github.io/spotify/Innunu_Bekagide.mp3" , "https://venkiur14.github.io/spotify/Kavithe_Kavithe.mp3" , "https://venkiur14.github.io/spotify/Kesariya_Rangu.mp3" , "https://venkiur14.github.io/spotify/Marete_Hodenu.mp3"  ]
    console.log(songs)
    palymusic(songs[0], true)


    var audio = new Audio(songs[0])
    //  audio.play()

    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    })


    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            const eli = e.textContent.trim()
            console.log(eli)
            palymusic(eli)


        })
        //         const outerDiv = document.querySelector('.songlist');
        //     const innerDiv = outerDiv.getElementsByTagName('li');
        //     const textContent = innerDiv.textContent;
        //    console.log(textContent);
        // console.log(e.querySelector(".info").firstChild.innerHTML)



    })

    play.addEventListener("click", () => {
        if (cursong.paused) {
            play.src = "pause.svg"
            cursong.play()
        }
        else {
            cursong.pause()
            play.src = "play.svg"
        }
    })


    //time update
    
    cursong.addEventListener("timeupdate", () => {
        // console.log(cursong.currentTime,cursong.duration)
        document.querySelector(".songtime").innerHTML = `${convertSecondsToMinutes(cursong.currentTime)} /${convertSecondsToMinutes(cursong.duration)}`
        document.querySelector(".circle").style.left = cursong.currentTime / cursong.duration * 100 + "%"
        if (cursong.currentTime == cursong.duration){
            console.log("full")
            console.log(document.querySelector(".songinfo").innerHTML)
            let naam="https://venkiur14.github.io/spotify/"+document.querySelector(".songinfo").innerHTML+".mp3"
            let sno=songs.indexOf(naam)
            if(sno<songs.length){
                palymusic(songs[sno+1])
                document.querySelector(".songinfo").innerHTML = songs[sno+1].split("/").splice(-1)[0].split(".").slice(0)[0]
            }
          
        }



    })


    document.querySelector(".seekbar").addEventListener("click", e => {
        let per = (e.offsetX / e.target.getBoundingClientRect().width) * 100
        document.querySelector(".circle").style.left = e.offsetX / per + "%"
        cursong.currentTime = ((cursong.duration) * per) / 100
    })


    // hamburger
    document.querySelector(".hamburger").addEventListener("click", () => {
        document.querySelector(".left").style.left = 0
    })

    // closing hamburger

    document.querySelector(".close").addEventListener("click", () => {
        document.querySelector(".left").style.left = "-120%"
    })

    // next song

    previous.addEventListener("click", () => {
        console.log("prev")
        let index = songs.indexOf(cursong.src)
        if (index - 1 >=0) {
            palymusic(songs[index - 1])
            document.querySelector(".songinfo").innerHTML =cursong.src.split("/").slice(-1)[0].split(".")[0]
        }
        console.log(index)
    })

    next.addEventListener("click", () => {
        console.log("nxt")
        console.log(cursong.src)
        // console.log(cursong.src.split("/").slice(-1)[0].split(".")[0])
        let index = songs.indexOf(cursong.src)
        if (index + 1 < songs.length) {
            palymusic(songs[index + 1])
            document.querySelector(".songinfo").innerHTML =cursong.src.split("/").slice(-1)[0].split(".")[0]
        }

    })


    ///volume
    document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",e=>{
        // console.log(e,e.target ,e.target.value)
        console.log("setting volume to "+e.target.value)
        if(e.target.value==0){
            document.querySelector(".volume>img").src="img/mute.svg"
            cursong.volume=0
        }
        else{
        cursong.volume=parseInt(e.target.value)/100
        document.querySelector(".volume>img").src="img/volume.svg"
    }
    })


    //mute track
    document.querySelector(".volume>img").addEventListener("click",e=>{
        console.log(e.target)
        if(e.target.src.includes("img/volume.svg")){
            e.target.src= e.target.src.replace("volume.svg","mute.svg")
            cursong.volume=0
            document.querySelector(".range").getElementsByTagName("input")[0].value=0
        }
        else{
            e.target.src= e.target.src.replace("mute.svg","volume.svg")
            cursong.volume=.10
            document.querySelector(".range").getElementsByTagName("input")[0].value=10
        }
    })


    // document.querySelector(".card").addEventListener("click", e => {
    //     console.log(e.target)
    //     // let AlbsongUL = document.querySelector(".songlist").getElementsByTagName("ul")
    //     // AlbsongUL.innerHTML = ""
    //     console.log(songs[0].split("/").slice(-1)[0].split(".")[0].replace("_", " "))
        
    // })


    // document.querySelector(".cardContainer").addEventListener("click", e => {
    //     console.log(e.target)
    //     // let AlbsongUL = document.querySelector(".songlist").getElementsByTagName("ul")
    //     // AlbsongUL.innerHTML = ""
    //     console.log(songsl1[0].split("/").slice(-1)[0].split(".")[0].replace("_", " "))
    //     let i=0
    //     // for (const song of songsl1) {
    //     //     songUL.innerHTML = songUL.innerHTML + `<li>
    //     //                              <img src="img/music.svg" alt="" srcset="">
    //     //                              <div class="info">${songsl1[i].split("/").slice(-1)[0].split(".")[0]}</div>
    //     //                             <img class="sideplay" src="img/playside.svg" alt="">
    //     //                         </li>`;
    //     //                         i=i+1
    //     // }
    // })

    document.getElementById("card1").addEventListener("click",e=>{
        console.log(songs[10].split("/").slice(-1)[0].split(".").slice(0)[0])
        document.querySelector(".songinfo").innerHTML =`${songs[0].split("/").slice(-1)[0].split(".").slice(0)[0]}`
        palymusic(songs[0].split("/").slice(-1)[0].split(".").slice(0)[0])
    })

    document.getElementById("card2").addEventListener("click",e=>{
        console.log(songs[10].split("/").slice(-1)[0].split(".").slice(0)[0])
        document.querySelector(".songinfo").innerHTML =`${songs[3].split("/").slice(-1)[0].split(".").slice(0)[0]}`
        palymusic(songs[3].split("/").slice(-1)[0].split(".").slice(0)[0])
    })

    document.getElementById("card3").addEventListener("click",e=>{
        console.log(songs[10].split("/").slice(-1)[0].split(".").slice(0)[0])
        document.querySelector(".songinfo").innerHTML =`${songs[6].split("/").slice(-1)[0].split(".").slice(0)[0]}`
        palymusic(songs[16].split("/").slice(-1)[0].split(".").slice(0)[0])
    })
    document.getElementById("card4").addEventListener("click",e=>{
        console.log(songs[10].split("/").slice(-1)[0].split(".").slice(0)[0])
        document.querySelector(".songinfo").innerHTML =`${songs[12].split("/").slice(-1)[0].split(".").slice(0)[0]}`
        palymusic(songs[12].split("/").slice(-1)[0].split(".").slice(0)[0])
    })

}
main()
