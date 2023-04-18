import {Piece, Position, TeamType} from "../../constant";
import { isTileEmptyOrOccupiedByOpponent } from "./generalRules";

export const kingMove=(currentPosition:Position,desiredPosition:Position, team: TeamType,currentBoard: Piece[]):boolean=>{
    if(Math.abs(desiredPosition.x-currentPosition.x)<=1 && Math.abs(desiredPosition.y-currentPosition.y)<=1 && isTileEmptyOrOccupiedByOpponent(desiredPosition,team,currentBoard)){
        return true;
    }
    return false
}
export const getPossibleKingMoves = (king: Piece, boardstate: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];
    for(let i=-1;i<2;i++){
        for(let j=-1;j<2;j++){
            if(i===0 && j===0) continue;
            if(isTileEmptyOrOccupiedByOpponent({x:king.position.x+i,y:king.position.y+j},king.teamType,boardstate)){
                possibleMoves.push({x:king.position.x+i,y:king.position.y+j});
            }
        }
    }
    return possibleMoves;
}