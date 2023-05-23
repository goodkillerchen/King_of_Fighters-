//the class for controller of the game
class Controller{
    constructor($canvas){
        this.$canvas = $canvas;
        this.controller_li = new Set();
        this.start()
    }
    start(){
        this.$canvas.keydown( (e) => { 
            this.controller_li.add(e.key);
        });
        this.$canvas.keyup( (e) => { 
            this.controller_li.delete(e.key);
        });
    }
}

export{
    Controller
}