import {PieceType, TeamType} from "../Types";
import {Pawn} from "./Pawn";
import {Piece} from "./Piece";
import {Position} from "./Position";
import {
    getPossibleBishopMoves,
    getPossibleKingMoves,
    getPossibleKnightMoves,
    getPossiblePawnMoves,
    getPossibleQueenMoves,
    getPossibleRookMoves
} from "../chess-engine/rules";

export class Board {
    pieces: Piece[];
    totalTurns:number=1;

    constructor(pieces: Piece[],totalTurns:number) {
        this.pieces = pieces;
        this.totalTurns=totalTurns;
    }
    get currentTeam(): TeamType {
        return this.totalTurns % 2 === 0 ? TeamType.OPPONENT : TeamType.OUR;
    }
    calculateAllMoves() {
        for (const piece of this.pieces) {
            piece.possibleMoves = this.getValidMoves(piece, this.pieces)
        }
        this.checkCurrentTeamMoves();
        for (const piece of
            this.pieces.filter(p => p.teamType !== this.currentTeam)) {
            piece.possibleMoves = [];
        }
    }
    checkCurrentTeamMoves() {
        for (const piece of this.pieces.filter(p => p.teamType === this.currentTeam)) {
            if (piece.possibleMoves === undefined) continue;
            for (const move of piece.possibleMoves) {
                const simulatedBoard = this.clone();
                simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !p.samePosition(move));
                const clonedPiece = simulatedBoard.pieces.find(p => p.samePiecePosition(piece))!;
                clonedPiece.position = move.clone();
                const clonedKing = simulatedBoard.pieces.find(p => p.isKing && p.teamType === simulatedBoard.currentTeam)!;

                for (const enemy of simulatedBoard.pieces.filter(p => p.teamType !== simulatedBoard.currentTeam)) {
                    enemy.possibleMoves = simulatedBoard.getValidMoves(enemy, simulatedBoard.pieces);

                    if (enemy.isPawn) {
                        if (enemy.possibleMoves.some(m => m.x !== enemy.position.x
                            && m.samePosition(clonedKing.position))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition(move));
                        }
                    } else {
                        if (enemy.possibleMoves.some(m => m.samePosition(clonedKing.position))) {
                            piece.possibleMoves = piece.possibleMoves?.filter(m => !m.samePosition(move));
                        }
                    }
                }
            }
        }
    }
    getValidMoves(piece: Piece, boardState: Piece[]): Position[] {
        switch (piece.pieceType) {
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece, boardState);
            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece, boardState);
            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece, boardState);
            case PieceType.ROOK:
                return getPossibleRookMoves(piece, boardState);
            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece, boardState);
            case PieceType.KING:
                return getPossibleKingMoves(piece, boardState);
            default:
                return [];
        }
    }

    playMove(enPassantMove: boolean,
             validMove: boolean,
             playedPiece: Piece,
             destination: Position): boolean {
        const pawnDirection = playedPiece.teamType === TeamType.OUR ? 1 : -1;

        if (enPassantMove) {
            this.pieces = this.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(playedPiece)) {
                    if (piece.isPawn)
                        (piece as Pawn).enPassant = false;
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    results.push(piece);
                } else if (
                    !piece.samePosition(new Position(destination.x, destination.y - pawnDirection))
                ) {
                    if (piece.isPawn) {
                        (piece as Pawn).enPassant = false;
                    }
                    results.push(piece);
                }

                return results;
            }, [] as Piece[]);

            this.calculateAllMoves();
        } else if (validMove) {
            this.pieces = this.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(playedPiece)) {
                    if (piece.isPawn)
                        (piece as Pawn).enPassant =
                            Math.abs(playedPiece.position.y - destination.y) === 2 &&
                            piece.pieceType === PieceType.PAWN;
                    piece.position.x = destination.x;
                    piece.position.y = destination.y;
                    results.push(piece);
                } else if (!piece.samePosition(destination)) {
                    if (piece.isPawn) {
                        (piece as Pawn).enPassant = false;
                    }
                    results.push(piece);
                }

                return results;
            }, [] as Piece[]);

            this.calculateAllMoves();
        } else {
            return false;
        }

        return true;
    }

    clone(): Board {
        return new Board(this.pieces.map(p => p.clone()),this.totalTurns);
    }
}