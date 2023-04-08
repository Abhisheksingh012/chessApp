import {Piece, Position, TeamType} from "../../constant";
import {commonMovementLogic, isTileEmptyOrOccupiedByOpponent } from "./generalRules";

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