import {Piece, Position, TeamType} from "../../constant";
import {commonMovementLogic, isTileEmptyOrOccupiedByOpponent} from "./generalRules";

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
    return false
}