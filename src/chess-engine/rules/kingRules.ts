import { isTileEmptyOrOccupiedByOpponent } from "./generalRules";
import {Piece, Position} from "../../models";
import {TeamType} from "../../Types";

export const kingMove=(currentPosition:Position,desiredPosition:Position, team: TeamType,currentBoard: Piece[]):boolean=>{
    return Math.abs(desiredPosition.x - currentPosition.x) <= 1 && Math.abs(desiredPosition.y - currentPosition.y) <= 1 && isTileEmptyOrOccupiedByOpponent(desiredPosition, team, currentBoard);

}
export const getPossibleKingMoves = (king: Piece, boardstate: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];
    for(let i=-1;i<2;i++){
        for(let j=-1;j<2;j++){
            if(i===0 && j===0 || king.position.x+i>7 || king.position.y+j>7 || king.position.x+i<0 || king.position.y+j<0) continue;
            if(isTileEmptyOrOccupiedByOpponent(new Position(king.position.x+i,king.position.y+j),king.teamType,boardstate)){
                possibleMoves.push(new Position(king.position.x+i,king.position.y+j));
            }
        }
    }
    return possibleMoves;
}