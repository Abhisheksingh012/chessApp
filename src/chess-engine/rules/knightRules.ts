import {Piece, Position, samePosition, TeamType} from "../../constant";
import { isTileEmptyOrOccupiedByOpponent } from "./generalRules";

export const knightMove=(currentPosition:Position,desiredPosition:Position, team: TeamType,currentBoard: Piece[]):boolean=> {
    let allowedMovesForX=[-2,-1,1,2];
    for(let allowedMoveForX of allowedMovesForX){
        let allowedMoveForY=3-Math.abs(allowedMoveForX);
        if((samePosition({x:currentPosition.x+allowedMoveForX,y:currentPosition.y+allowedMoveForY},desiredPosition) || samePosition({x:currentPosition.x+allowedMoveForX,y:currentPosition.y+allowedMoveForY*-1},desiredPosition)) && isTileEmptyOrOccupiedByOpponent(desiredPosition,team,currentBoard)){
            return true;
        }
    }
    return false;
}
