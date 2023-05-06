import { Piece, Position } from "../../models";
import { TeamType } from "../../Types";
import {isTileAlreadyOccupied, isTileEmptyOrOccupiedByOpponent, isTileOccupiedByOpponent} from "./generalRules";

export const bishopMove = (initialPosition: Position, desiredPosition: Position, team: TeamType, boardState: Piece[]): boolean => {
    for(let i = 1; i < 8; i++) {
        //Up right movement
        if(desiredPosition.x > initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedPosition = new Position(initialPosition.x + i, initialPosition.y + i);
            //Check if the tile is the destination tile
            if(passedPosition.samePosition(desiredPosition)) {
                //Dealing with destination tile
                if(isTileEmptyOrOccupiedByOpponent(passedPosition, team,boardState)) {
                    return true;
                }
            } else {
                //Dealing with passing tile
                if(isTileAlreadyOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }

        //Bottom right movement
        if(desiredPosition.x > initialPosition.x && desiredPosition.y < initialPosition.y) {
            let passedPosition = new Position(initialPosition.x + i, initialPosition.y - i);
            //Check if the tile is the destination tile
            if(passedPosition.samePosition(desiredPosition)) {
                //Dealing with destination tile
                if(isTileEmptyOrOccupiedByOpponent(passedPosition, team,boardState )) {
                    return true;
                }
            } else {
                if(isTileAlreadyOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }

        //Bottom left movement
        if(desiredPosition.x < initialPosition.x && desiredPosition.y < initialPosition.y) {
            let passedPosition = new Position(initialPosition.x - i, initialPosition.y - i);
            //Check if the tile is the destination tile
            if(passedPosition.samePosition(desiredPosition)) {
                //Dealing with destination tile
                if(isTileEmptyOrOccupiedByOpponent(passedPosition,team,boardState)) {
                    return true;
                }
            } else {
                if(isTileAlreadyOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }

        //Top left movement
        if(desiredPosition.x < initialPosition.x && desiredPosition.y > initialPosition.y) {
            let passedPosition = new Position(initialPosition.x - i, initialPosition.y+i);
            //Check if the tile is the destination tile
            if(passedPosition.samePosition(desiredPosition)) {
                //Dealing with destination tile
                if(isTileEmptyOrOccupiedByOpponent(passedPosition,team,boardState)) {
                    return true;
                }
            } else {
                if(isTileAlreadyOccupied(passedPosition, boardState)) {
                    break;
                }
            }
        }
    }
    return false;
}

export const getPossibleBishopMoves = (bishop: Piece, boardstate: Piece[]): Position[] => {
    const possibleMoves: Position[] = [];

    // Upper right movement
    for(let i = 1; i < 8; i++) {
        const destination = new Position(bishop.position.x + i, bishop.position.y + i);

        if(!isTileAlreadyOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination, bishop.teamType,boardstate)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom right movement
    for(let i = 1; i < 8; i++) {
        const destination = new Position(bishop.position.x + i, bishop.position.y - i);

        if(!isTileAlreadyOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination, bishop.teamType,boardstate)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Bottom left movement
    for(let i = 1; i < 8; i++) {
        const destination = new Position(bishop.position.x - i, bishop.position.y - i);

        if(!isTileAlreadyOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination, bishop.teamType,boardstate)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    // Top left movement
    for(let i = 1; i < 8; i++) {
        const destination = new Position(bishop.position.x - i, bishop.position.y + i);

        if(!isTileAlreadyOccupied(destination, boardstate)) {
            possibleMoves.push(destination);
        } else if(isTileOccupiedByOpponent(destination, bishop.teamType,boardstate)) {
            possibleMoves.push(destination);
            break;
        } else {
            break;
        }
    }

    return possibleMoves;
}