import {Piece, Position, TeamType} from "../../constant";
import {commonMovementLogic, isTileAlreadyOccupied, isTileEmptyOrOccupiedByOpponent, isTileOccupiedByOpponent } from "./generalRules";

export const bishopMove=(currentPosition:Position,desiredPosition:Position, team: TeamType,currentBoard: Piece[])=> {
    if (Math.abs(desiredPosition.x - currentPosition.x) !== Math.abs(desiredPosition.y - currentPosition.y) || !isTileEmptyOrOccupiedByOpponent(desiredPosition, team, currentBoard)) {
        return false;
    }
    const direction = {
        x: desiredPosition.x - currentPosition.x >= 0 ? 1 : -1,
        y: desiredPosition.y - currentPosition.y >= 0 ? 1 : -1
    };
    return commonMovementLogic(currentPosition, desiredPosition, direction, currentBoard);
}
export const getPossibleBishopMoves = (bishop: Piece, boardstate: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // Upper right movement
    for(let i = 1; i < 8; i++) {
        const destination: Position = {x: bishop.position.x + i, y: bishop.position.y + i};

        if(!isTileAlreadyOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination, bishop.teamType,boardstate )) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom right movement
    for(let i = 1; i < 8; i++) {
        const destination: Position = {x: bishop.position.x + i, y: bishop.position.y - i};

        if(!isTileAlreadyOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination, bishop.teamType, boardstate)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom left movement
    for(let i = 1; i < 8; i++) {
        const destination: Position = {x: bishop.position.x - i, y: bishop.position.y - i};

        if(!isTileAlreadyOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination, bishop.teamType, boardstate)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Top left movement
    for(let i = 1; i < 8; i++) {
        const destination: Position = {x: bishop.position.x - i, y: bishop.position.y + i};

        if(!isTileAlreadyOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination, bishop.teamType, boardstate)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    return possibleMoves;
}