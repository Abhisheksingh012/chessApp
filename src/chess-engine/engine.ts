import {Piece, PieceType, TeamType} from "../components/chessBoard/chessBoard";

export default class Engine {
    isValidMove(prvX: number, prvY: number, nextX: number, nextY: number, type: PieceType, team: TeamType,currentBoard: Piece[]) {
        switch (type) {
            case 0:
                return this.PawnMove(prvX, prvY, nextX, nextY, type, team,currentBoard)
            default:
                return false
        }
    }

    isTileAlreadyOccupied(x: number, y: number, currentBoard: Piece[]): boolean {
        const piece = currentBoard.find((piece: Piece) => {
            return piece.x === x && piece.y===y;
        })
        return !!piece;
    }
    isTileOccupiedByOpponent(x: number, y: number,team:TeamType, currentBoard: Piece[]){
        const piece = currentBoard.find((piece: Piece) => {
            return piece.x === x && piece.y===y && team!==piece.teamType;
        });
        return !!piece;
    }
    isEnPassantMove(px:number,py:number,x:number,y:number,type:PieceType,team:TeamType,currentBoard:Piece[]){
        const direction = team ? 1 : -1;
        if(type===PieceType.PAWN && y-py===direction && (x-px===-1 || x-px===1)){
            const piece=currentBoard.find((piece:Piece)=>{
                return piece.x===x && piece.y===y-direction && piece.enPassant;
            })
            return !!piece;
        }
        return false;

    }
    PawnMove(prvX: number, prvY: number, nextX: number, nextY: number, type: PieceType, team: TeamType,currentBoard: Piece[]) {
        const baseline = team ? 1 : 6;
        const direction = team ? 1 : -1;
        if (prvY === baseline && prvX === nextX && nextY - prvY === direction * 2) {
            if(!this.isTileAlreadyOccupied(nextX,nextY,currentBoard) && !this.isTileAlreadyOccupied(nextX,nextY-direction,currentBoard)){
                return true
            }

        } else if (nextY - prvY === direction && prvX === nextX && !this.isTileAlreadyOccupied(nextX,nextY,currentBoard)) {
            return true
        }
        else if((nextX-prvX===-1 || nextX-prvX===1) && nextY - prvY === direction){
            if(this.isTileOccupiedByOpponent(nextX,nextY,team,currentBoard)) return true;
        }
        return false
    }
}