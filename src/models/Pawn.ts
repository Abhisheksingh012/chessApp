import { PieceType, TeamType } from "../Types";
import { Position } from "./Position";
import {Piece} from "./Piece";

export class Pawn extends Piece {
    enPassant?: boolean;
    constructor(position: Position,
                team: TeamType, enPassant?: boolean,
                possibleMoves: Position[] = []) {
        super(position, PieceType.PAWN, team, possibleMoves);
        this.enPassant = enPassant;
    }
    clone(): Pawn {
        return new Pawn(this.position.clone(),
            this.teamType, this.enPassant, this.possibleMoves?.map(m => m.clone()))
    }
}