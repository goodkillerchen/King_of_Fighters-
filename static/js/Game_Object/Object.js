class GameObject {
    constructor(){
        GameObject.GameObject_li.push(this);
        this.timeDelta = 0;
        this.hasStarted = false;

    }
    start(){

    }

    update(){

    }

    destroy(){
        for(let obj of GameObject.GameObject_li){
            if(GameObject.GameObject_li[obj] === this){
                GameObject.GameObject_li.splice(obj, 1);
                break;
            }
        }
    }

    static GameObject_li = [];
}

let previousTimeStamp;

let step = (timeStamp)=>{
    for(let obj of GameObject.GameObject_li){
        if(!obj.hasStarted){
            obj.start();
            obj.hasStarted = true;
        }
        else{
            obj.timeDelta = timeStamp - previousTimeStamp;
            obj.update();
        }
    }
    previousTimeStamp = timeStamp;
    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

export{
    GameObject
}
