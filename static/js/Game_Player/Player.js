import { GameObject } from "../Game_Object/Object.js";

class Player extends GameObject{
    constructor(root, info){
        super();
        this.root = root;

        this.id = info.id;
        this.posX = info.posX;
        this.posY = info.posY;
        this.width = info.width;
        this.height = info.height;
        this.color = info.color;

        this.vx = 0;
        this.vy = 0;

        this.direction = 1;

        this.status = 0;
        
        this.v_X = 400;
        this.v_Y = -1000;

        this.gravity = 100;

        this.animation = new Map();

        this.ctx = this.root.gameMap.ctx;
        this.pressedKeys = this.root.gameMap.controller.controller_li;

        this.frameCurrentCnt = 0;
    }
    start(){

    }
    updateMove(){
        // console.log( this.ctx.canvas.width)
        this.vy += this.gravity;
        this.posY += this.vy * this.timeDelta/1000;
        this.posX += this.vx * this.timeDelta/1000;
        if(this.posY > 400){
            this.posY = 400;
            this.vy = 0;
            if(this.status === 3){
                this.status = 0;
            }
        }
        if(this.posX < 0){
            this.posX = 0;
        }
        if(this.posX + this.width > this.ctx.canvas.width){
            this.posX = this.ctx.canvas.width - this.width;
        }
    }
    updateControl(){
        let w, s, a, d, space;
        if(this.id == 0){
            w = this.pressedKeys.has('w');
            s = this.pressedKeys.has('s');
            a = this.pressedKeys.has('a');
            d = this.pressedKeys.has('d');
            space = this.pressedKeys.has(' ');
        }
        else{
            w = this.pressedKeys.has('ArrowUp');
            s = this.pressedKeys.has('ArrowDown');
            a = this.pressedKeys.has('ArrowLeft');
            d = this.pressedKeys.has('ArrowRight');
            space = this.pressedKeys.has('Enter');
        }
        if(this.status === 0 || this.status === 1 || this.status === 2 ){
            if(space){
                this.status = 4;
                this.frameCurrentCnt = 0;
                this.vx = 0;
            }
            else if(w){
                if(d){
                    this.vx = this.v_X;
                    this.vy = this.v_Y;
                }
                else if(a){
                    this.vx = -this.v_X;
                    this.vy = this.v_Y;
                }
                else{
                    this.vx = 0;
                    this.vy = this.v_Y
                }
                this.status = 3;
                this.frameCurrentCnt = 0;       
            }
            else if(a){
                this.vx = -this.v_X;
                this.status = 2;
            }
            else if(d){
                this.vx = this.v_X;
                this.status = 1;
            }
            else{
                this.vx = 0;
                this.vy = 0;
                this.status = 0;
            }
        }
    }

    update(){
        this.updateControl();
        this.updateMove();
        
        this.render();
    }
    render(){
        let obj = this.animation.get(this.status);
        // console.log(obj);
        if(obj && obj.loaded){
            // console.log(obj.gif.frames.length)
            
            let k = parseInt(this.frameCurrentCnt / obj.frameRate) % obj.gif.frames.length;
            let image = obj.gif.frames[k].image;
            this.ctx.drawImage(image,this.posX, this.posY + obj.offsetY, image.width * obj.scale, image.height * obj.scale);
            if(this.status === 4){
                if(this.frameCurrentCnt === obj.frameRate * (obj.gif.frames.length - 1)){
                    this.status = 0;
                }
            }
        }
        this.frameCurrentCnt++;
    }
}

export{
    Player
}