export class Audio{
    constructor(){
        this.audioElement = $('#audio');

    }

    play(type){
        let src = "";
        switch(type){
            case "town":
                src = "../music/town-ost.mp3";
                break;
                
            case "world":
                src = "../music/route-110.mp3";
                break;

            case "combat":
                src = "../music/battle-ost.mp3"
                break;
        }
        this.audioElement.attr("src",src);
        this.audioElement[0].play();
    }

    stop(){
        this.audioElement[0].pause();
        $('.player').remove(this.audioElement);
    }
}