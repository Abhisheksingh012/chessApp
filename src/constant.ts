export const verticalPositions = ["1", "2", "3", "4", "5", "6", "7", "8"];
export const horizontalPositions = ["a", "b", "c", "d", "e", "f", "g", "h"];

export const GRID_SIZE = 100;

export function samePosition(p1: Position, p2: Position) {
    return p1.x === p2.x && p1.y === p2.y;
}

export interface Position {
    x: number;
    y: number;
}

export enum PieceType {
    PAWN,
    BISHOP,
    KNIGHT,
    ROOK,
    QUEEN,
    KING,
}

export enum TeamType {
    OPPONENT,
    OUR,
}

export interface Piece {
    image: string;
    position: Position;
    pieceType: PieceType;
    teamType: TeamType;
    enPassant?: boolean;
}

export const initialBoardState: Piece[] = [
    {
        image: `asset/images/black_r.png`,
        position: {
            x: 0,
            y: 7,
        },
        pieceType: PieceType.ROOK,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_kn.png`,
        position: {
            x: 1,
            y: 7,
        },
        pieceType: PieceType.KNIGHT,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_b.png`,
        position: {
            x: 2,
            y: 7,
        },
        pieceType: PieceType.BISHOP,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_q.png`,
        position: {
            x: 3,
            y: 7,
        },
        pieceType: PieceType.QUEEN,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_k.png`,
        position: {
            x: 4,
            y: 7,
        },
        pieceType: PieceType.KING,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_b.png`,
        position: {
            x: 5,
            y: 7,
        },
        pieceType: PieceType.BISHOP,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_kn.png`,
        position: {
            x: 6,
            y: 7,
        },
        pieceType: PieceType.KNIGHT,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_r.png`,
        position: {
            x: 7,
            y: 7,
        },
        pieceType: PieceType.ROOK,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_p.png`,
        position: {
            x: 0,
            y: 6,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_p.png`,
        position: {
            x: 1,
            y: 6,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_p.png`,
        position: {
            x: 2,
            y: 6,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_p.png`,
        position: {
            x: 3,
            y: 6,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_p.png`,
        position: {
            x: 4,
            y: 6,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_p.png`,
        position: {
            x: 5,
            y: 6,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_p.png`,
        position: {
            x: 6,
            y: 6,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OPPONENT,
    },
    {
        image: `asset/images/black_p.png`,
        position: {
            x: 7,
            y: 6,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OPPONENT,
    },

    {
        image: `asset/images/white_r.png`,
        position: {
            x: 0,
            y: 0,
        },
        pieceType: PieceType.ROOK,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_kn.png`,
        position: {
            x: 1,
            y: 0,
        },
        pieceType: PieceType.KNIGHT,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_b.png`,
        position: {
            x: 2,
            y: 0,
        },
        pieceType: PieceType.BISHOP,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_q.png`,
        position: {
            x: 3,
            y: 0,
        },
        pieceType: PieceType.QUEEN,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_k.png`,
        position: {
            x: 4,
            y: 0,
        },
        pieceType: PieceType.KING,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_b.png`,
        position: {
            x: 5,
            y: 0,
        },
        pieceType: PieceType.BISHOP,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_kn.png`,
        position: {
            x: 6,
            y: 0,
        },
        pieceType: PieceType.KNIGHT,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_r.png`,
        position: {
            x: 7,
            y: 0,
        },
        pieceType: PieceType.ROOK,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_p.png`,
        position: {
            x: 0,
            y: 1,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_p.png`,
        position: {
            x: 1,
            y: 1,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_p.png`,
        position: {
            x: 2,
            y: 1,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_p.png`,
        position: {
            x: 3,
            y: 1,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_p.png`,
        position: {
            x: 4,
            y: 1,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_p.png`,
        position: {
            x: 5,
            y: 1,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_p.png`,
        position: {
            x: 6,
            y: 1,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OUR,
    },
    {
        image: `asset/images/white_p.png`,
        position: {
            x: 7,
            y: 1,
        },
        pieceType: PieceType.PAWN,
        teamType: TeamType.OUR,
    },
];