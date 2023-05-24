let startTimer = (interval, display) => {
    setInterval(()=>{
        interval;
        display.text(interval)
        if(--interval < 0){
            interval = 0;
            clearInterval();
        }
    }, 1000);
}

export{startTimer}