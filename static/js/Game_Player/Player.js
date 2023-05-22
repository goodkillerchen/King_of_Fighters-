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

        this.v0_X = 0;
        this.v0_Y = 0;

        this.direction = 1;

        this.status = 0;
        
        this.v_X = 200;
        this.v_Y = 0;

        this.ctx = this.root.gameMap.ctx;
    }
    start(){

    }
    update(){
        this.render();
    }
    render(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }
}

export{
    Player
}