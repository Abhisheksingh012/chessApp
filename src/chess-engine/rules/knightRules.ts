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
export const getPossibleKnightMoves = (knight: Piece, boardstate: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    for (let i = -1; i < 2; i += 2) {
        for (let j = -1; j < 2; j += 2) {
            const verticalMove: Position = { x: knight.position.x + j, y: knight.position.y + i * 2 };
            const horizontalMove: Position = { x: knight.position.x + i * 2, y: + knight.position.y + j };

            if(isTileEmptyOrOccupiedByOpponent(verticalMove, knight.teamType,boardstate)) {
                possibleMoves.push(verticalMove);
            }

            if(isTileEmptyOrOccupiedByOpponent(horizontalMove, knight.teamType,boardstate)) {
                possibleMoves.push(horizontalMove);
            }
        }
    }

    return possibleMoves;
}
