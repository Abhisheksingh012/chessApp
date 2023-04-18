import {Piece, PieceType, Position, samePosition, TeamType} from "../constant";
import {bishopMove, getPossibleBishopMoves} from "./rules/bishopRules";
import {getPossibleKingMoves, kingMove} from "./rules/kingRules";
import {getPossibleKnightMoves, knightMove} from "./rules/knightRules";
import {getPossiblePawnMoves, pawnMove} from "./rules/pawnRules";
import {getPossibleQueenMoves, queenMove} from "./rules/queenRules";
import {getPossibleRookMoves, rookMove} from "./rules/rookRules";

export default class Engine {
    isValidMove(initialPosition: Position, movedPosition: Position, type: PieceType, team: TeamType, currentBoard: Piece[]) {
        switch (type) {
            case PieceType.PAWN:
                return pawnMove(initialPosition.x, initialPosition.y, movedPosition.x, movedPosition.y, team, currentBoard);
            case PieceType.KNIGHT:
                return knightMove(initialPosition, movedPosition, team, currentBoard);
            case PieceType.BISHOP:
                return bishopMove(initialPosition, movedPosition, team, currentBoard);
            case PieceType.ROOK:
                return rookMove(initialPosition, movedPosition, team, currentBoard);
            case PieceType.QUEEN:
                return queenMove(initialPosition, movedPosition, team, currentBoard)
            case PieceType.KING:
                return kingMove(initialPosition, movedPosition, team, currentBoard)

            default:
                return false
        }
    }

    getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
        switch (piece.pieceType) {
            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece, boardState);
            case PieceType.ROOK:
                return getPossibleRookMoves(piece, boardState);
            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece, boardState);
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece, boardState);
            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece, boardState);
            case PieceType.KING:
                return getPossibleKingMoves(piece, boardState);
            default:
                return [];
        }
    }
}