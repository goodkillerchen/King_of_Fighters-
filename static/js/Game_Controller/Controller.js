class Controller{
    constructor($canvas){
        this.$canvas = $canvas;
        this.Controller_li = new Set();
        this.start()
    }
    start(){
        this.$canvas.keydown( (e) => { 
            this.Controller_li.add(e);
        });
        this.$canvas.keyup((e) => { 
            console.log(this)
            this.Controller_li.delete(e);
        });
    }
}

export{
    Controller
}