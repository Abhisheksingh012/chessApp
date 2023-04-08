import Tile from '../tile/tile';
import './chessBoard.css';
import React, {useReducer, useRef, useState} from "react";
import {Simulate} from "react-dom/test-utils";
import mouseMove = Simulate.mouseMove;
import Engine from "../../chess-engine/engine";

export interface Piece {
    image:string,
    x:number,
    y:number,
    teamType:TeamType,
    pieceType:PieceType,
    enPassant?:boolean
}
export enum TeamType {
    OPPONENT,
    SELF
}
export enum PieceType {
    PAWN,BISHOP,KNIGHT,ROOK,QUEEN,KING
}

const IntialPieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
    const type = p === 0 ? "black" : "white";
    const y = p === 0 ? 7 : 0;
    const team=p === 0 ? TeamType.OPPONENT : TeamType.SELF

    IntialPieces.push({ image: `asset/images/${type}_r.png`, x: 0, y ,teamType:team,pieceType:PieceType.ROOK});
    IntialPieces.push({ image: `asset/images/${type}_r.png`, x: 7, y,teamType:team,pieceType:PieceType.ROOK });
    IntialPieces.push({ image: `asset/images/${type}_kn.png`, x: 1, y ,teamType:team,pieceType:PieceType.KNIGHT});
    IntialPieces.push({ image: `asset/images/${type}_kn.png`, x: 6, y ,teamType:team,pieceType:PieceType.KNIGHT});
    IntialPieces.push({ image: `asset/images/${type}_b.png`, x: 2, y ,teamType:team,pieceType:PieceType.BISHOP});
    IntialPieces.push({ image: `asset/images/${type}_b.png`, x: 5, y ,teamType:team,pieceType:PieceType.BISHOP});
    IntialPieces.push({ image: `asset/images/${type}_q.png`, x: 3, y ,teamType:team,pieceType:PieceType.QUEEN});
    IntialPieces.push({ image: `asset/images/${type}_k.png`, x: 4, y ,teamType:team,pieceType:PieceType.KING});
}

for (let i = 0; i < 8; i++) {
    IntialPieces.push({ image: "asset/images/black_p.png", x: i, y: 6,teamType:TeamType.OPPONENT,pieceType:PieceType.PAWN });
    IntialPieces.push({ image: "asset/images/white_p.png", x: i, y: 1,teamType:TeamType.SELF,pieceType:PieceType.PAWN });
}


export default function ChessBoard() {

const [activePiece,setActivePiece]=useState<HTMLElement |null>(null)
    const [pieces,setPieces]=useState(IntialPieces);
    const [gridX,setGridX]=useState(0);
    const [gridY,setGridY]=useState(0);
    const chessBoardRef=useRef<HTMLDivElement>(null);
    const verticalPositions=[1,2,3,4,5,6,7,8];
    const horizontalPositions =['a','b','c','d','e','f','g','h'];
    const engine =new Engine();

    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        const chessBoard=chessBoardRef.current;
        if (element.classList.contains("chess-piece") && chessBoard) {
            setGridX(Math.floor((e.clientX-chessBoard.offsetLeft)/100));
            setGridY(Math.abs(Math.ceil((e.clientY-chessBoard.offsetTop-800)/100)));
            const x = e.clientX - 50;
            const y = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${x}px`;
            element.style.top = `${y}px`;

            setActivePiece(element);
        }
    }

    function movePiece(e: React.MouseEvent) {
        const chessBoard=chessBoardRef.current;

        if (activePiece && chessBoard) {
            const minLeft=chessBoard.offsetLeft;
            const minTop=chessBoard.offsetTop;
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
            let x = Math.floor((e.clientX - chessBoard.offsetLeft) / 100);
            let y = Math.abs(Math.ceil((e.clientY - chessBoard.offsetTop - 800) / 100));
            const currentPiece = pieces.find((piece) => piece.x === gridX && piece.y === gridY);
            if (currentPiece) {
                const isPassantMove = engine.isEnPassantMove(currentPiece.x, currentPiece.y, x, y, currentPiece.pieceType, currentPiece.teamType, pieces);
                const direction = currentPiece.teamType ? 1 : -1;
                if (isPassantMove) {
                    const updatedPieces = pieces.reduce((result, piece) => {
                        if (piece.x === gridX && piece.y === gridY) {
                            piece.enPassant = false;
                            piece.x = x;
                            piece.y = y;
                            result.push(piece);
                        } else if (!(piece.x === x && piece.y === y - direction)) {
                            result.push(piece);
                        }
                        return result;
                    }, [] as Piece[]);
                    setPieces(updatedPieces);
                } else {
                    const isValid = engine.isValidMove(currentPiece.x, currentPiece.y, x, y, currentPiece.pieceType, currentPiece.teamType, pieces);
                    if (isValid) {
                        const updatedPieces = pieces.reduce((result, piece) => {
                            if (piece.x === gridX && piece.y === gridY) {

                                if (piece.pieceType === PieceType.PAWN) {
                                    piece.enPassant = Math.abs(gridY - y) === 2
                                }
                                piece.x = x;
                                piece.y = y;
                                result.push(piece);
                            } else if (!(piece.x === x && piece.y === y)) {
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
                let image = undefined;

                pieces.forEach((p) => {
                    if (p.x === i && p.y === j) {

                        image = p.image;
                    }
                });

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