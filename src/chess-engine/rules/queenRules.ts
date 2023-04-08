import {Piece, Position, TeamType} from "../../constant";
import { bishopMove } from "./bishopRules";
import { rookMove } from "./rookRules";

export const queenMove=(initialPosition: Position, movedPosition: Position, team: TeamType, currentBoard: Piece[]):boolean => {
   return bishopMove(initialPosition,movedPosition,team,currentBoard) || rookMove(initialPosition,movedPosition,team,currentBoard)
}