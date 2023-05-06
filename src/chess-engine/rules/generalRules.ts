import {Pawn, Piece, Position} from "../../models";
import {PieceType, TeamType} from "../../Types";

export const commonMovementLogic=(currentPosition:Position,desiredPosition:Position,direction:Position,currentBoard:Piece[]):boolean=>{
    let initialValue= new Position(currentPosition.x+direction.x,currentPosition.y+direction.y);
    while(initialValue.x!==desiredPosition.x || initialValue.y!==desiredPosition.y){
        if(isTileAlreadyOccupied(initialValue,currentBoard)){
            return false;
        }
         initialValue= new Position(initialValue.x+direction.x,initialValue.y+direction.y);
       }
    return true
}
export const isTileEmptyOrOccupiedByOpponent=(position:Position, team:TeamType,currentBoard: Piece[]): boolean =>{
    return (!isTileAlreadyOccupied(position,currentBoard) || isTileOccupiedByOpponent(position,team,currentBoard) )
}

export const isTileAlreadyOccupied=(position:Position, currentBoard: Piece[]):boolean=> {
    const piece = currentBoard.find((piece: Piece) => {
        return piece.samePosition(position);
    })
    return !!piece;
}
export const isTileOccupiedByOpponent=(position:Position,team:TeamType, currentBoard: Piece[]):boolean=>{
    const piece = currentBoard.find((piece: Piece) => {
        return piece.samePosition(position) && team!==piece.teamType;
    });
    return !!piece;
}
