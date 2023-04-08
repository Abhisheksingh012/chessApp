import {isTileAlreadyOccupied, isTileOccupiedByOpponent} from "./generalRules";
import {Piece, TeamType} from "../../constant";

export const pawnMove=(prvX: number, prvY: number, nextX: number, nextY: number, team: TeamType,currentBoard: Piece[]) =>{
    const baseline = team ? 1 : 6;
    const direction = team ? 1 : -1;
    if (prvY === baseline && prvX === nextX && nextY - prvY === direction * 2) {
        if(!isTileAlreadyOccupied({x:nextX, y:nextY},currentBoard) && !isTileAlreadyOccupied({
            x: nextX,
            y: nextY-direction
        },currentBoard)){
            return true
        }

    } else if (nextY - prvY === direction && prvX === nextX && !isTileAlreadyOccupied({x:nextX, y:nextY},currentBoard)) {
        return true
    }
    else if((nextX-prvX===-1 || nextX-prvX===1) && nextY - prvY === direction){
        if(isTileOccupiedByOpponent({x:nextX, y:nextY},team,currentBoard)) return true;
    }
    return false
};