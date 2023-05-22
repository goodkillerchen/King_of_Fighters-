import { GameMap } from "./Game_Map/GameMap.js";
import {Player} from "./Game_Player/Player.js"
class KOF {
    constructor(id){
        this.$kof = $('#' + id);
        this.gameMap = new GameMap(this);
        this.player0 = new Player(this, {
            id: 0,
            posX: 200,
            posY: 500,
            width: 100,
            height: 200,
            color: "blue"
        })
        this.player1 = new Player(this, {
            id: 1,
            posX: 1280-300,
            posY: 500,
            width: 100,
            height: 200,
            color: "red"
        })
    };

}

export{
    KOF
}