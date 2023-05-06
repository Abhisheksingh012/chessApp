import { bishopMove } from "./bishopRules";
import { rookMove } from "./rookRules";
import {isTileAlreadyOccupied, isTileOccupiedByOpponent} from "./generalRules";
import {Piece, Position} from "../../models";
import {TeamType} from "../../Types";

export const queenMove=(initialPosition: Position, movedPosition: Position, team: TeamType, currentBoard: Piece[]):boolean => {
   return bishopMove(initialPosition,movedPosition,team,currentBoard) || rookMove(initialPosition,movedPosition,team,currentBoard)
}

export const getPossibleQueenMoves = (queen: Piece, boardstate: Piece[]): Position[] => {
   const possibleMoves: Position[] = [];

   // Top movement
   for(let i = 1; i < 8; i++) {
      const destination: Position = new Position(queen.position.x, queen.position.y + i);

      if(!isTileAlreadyOccupied(destination, boardstate)) {
         possibleMoves.push(destination);
      } else if(isTileOccupiedByOpponent(destination, queen.teamType, boardstate)) {
         possibleMoves.push(destination);
         break;
      } else {
         break;
      }
   }

   // Bottom movement
   for(let i = 1; i < 8; i++) {
      const destination: Position = new Position(queen.position.x, queen.position.y - i);

      if(!isTileAlreadyOccupied(destination, boardstate)) {
         possibleMoves.push(destination);
      } else if(isTileOccupiedByOpponent(destination, queen.teamType, boardstate)) {
         possibleMoves.push(destination);
         break;
      } else {
         break;
      }
   }

   // Left movement
   for(let i = 1; i < 8; i++) {
      const destination: Position = new Position(queen.position.x -i , queen.position.y );

      if(!isTileAlreadyOccupied(destination, boardstate)) {
         possibleMoves.push(destination);
      } else if(isTileOccupiedByOpponent(destination, queen.teamType, boardstate)) {
         possibleMoves.push(destination);
         break;
      } else {
         break;
      }
   }

   // Right movement
   for(let i = 1; i < 8; i++) {
      const destination: Position = new Position(queen.position.x+i, queen.position.y);

      if(!isTileAlreadyOccupied(destination, boardstate)) {
         possibleMoves.push(destination);
      } else if(isTileOccupiedByOpponent(destination, queen.teamType, boardstate)) {
         possibleMoves.push(destination);
         break;
      } else {
         break;
      }
   }

   // Upper right movement
   for(let i = 1; i < 8; i++) {
      const destination: Position = new Position(queen.position.x+i, queen.position.y + i);

      if(!isTileAlreadyOccupied(destination, boardstate)) {
         possibleMoves.push(destination);
      } else if(isTileOccupiedByOpponent(destination, queen.teamType, boardstate)) {
         possibleMoves.push(destination);
         break;
      } else {
         break;
      }
   }

   // Bottom right movement
   for(let i = 1; i < 8; i++) {
      const destination: Position = new Position(queen.position.x, queen.position.y - i);

      if(!isTileAlreadyOccupied(destination, boardstate)) {
         possibleMoves.push(destination);
      } else if(isTileOccupiedByOpponent(destination, queen.teamType, boardstate)) {
         possibleMoves.push(destination);
         break;
      } else {
         break;
      }
   }

   // Bottom left movement
   for(let i = 1; i < 8; i++) {
      const destination: Position = new Position(queen.position.x-i, queen.position.y - i);

      if(!isTileAlreadyOccupied(destination, boardstate)) {
         possibleMoves.push(destination);
      } else if(isTileOccupiedByOpponent(destination, queen.teamType, boardstate)) {
         possibleMoves.push(destination);
         break;
      } else {
         break;
      }
   }

   // Top left movement
   for(let i = 1; i < 8; i++) {
      const destination: Position = new Position(queen.position.x-i, queen.position.y + i);

      if(!isTileAlreadyOccupied(destination, boardstate)) {
         possibleMoves.push(destination);
      } else if(isTileOccupiedByOpponent(destination, queen.teamType, boardstate)) {
         possibleMoves.push(destination);
         break;
      } else {
         break;
      }
   }

   return possibleMoves;
}