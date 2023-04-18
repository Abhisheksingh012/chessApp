import {isTileAlreadyOccupied, isTileOccupiedByOpponent} from "./generalRules";
import {Piece, Position, samePosition, TeamType} from "../../constant";

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

export const getPossiblePawnMoves = (pawn: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    const specialRow = pawn.teamType === TeamType.OUR ? 1 : 6;
    const pawnDirection = pawn.teamType === TeamType.OUR ? 1 : -1;

    const normalMove: Position = { x: pawn.position.x, y: pawn.position.y + pawnDirection };
    const specialMove: Position = { x: normalMove.x, y: normalMove.y + pawnDirection };
    const upperLeftAttack: Position = { x: pawn.position.x - 1, y: pawn.position.y + pawnDirection };
    const upperRightAttack: Position = { x: pawn.position.x + 1, y: pawn.position.y + pawnDirection };
    const leftPosition: Position = { x: pawn.position.x - 1, y: pawn.position.y };
    const rightPosition: Position = { x: pawn.position.x + 1, y: pawn.position.y };

    if (!isTileAlreadyOccupied(normalMove, boardState)) {
        possibleMoves.push(normalMove);

        if (pawn.position.y === specialRow &&
            !isTileAlreadyOccupied(specialMove, boardState)) {
            possibleMoves.push(specialMove)
        }
    }

    if (isTileOccupiedByOpponent(upperLeftAttack, pawn.teamType, boardState)) {
        possibleMoves.push(upperLeftAttack);
    } else if (!isTileAlreadyOccupied(upperLeftAttack, boardState)) {
        const leftPiece = boardState.find(p => samePosition(p.position, leftPosition));
        if (leftPiece != null && leftPiece.enPassant) {
            possibleMoves.push(upperLeftAttack);
        }
    }

    if (isTileOccupiedByOpponent(upperRightAttack, pawn.teamType, boardState)) {
        possibleMoves.push(upperRightAttack);
    } else if (!isTileAlreadyOccupied(upperRightAttack, boardState)) {
        const rightPiece = boardState.find(p => samePosition(p.position, rightPosition));
        if (rightPiece != null && rightPiece.enPassant) {
            possibleMoves.push(upperRightAttack);
        }
    }

    return possibleMoves;
}
