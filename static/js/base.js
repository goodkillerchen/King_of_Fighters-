import { GameMap } from "./Game_Map/GameMap.js";
import {Kyo} from "./Game_Player/Kyo.js"
import { startTimer } from "./Game_Timer/timer.js";
class KOF {
    constructor(id){
        this.$kof = $('#' + id);
        this.$hp0 = this.$kof.find("#kof-hp-p0 > div");
        this.$hp0_div = this.$hp0.find("div");
        this.$hp1 = this.$kof.find("#kof-hp-p1 > div");
        this.$hp1_div = this.$hp1.find("div");
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
        this.$duration = this.$kof.find('#kof-timer');
        this.timer = startTimer(parseInt(this.$duration.text()), this.$duration);
    };

}

export{
    KOF
}