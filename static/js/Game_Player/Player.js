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
        this.direction = info.direction;

        this.vx = 0;
        this.vy = 0;

        

        this.status = 0; //0: idel, 1: forward, 2: backward, 3: jump, 4: attack, 5: be attacked, 6: die
        
        this.v_X = 400;
        this.v_Y = -1000;

        this.gravity = 100;

        this.animation = new Map();

        this.ctx = this.root.gameMap.ctx;
        this.pressedKeys = this.root.gameMap.controller.controller_li;

        this.frameCurrentCnt = 0;

        this.hp = 100;

        this.$hp = eval(`this.root.$hp${this.id}`);
        this.$hp_div = eval(`this.root.$hp${this.id}_div`);

        this.koImage = new Image(342 * 2, 192 * 2);
        this.koImage.src = "/static/images/others/ko.png";

    }
    start(){

    }

    end() {
        if(this.status === 6){
            this.ctx.drawImage(this.koImage, this.ctx.canvas.width/2 - 342, this.ctx.canvas.height/2 - 192, 
                    342 * 2, 192 * 2);
        }
        return;
       

    }

    isCollision(blockA, blockB){
        if(Math.max(blockA.x1, blockB.x1) > Math.min(blockA.x2, blockB.x2)){
            return false;
        }
        if(Math.max(blockA.y1, blockB.y1) > Math.min(blockA.y2, blockB.y2)){
            return false;
        }
        return true;
    }

    isAttackedStatus(){
        if(this.status === 6){
            // this.end();
            return;
        }
        this.status = 5;
        this.frameCurrentCnt = 0;
        this.hp = Math.max(this.hp - 20, 0);
        // console.log(this.$hp)
        this.$hp_div.animate({width: this.$hp.parent().width() * this.hp / 100}, 200);
        this.$hp.animate({width: this.$hp.parent().width() * this.hp / 100}, 500)
        // console.log(this.hp)
        if(this.hp <= 0){
            this.status = 6;  
        }
    }

    updateAttack(){
        if(this.status === 4 && this.frameCurrentCnt == 18){
            let other = this.root.players[1 - this.id];
            let r1, r2;
            if(this.direction > 0){
                r1 = {
                    x1: this.posX + this.width,
                    y1: this.posY + 45,
                    x2: this.posX + this.width + 100,
                    y2: this.posY + 45 + 20
                }
            }
            else{
                r1 = {
                    x1: this.posX - 100,
                    y1: this.posY + 45,
                    x2: this.posX,
                    y2: this.posY + 45 + 20
                }
            }
            r2 = {
                x1: other.posX,
                y1: other.posY,
                x2: other.posX + other.width,
                y2: other.posY + other.height
            }
            if(this.isCollision(r1, r2)){
                other.isAttackedStatus()
            }
        }

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
    updateTimeup(){
        if(this.root.$duration.text() === '0'){
            if(this.hp < this.root.players[1 - this.id].hp){
                this.hp = 0;
                this.status = 6;
            }
        }
    }
    update(){
        this.updateControl();
        this.updateMove();
        this.updateDirection();
        this.updateAttack();
        this.updateTimeup();
        this.render();
    }

    updateDirection(){
        if(this.status === 6){
            this.end();
            return;
        }
        let me = this, other = this.root.players[1 - me.id];
        if(me && other){
            if(me.posX < other.posX){
                me.direction = 1;
            }
            else{
                me.direction = -1;
            }
        }
    }

    render(){
        // this.ctx.fillStyle = this.color;
        // this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
        // if(this.direction > 0){
        //     this.ctx.fillStyle = "green";
        //     this.ctx.fillRect(this.posX + this.width, this.posY + 45, 100, 20)
        // }
        // else{
        //     this.ctx.fillStyle = "green";
        //     this.ctx.fillRect(this.posX, this.posY + 45, -100, 20)
        // }
        if(this.status === 1 && this.direction * this.vx < 0){
            this.status = 2;
        }
        if(this.status === 2 && this.direction * this.vx > 0){
            this.status = 1;
        }
        let obj = this.animation.get(this.status);
        // console.log(obj);
        if(obj && obj.loaded){
            // console.log(obj.gif.frames.length)
            let k = parseInt(this.frameCurrentCnt / obj.frameRate) % obj.gif.frames.length;
            let image = obj.gif.frames[k].image;
            if(this.direction === 1){
                this.ctx.drawImage(image,this.posX, this.posY + obj.offsetY, image.width * obj.scale, image.height * obj.scale);
            }
            else{
                this.ctx.save();
                this.ctx.translate(2 * (this.posX + this.width) - this.width, 0);
                this.ctx.scale(-1, 1);
                this.ctx.drawImage(image,this.posX, this.posY + obj.offsetY, image.width * obj.scale, image.height * obj.scale);
                this.ctx.restore();
            }
            if(this.status === 4 || this.status === 5 || this.status === 6){
                console.log(this.frameCurrentCnt, this.status)
                if(this.frameCurrentCnt === obj.frameRate * (obj.gif.frames.length - 1)){
                    // console.log(this.status);
                    if(this.status === 6){
                        this.end();
                        return ;
                    }
                    else{
                        this.status = 0;
                    }
                }
            }
        }

        this.frameCurrentCnt++;
    }
}

export{
    Player
}