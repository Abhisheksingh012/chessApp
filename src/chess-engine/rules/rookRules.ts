import {Piece, Position, TeamType} from "../../constant";
import {
    commonMovementLogic,
    isTileAlreadyOccupied,
    isTileEmptyOrOccupiedByOpponent,
    isTileOccupiedByOpponent
} from "./generalRules";

export const rookMove = (currentPosition: Position, desiredPosition: Position, team: TeamType, currentBoard: Piece[]): boolean => {
    if (desiredPosition.x != currentPosition.x && desiredPosition.y != currentPosition.y || !isTileEmptyOrOccupiedByOpponent(desiredPosition, team, currentBoard)) {
        return false;
    }
    let direction = {x: 0, y: 0};
    if (desiredPosition.x === currentPosition.x) {
        direction.x = 0;
        direction.y = desiredPosition.y - currentPosition.y >= 0 ? 1 : -1;
    } else {
        direction.y = 0;
        direction.x = desiredPosition.x - currentPosition.x >= 0 ? 1 : -1;
    }
    return commonMovementLogic(currentPosition, desiredPosition, direction, currentBoard);
}

export const getPossibleRookMoves = (rook: Piece, boardstate: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // Top movement
    for(let i = 1; i < 8; i++) {
        const destination: Position = {x: rook.position.x, y: rook.position.y + i};

        if(!isTileAlreadyOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination, rook.teamType, boardstate)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom movement
    for(let i = 1; i < 8; i++) {
        const destination: Position = {x: rook.position.x, y: rook.position.y - i};

        if(!isTileAlreadyOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination, rook.teamType, boardstate)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Left movement
    for(let i = 1; i < 8; i++) {
        const destination: Position = {x: rook.position.x - i, y: rook.position.y};

        if(!isTileAlreadyOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination, rook.teamType, boardstate)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Right movement
    for(let i = 1; i < 8; i++) {
        const destination: Position = {x: rook.position.x + i, y: rook.position.y};

        if(!isTileAlreadyOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination, rook.teamType, boardstate)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    return possibleMoves;
}