import {Piece, PieceType, Position, samePosition, TeamType} from "../constant";
import {bishopMove, getPossibleBishopMoves} from "./rules/bishopRules";
import {getPossibleKingMoves, kingMove} from "./rules/kingRules";
import {getPossibleKnightMoves, knightMove} from "./rules/knightRules";
import {getPossiblePawnMoves, pawnMove} from "./rules/pawnRules";
import {getPossibleQueenMoves, queenMove} from "./rules/queenRules";
import {getPossibleRookMoves, rookMove} from "./rules/rookRules";

export default class Engine {
}