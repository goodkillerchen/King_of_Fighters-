import { GameMap } from "./Game_Map/GameMap.js";
class KOF {
    constructor(id){
        this.$kof = $('#' + id);
        this.gameMap = new GameMap(this);
    };

}

export{
    KOF
}