import { GameObject } from "../Game_Object/Object.js";

export class GameMap extends GameObject{
    constructor(root){
        super();
        this.root = root;
        this.$canvas = $('<canvas id="mapCanvas" width="1280" height="720" tabindex=0></canvas>')
        this.ctx = this.$canvas[0].getContext("2d");
        this.root.$kof.append(this.$canvas);
        this.$canvas.focus();
    }

    start(){

    }

    update(){
        this.render();
    }

    render(){
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}