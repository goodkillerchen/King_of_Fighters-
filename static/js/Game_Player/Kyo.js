import { Player } from "./Player.js";
import { GIF } from "../Utils/gif.js";

class Kyo extends Player{
    constructor(root, info){
        super(root, info);
        this.offset_Y = [0, -20, -20, -150, 0, 0, 0];
        this.init_animations();
        
    }
    init_animations(){
        for(let i = 0; i < 7; i++){
            let gif = GIF();
            gif.load(`/static/images/player/kyo/${i}.gif`);
            this.animation.set(i, {
                gif: gif,
                loaded: false,
                offsetY: this.offset_Y[i],
                scale: 2,
                frameRate: 5
            });
            gif.onload = ()=>{
                let obj = this.animation.get(i);
                obj.loaded = true;
            }
            if(i === 3){
                this.animation.get(i).frameRate = 3;
            }
        }
    }
}

export{Kyo}