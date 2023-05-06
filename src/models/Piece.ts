import { TeamType, PieceType } from "../Types";
import { Position } from "./Position";

export class Piece {
    image: string;
    position: Position;
    pieceType: PieceType;
    teamType: TeamType;
    possibleMoves?: Position[];
    constructor(position: Position, pieceType: PieceType,
                team: TeamType, possibleMoves: Position[] = []) {
        this.image = `asset/images/${team}_${pieceType}.png`;
        this.position = position;
        this.pieceType = pieceType;
        this.teamType = team;
        this.possibleMoves = possibleMoves;
    }

    get isPawn() : boolean {
        return this.pieceType === PieceType.PAWN
    }

    get isRook() : boolean {
        return this.pieceType === PieceType.ROOK
    }

    get isKnight() : boolean {
        return this.pieceType === PieceType.KNIGHT
    }

    get isBishop() : boolean {
        return this.pieceType === PieceType.BISHOP
    }

    get isKing() : boolean {
        return this.pieceType === PieceType.KING
    }

    get isQueen() : boolean {
        return this.pieceType === PieceType.QUEEN
    }

    samePiecePosition(otherPiece: Piece) : boolean {
        return this.position.samePosition(otherPiece.position);
    }

    samePosition(otherPosition: Position) : boolean {
        return this.position.samePosition(otherPosition);
    }
    clone(): Piece {
        return new Piece(this.position.clone(),
            this.pieceType, this.teamType,
            this.possibleMoves?.map(m => m.clone()));
    }
}