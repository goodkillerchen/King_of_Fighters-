
import { StartMenu } from "./Game_Start/StartMenu.js";
class StartPage{
    constructor(id){
        this.$startMenu = $('#' + id);
        this.startPage = new StartMenu(this)
    }

}

export{StartPage}