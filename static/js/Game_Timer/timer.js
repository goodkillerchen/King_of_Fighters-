let startTimer = function(interval, display, root) {
    let timer = setInterval(()=>{
        interval;
        display.text(interval)
        if(--interval < 0){
            interval = 0;
            clearInterval(timer);
        }
        for(let obj of root.players){
            console.log(obj.status)
            if(obj.status === 6){
                clearInterval(timer);
            }
        }
    }, 1000);
}

export{startTimer}