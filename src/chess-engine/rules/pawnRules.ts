import { TeamType } from "../../Types";
import {Pawn, Piece, Position} from "../../models";
import {isTileAlreadyOccupied, isTileOccupiedByOpponent} from "./generalRules";

export const pawnMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    const specialRow = team === TeamType.OUR ? 1 : 6;
    const pawnDirection = team === TeamType.OUR ? 1 : -1;

    if (
        initialPosition.x === desiredPosition.x &&
        initialPosition.y === specialRow &&
        desiredPosition.y - initialPosition.y === 2 * pawnDirection
    ) {
        if (
            !isTileAlreadyOccupied(desiredPosition, boardState) &&
            !isTileAlreadyOccupied(
                new Position(desiredPosition.x, desiredPosition.y - pawnDirection),
                boardState
            )
        ) {
            return true;
        }
    } else if (
        initialPosition.x === desiredPosition.x &&
        desiredPosition.y - initialPosition.y === pawnDirection
    ) {
        if (!isTileAlreadyOccupied(desiredPosition, boardState)) {
            return true;
        }
    }
    else if (
        desiredPosition.x - initialPosition.x === -1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
    ) {
        if (isTileOccupiedByOpponent(desiredPosition, team,boardState)) {
            return true;
        }
    } else if (
        desiredPosition.x - initialPosition.x === 1 &&
        desiredPosition.y - initialPosition.y === pawnDirection
    ) {
        if (isTileOccupiedByOpponent(desiredPosition, team,boardState)) {
            return true;
        }
    }

    return false;
}

export const getPossiblePawnMoves = (pawn: Piece, boardState: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    const specialRow = pawn.teamType === TeamType.OUR ? 1 : 6;
    const pawnDirection = pawn.teamType === TeamType.OUR ? 1 : -1;

    const normalMove = new Position(pawn.position.x, pawn.position.y + pawnDirection);
    const specialMove = new Position(normalMove.x, normalMove.y + pawnDirection);
    const upperLeftAttack = new Position(pawn.position.x - 1, pawn.position.y + pawnDirection);
    const upperRightAttack = new Position(pawn.position.x + 1, pawn.position.y + pawnDirection);
    const leftPosition = new Position(pawn.position.x - 1, pawn.position.y);
    const rightPosition = new Position(pawn.position.x + 1, pawn.position.y);

    if (!isTileAlreadyOccupied(normalMove, boardState)) {
        possibleMoves.push(normalMove);

        if (pawn.position.y === specialRow &&
            !isTileAlreadyOccupied(specialMove, boardState)) {
            possibleMoves.push(specialMove)
        }
    }

    if (isTileOccupiedByOpponent(upperLeftAttack, pawn.teamType,boardState)) {
        possibleMoves.push(upperLeftAttack);
    } else if (!isTileAlreadyOccupied(upperLeftAttack, boardState)) {
        const leftPiece = boardState.find(p => p.samePosition(leftPosition));
        if (leftPiece != null && (leftPiece as Pawn).enPassant) {
            possibleMoves.push(upperLeftAttack);
        }
    }

    if (isTileOccupiedByOpponent(upperRightAttack, pawn.teamType,boardState)) {
        possibleMoves.push(upperRightAttack);
    } else if (!isTileAlreadyOccupied(upperRightAttack, boardState)) {
        const rightPiece = boardState.find(p => p.samePosition(rightPosition));
        if (rightPiece != null && (rightPiece as Pawn).enPassant) {
            possibleMoves.push(upperRightAttack);
        }
    }

    return possibleMoves;
}