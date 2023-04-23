import {initialBoardState, Piece, PieceType, Position, samePosition, TeamType} from "../../constant";
import ChessBoard from "../chessBoard/chessBoard";
import React, {useEffect, useState} from "react";
import {getPossibleKnightMoves, knightMove} from "../../chess-engine/rules/knightRules";
import {getPossibleRookMoves, rookMove} from "../../chess-engine/rules/rookRules";
import {getPossibleQueenMoves, queenMove} from "../../chess-engine/rules/queenRules";
import {getPossiblePawnMoves, pawnMove} from "../../chess-engine/rules/pawnRules";
import {bishopMove, getPossibleBishopMoves} from "../../chess-engine/rules/bishopRules";
import {getPossibleKingMoves, kingMove} from "../../chess-engine/rules/kingRules";
import {isEnPassantMove} from "../../chess-engine/rules/generalRules";

export default  function Engine() {
    const [pieces, setPieces] = useState(initialBoardState);
    const [promotionPawn, setPromotionPawn] = useState<Piece |null>(null);

    useEffect(()=>{
        updatePossibleMoves();
    },[]);
    const updatePossibleMoves=()=>{
        setPieces((currentPieces) => {
            return currentPieces.map(p => {
                p.possibleMoves = getValidMoves(p);
                return p;
            });
        });
    }
    function playMove(currentPiece:Piece,movedPosition:Position):boolean{
        const isPassantMove = isEnPassantMove(currentPiece.position, movedPosition, currentPiece.pieceType, currentPiece.teamType, pieces);
        const direction = currentPiece.teamType ? 1 : -1;
        if (isPassantMove) {
            const updatedPieces = pieces.reduce((result, piece) => {
                if (samePosition(piece.position, currentPiece.position)) {
                    piece.enPassant = false;
                    piece.position.x = movedPosition.x;
                    piece.position.y = movedPosition.y;
                    result.push(piece);
                } else if (!(samePosition(piece.position, {x:movedPosition.x, y: movedPosition.y - direction}))) {
                    result.push(piece);
                }
                return result;
            }, [] as Piece[]);
            updatePossibleMoves();
            setPieces(updatedPieces);
        } else {
            const isValid = isValidMove(currentPiece.position, movedPosition, currentPiece.pieceType, currentPiece.teamType);
            if (isValid) {
                const updatedPieces = pieces.reduce((result, piece) => {
                    if (samePosition(piece.position, currentPiece.position)) {

                        if (piece.pieceType === PieceType.PAWN) {
                            piece.enPassant = Math.abs(currentPiece.position.y - movedPosition.y) === 2;
                            let promotionRow = piece.teamType === TeamType.OUR ? 7 : 0;
                            if (movedPosition.y === promotionRow) {
                                setPromotionPawn(piece);
                            }
                        }
                        piece.position.x = movedPosition.x;
                        piece.position.y = movedPosition.y;

                        result.push(piece);
                    } else if (!(samePosition(piece.position, movedPosition))) {
                        result.push(piece);
                    }
                    return result;
                }, [] as Piece[]);
                updatePossibleMoves()
                setPieces(updatedPieces);
            } else {
            return false;
            }
        }
        return true
    }
   const getValidMoves=(piece: Piece): Position[] =>{
        switch (piece.pieceType) {
            case PieceType.KNIGHT:
                return getPossibleKnightMoves(piece, pieces);
            case PieceType.ROOK:
                return getPossibleRookMoves(piece, pieces);
            case PieceType.QUEEN:
                return getPossibleQueenMoves(piece, pieces);
            case PieceType.PAWN:
                return getPossiblePawnMoves(piece, pieces);
            case PieceType.BISHOP:
                return getPossibleBishopMoves(piece, pieces);
            case PieceType.KING:
                return getPossibleKingMoves(piece, pieces);
            default:
                return [];
        }
    }
    const isValidMove=(initialPosition: Position, movedPosition: Position, type: PieceType, team: TeamType) =>{
        switch (type) {
            case PieceType.PAWN:
                return pawnMove(initialPosition.x, initialPosition.y, movedPosition.x, movedPosition.y, team, pieces);
            case PieceType.KNIGHT:
                return knightMove(initialPosition, movedPosition, team, pieces);
            case PieceType.BISHOP:
                return bishopMove(initialPosition, movedPosition, team, pieces);
            case PieceType.ROOK:
                return rookMove(initialPosition, movedPosition, team, pieces);
            case PieceType.QUEEN:
                return queenMove(initialPosition, movedPosition, team, pieces)
            case PieceType.KING:
                return kingMove(initialPosition, movedPosition, team, pieces)

            default:
                return false
        }
    }
    function promotePawn(pieceType: PieceType) {
        if (!promotionPawn) return
        const updatedPieces = pieces.reduce((results, piece) => {
            if (samePosition(piece.position, promotionPawn.position)) {
                piece.pieceType=pieceType;
                const teamType= promotionTeamType();
                let image='';
                switch(pieceType) {
                    case PieceType.ROOK: {
                        image = "r";
                        break;
                    }
                    case PieceType.BISHOP: {
                        image = "b";
                        break;
                    }
                    case PieceType.KNIGHT: {
                        image = "kn";
                        break;
                    }
                    case PieceType.QUEEN: {
                        image = "q";
                        break;
                    }
                }
                piece.image = `asset/images/${teamType}_${image}.png`;
            }
            results.push(piece);
            return results;
        }, [] as Piece[]);
        updatePossibleMoves();
        setPieces(updatedPieces);
        setPromotionPawn(null);
    }

    function promotionTeamType() {
        if (!promotionPawn) return
        return promotionPawn.teamType === TeamType.OUR ? 'white' : 'black';
    }

    return (<>  {promotionPawn && <div id="pawn-promotion-modal">
        <div className="modal-body">
            <img onClick={() => promotePawn(PieceType.ROOK)} src={`asset/images/${promotionTeamType()}_r.png`}/>
            <img onClick={() => promotePawn(PieceType.KNIGHT)}
                 src={`asset/images/${promotionTeamType()}_kn.png`}/>
            <img onClick={() => promotePawn(PieceType.BISHOP)}
                 src={`asset/images/${promotionTeamType()}_b.png`}/>
            <img onClick={() => promotePawn(PieceType.QUEEN)}
                 src={`asset/images/${promotionTeamType()}_q.png`}/>
        </div>
    </div>}<ChessBoard  playMove={playMove} pieces={pieces}/></>)
}