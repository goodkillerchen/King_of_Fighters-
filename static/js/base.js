import { GameMap } from "./Game_Map/GameMap.js";
import {Kyo} from "./Game_Player/Kyo.js"
class KOF {
    constructor(id){
        this.$kof = $('#' + id);
        this.gameMap = new GameMap(this);
        this.players = [new Kyo(this, {
            id: 0,
            posX: 200,
            posY: 400,
            width: 125,
            height: 210,
            direction: 1,
            color: 'blue'
        }),new Kyo(this, {
            id: 1,
            posX: 1280-320,
            posY: 400,
            width: 125,
            height: 210,
            direction: -1,
            color: 'red'
        })];
    };

}

export{
    KOF
}