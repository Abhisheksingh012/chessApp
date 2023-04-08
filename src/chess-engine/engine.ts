import {Piece, PieceType, Position, samePosition, TeamType} from "../constant";
import { bishopMove } from "./rules/bishopRules";
import { kingMove } from "./rules/kingRules";
import { knightMove } from "./rules/knightRules";
import { pawnMove } from "./rules/pawnRules";
import {queenMove} from "./rules/queenRules";
import { rookMove } from "./rules/rookRules";

export default class Engine {
    isValidMove(initialPosition:Position,movedPosition:Position, type: PieceType, team: TeamType,currentBoard: Piece[]) {
        switch (type) {
            case PieceType.PAWN:
                return pawnMove(initialPosition.x, initialPosition.y, movedPosition.x, movedPosition.y, team,currentBoard);
            case PieceType.KNIGHT:
                return knightMove(initialPosition,movedPosition,team,currentBoard);
            case PieceType.BISHOP:
                return bishopMove(initialPosition,movedPosition,team,currentBoard);
            case PieceType.ROOK:
                return  rookMove(initialPosition,movedPosition,team,currentBoard);
            case PieceType.QUEEN:
                return queenMove(initialPosition,movedPosition,team,currentBoard)
            case PieceType.KING:
                return kingMove(initialPosition,movedPosition,team,currentBoard)

            default:
                return false
        }
    }








}