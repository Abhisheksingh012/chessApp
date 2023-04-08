import {Piece, Position, TeamType} from "../../constant";
import { isTileEmptyOrOccupiedByOpponent } from "./generalRules";

export const kingMove=(currentPosition:Position,desiredPosition:Position, team: TeamType,currentBoard: Piece[]):boolean=>{
    if(Math.abs(desiredPosition.x-currentPosition.x)<=1 && Math.abs(desiredPosition.y-currentPosition.y)<=1 && isTileEmptyOrOccupiedByOpponent(desiredPosition,team,currentBoard)){
        return true;
    }
    return false
}