import Tile from '../tile/tile';
import './chessBoard.css';
import React, {useReducer, useRef, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import mouseMove = Simulate.mouseMove;
import Engine from "../../chess-engine/engine";
import {
    GRID_SIZE,
    horizontalPositions,
    initialBoardState,
    Piece,
    PieceType,
    samePosition,
    verticalPositions
} from "../../constant";
import {isEnPassantMove} from "../../chess-engine/rules/generalRules";



export default function ChessBoard() {

const [activePiece,setActivePiece]=useState<HTMLElement |null>(null)
    const [pieces,setPieces]=useState(initialBoardState);
    const [grabPosition,setGrabPosition]=useState({x:-1,y:-1});
    const chessBoardRef=useRef<HTMLDivElement>(null);
    const engine =new Engine();

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessboard = chessBoardRef.current;
        if (element.classList.contains("chess-piece") && chessboard) {
            const grabX = Math.floor((e.clientX - chessboard.offsetLeft) / GRID_SIZE);
            const grabY = Math.abs(
                Math.ceil((e.clientY - chessboard.offsetTop - 800) / GRID_SIZE)
            );
            setGrabPosition({ x: grabX, y: grabY });

            const x = e.clientX - GRID_SIZE / 2;
            const y = e.clientY - GRID_SIZE / 2;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }


    function movePiece(e: React.MouseEvent) {

        const chessBoard=chessBoardRef.current;

        if (activePiece && chessBoard) {
            const minLeft=chessBoard.offsetLeft-25;
            const minTop=chessBoard.offsetTop-25;
            const minRight=chessBoard.offsetLeft+chessBoard.offsetWidth-80;
            const minBottom=chessBoard.offsetTop+chessBoard.offsetHeight-80;
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            activePiece.style.position = "absolute";
            activePiece.style.left = minLeft>x?`${minLeft}px`:minRight<x?`${minRight}px`:`${x}px`;
            activePiece.style.top = minTop>y?`${minTop}px`:minBottom<y?`${minBottom}px`:`${y}px`;
        }
    }

    function dropPiece(e: React.MouseEvent) {
        const chessBoard = chessBoardRef.current;
        if (activePiece && chessBoard) {
            let x = Math.floor((e.clientX - chessBoard.offsetLeft) / GRID_SIZE);
            let y = Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 800) / GRID_SIZE));
            const currentPiece = pieces.find((piece) => samePosition(piece.position,grabPosition));
            if (currentPiece) {
                const isPassantMove = isEnPassantMove(grabPosition, {x, y}, currentPiece.pieceType, currentPiece.teamType, pieces);
                const direction = currentPiece.teamType ? 1 : -1;
                if (isPassantMove) {
                    const updatedPieces = pieces.reduce((result, piece) => {
                        if (samePosition(piece.position,grabPosition)) {
                            piece.enPassant = false;
                            piece.position.x = x;
                            piece.position.y = y;
                            result.push(piece);
                        } else if (!(samePosition(piece.position,{x,y:y-direction}))) {
                            result.push(piece);
                        }
                        return result;
                    }, [] as Piece[]);
                    setPieces(updatedPieces);
                } else {
                    const isValid = engine.isValidMove(grabPosition,{x,y}, currentPiece.pieceType, currentPiece.teamType, pieces);
                    if (isValid) {
                        const updatedPieces = pieces.reduce((result, piece) => {
                            if (samePosition(piece.position,grabPosition)) {

                                if (piece.pieceType === PieceType.PAWN) {
                                    piece.enPassant = Math.abs(grabPosition.y - y) === 2
                                }
                                piece.position.x = x;
                                piece.position.y = y;
                                result.push(piece);
                            } else if (!(samePosition(piece.position,{x,y}))) {
                                result.push(piece);
                            }
                            return result;
                        }, [] as Piece[]);
                        setPieces(updatedPieces);
                    } else {
                        activePiece.style.position = "relative";
                        activePiece.style.removeProperty('top');
                        activePiece.style.removeProperty('left');
                    }
                }
                setActivePiece(null);
            }
        }
    }

        let board = [];



        for (let j = verticalPositions.length - 1; j >= 0; j--) {
            for (let i = 0; i < horizontalPositions.length; i++) {
                const number = j + i + 2;
                const piece = pieces.find((p) =>
                    samePosition(p.position, { x: i, y: j })
                );
                let image = piece ? piece.image : undefined;

                board.push(<Tile key={`${j},${i}`} image={image} position={number} />);
            }
        }

        return (
            <div
                onMouseMove={(e) => movePiece(e)}
                onMouseDown={(e) => grabPiece(e)}
                onMouseUp={(e) => dropPiece(e)}
                id="chessboard"
                ref={chessBoardRef}
            >
                {board}
            </div>
        );
}