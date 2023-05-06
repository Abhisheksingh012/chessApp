import { useEffect, useRef, useState } from "react";
import {Board, Pawn, Piece, Position} from "../../models";
import {initialBoard} from "../../constant";
import {PieceType, TeamType} from "../../Types";
import {bishopMove, kingMove, knightMove, pawnMove, queenMove, rookMove} from "../../chess-engine/rules";
import ChessBoard from "../chessBoard/chessBoard";

export default function Referee() {
    const [board, setBoard] = useState<Board>(initialBoard);
    const [promotionPawn, setPromotionPawn] = useState<Piece>();

    useEffect(() => {
        updatePossibleMoves();
    }, []);

    function updatePossibleMoves() {
        board.calculateAllMoves();
    }

    function playMove(playedPiece: Piece, destination: Position): boolean {
        let playedMoveIsValid = false;

        const validMove = isValidMove(
            playedPiece.position,
            destination,
            playedPiece.pieceType,
            playedPiece.teamType
        );

        const enPassantMove = isEnPassantMove(
            playedPiece.position,
            destination,
            playedPiece.pieceType,
            playedPiece.teamType
        );

        // playMove modifies the board thus we
        // need to call setBoard
        setBoard((previousBoard) => {
            // Playing the move
            playedMoveIsValid = board.playMove(enPassantMove,
                validMove, playedPiece,
                destination);

            return board.clone();
        })

        // This is for promoting a pawn
        let promotionRow = (playedPiece.teamType === TeamType.OUR) ? 7 : 0;

        if (destination.y === promotionRow && playedPiece.isPawn) {
            setPromotionPawn((previousPromotionPawn) => {
                const clonedPlayedPiece = playedPiece.clone();
                clonedPlayedPiece.position = destination.clone();
                return clonedPlayedPiece;
            });
        }
        return playedMoveIsValid;
    }

    function isEnPassantMove(
        initialPosition: Position,
        desiredPosition: Position,
        type: PieceType,
        team: TeamType
    ) {
        const pawnDirection = team === TeamType.OUR ? 1 : -1;

        if (type === PieceType.PAWN) {
            if (
                (desiredPosition.x - initialPosition.x === -1 ||
                    desiredPosition.x - initialPosition.x === 1) &&
                desiredPosition.y - initialPosition.y === pawnDirection
            ) {
                const piece = board.pieces.find(
                    (p) =>
                        p.position.x === desiredPosition.x &&
                        p.position.y === desiredPosition.y - pawnDirection &&
                        p.isPawn &&
                        (p as Pawn).enPassant
                );
                if (piece) {
                    return true;
                }
            }
        }

        return false;
    }

    //TODO
    //Pawn promotion!
    //Prevent the king from moving into danger!
    //Add castling!
    //Add check!
    //Add checkmate!
    //Add stalemate!
    function isValidMove(initialPosition: Position, desiredPosition: Position, type: PieceType, team: TeamType) {
        let validMove = false;
        switch (type) {
            case PieceType.PAWN:
                validMove = pawnMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.KNIGHT:
                validMove = knightMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.BISHOP:
                validMove = bishopMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.ROOK:
                validMove = rookMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.QUEEN:
                validMove = queenMove(initialPosition, desiredPosition, team, board.pieces);
                break;
            case PieceType.KING:
                validMove = kingMove(initialPosition, desiredPosition, team, board.pieces);
        }

        return validMove;
    }

    function promotePawn(pieceType: PieceType) {
        if (promotionPawn === undefined) {
            return;
        }


        setBoard((previousBoard) => {
            const clonedBoard = board.clone();
            clonedBoard.pieces = clonedBoard.pieces.reduce((results, piece) => {
                if (piece.samePiecePosition(promotionPawn)) {
                    results.push(new Piece(piece.position.clone(), pieceType,
                        piece.teamType));
                } else {
                    results.push(piece);
                }
                return results;
            }, [] as Piece[]);
            clonedBoard.calculateAllMoves();

            return clonedBoard;
        })
        setPromotionPawn(undefined);
    }

    function promotionTeamType() {
        return (promotionPawn?.teamType === TeamType.OUR) ? "white" : "black";
    }

    return (
        <>
            {promotionPawn && <div id="pawn-promotion-modal">
                <div className="modal-body">
                    <img onClick={() => promotePawn(PieceType.ROOK)}
                         src={`/asset/images/${promotionTeamType()}_rook.png`} alt='rook.png'/>
                    <img onClick={() => promotePawn(PieceType.BISHOP)}
                         src={`/asset/images/${promotionTeamType()}_bishop.png`} alt="bishop.png"/>
                    <img onClick={() => promotePawn(PieceType.KNIGHT)}
                         src={`/asset/images/${promotionTeamType()}_knight.png`} alt="knight.png"/>
                    <img onClick={() => promotePawn(PieceType.QUEEN)}
                         src={`/asset/images/${promotionTeamType()}_queen.png`} alt="queen.png"/>
                </div>
            </div>}
            <ChessBoard playMove={playMove}
                        pieces={board.pieces} />
        </>
    )
}