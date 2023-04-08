import {Piece, PieceType, Position, samePosition, TeamType} from "../constant";

export default class Engine {
    isValidMove(initialPosition:Position,movedPosition:Position, type: PieceType, team: TeamType,currentBoard: Piece[]) {
        switch (type) {
            case PieceType.PAWN:
                return this.pawnMove(initialPosition.x, initialPosition.y, movedPosition.x, movedPosition.y, team,currentBoard);
            case PieceType.KNIGHT:
                return this.knightMove(initialPosition,movedPosition,team,currentBoard);
            case PieceType.BISHOP:
                return  this.bishopMove(initialPosition,movedPosition,team,currentBoard);
            case PieceType.ROOK:
                return  this.rookMove(initialPosition,movedPosition,team,currentBoard);
            case PieceType.QUEEN:
                return this.bishopMove(initialPosition,movedPosition,team,currentBoard) || this.rookMove(initialPosition,movedPosition,team,currentBoard);
            case PieceType.KING:
                return this.kingMove(initialPosition,movedPosition,team,currentBoard)

            default:
                return false
        }
    }

    isTileEmptyOrOccupiedByOpponent(position:Position, team:TeamType,currentBoard: Piece[]): boolean {
        return (!this.isTileAlreadyOccupied(position,currentBoard) || this.isTileOccupiedByOpponent(position,team,currentBoard) )
    }

        isTileAlreadyOccupied(position:Position, currentBoard: Piece[]): boolean {
        const piece = currentBoard.find((piece: Piece) => {
            return samePosition(piece.position,position);
        })
        return !!piece;
    }
    isTileOccupiedByOpponent(position:Position,team:TeamType, currentBoard: Piece[]){
        const piece = currentBoard.find((piece: Piece) => {
            return samePosition(piece.position,position) && team!==piece.teamType;
        });
        return !!piece;
    }
    isEnPassantMove(initialPosition:Position,movedPosition:Position,type:PieceType,team:TeamType,currentBoard:Piece[]){
        const direction = team ? 1 : -1;
        if(type===PieceType.PAWN && movedPosition.y-initialPosition.y===direction && (movedPosition.x-initialPosition.x===-1 || movedPosition.x-initialPosition.x===1)){
            const piece=currentBoard.find((piece:Piece)=>{
                return samePosition(piece.position,{x:movedPosition.x,y:movedPosition.y-direction}) && piece.enPassant;
            })
            return !!piece;
        }
        return false;

    }
    pawnMove(prvX: number, prvY: number, nextX: number, nextY: number, team: TeamType,currentBoard: Piece[]) {
        const baseline = team ? 1 : 6;
        const direction = team ? 1 : -1;
        if (prvY === baseline && prvX === nextX && nextY - prvY === direction * 2) {
            if(!this.isTileAlreadyOccupied({x:nextX, y:nextY},currentBoard) && !this.isTileAlreadyOccupied({
               x: nextX,
               y: nextY-direction
            },currentBoard)){
                return true
            }

        } else if (nextY - prvY === direction && prvX === nextX && !this.isTileAlreadyOccupied({x:nextX, y:nextY},currentBoard)) {
            return true
        }
        else if((nextX-prvX===-1 || nextX-prvX===1) && nextY - prvY === direction){
            if(this.isTileOccupiedByOpponent({x:nextX, y:nextY},team,currentBoard)) return true;
        }
        return false
    }

    knightMove(currentPosition:Position,desiredPosition:Position, team: TeamType,currentBoard: Piece[]) {
        let allowedMovesForX=[-2,-1,1,2];
       for(let allowedMoveForX of allowedMovesForX){
           let allowedMoveForY=3-Math.abs(allowedMoveForX);
           if((samePosition({x:currentPosition.x+allowedMoveForX,y:currentPosition.y+allowedMoveForY},desiredPosition) || samePosition({x:currentPosition.x+allowedMoveForX,y:currentPosition.y+allowedMoveForY*-1},desiredPosition)) && this.isTileEmptyOrOccupiedByOpponent(desiredPosition,team,currentBoard)){
               return true;
           }
       }
    }
    bishopMove(currentPosition:Position,desiredPosition:Position, team: TeamType,currentBoard: Piece[]){
        if(Math.abs(desiredPosition.x-currentPosition.x)!==Math.abs(desiredPosition.y-currentPosition.y) || !this.isTileEmptyOrOccupiedByOpponent(desiredPosition,team,currentBoard)){
            return false;
        }
        const direction={x:desiredPosition.x-currentPosition.x>=0?1:-1,y:desiredPosition.y-currentPosition.y>=0?1:-1};
        return this.commonMovementLogic(currentPosition,desiredPosition,direction,currentBoard);
    }

    rookMove(currentPosition:Position,desiredPosition:Position, team: TeamType,currentBoard: Piece[]){
        if(desiredPosition.x!=currentPosition.x && desiredPosition.y!=currentPosition.y || !this.isTileEmptyOrOccupiedByOpponent(desiredPosition,team,currentBoard)){
            return false;
        }
        let direction={x:0,y:0};
        if(desiredPosition.x===currentPosition.x){
            direction.x=0;
            direction.y=desiredPosition.y-currentPosition.y>=0?1:-1;
        }else{
            direction.y=0;
            direction.x=desiredPosition.x-currentPosition.x>=0?1:-1;
        }
       return this.commonMovementLogic(currentPosition,desiredPosition,direction,currentBoard);
    }
    kingMove(currentPosition:Position,desiredPosition:Position, team: TeamType,currentBoard: Piece[]){
        if(Math.abs(desiredPosition.x-currentPosition.x)<=1 && Math.abs(desiredPosition.y-currentPosition.y)<=1 && this.isTileEmptyOrOccupiedByOpponent(desiredPosition,team,currentBoard)){
            return true;
        }
        return false
    }
    commonMovementLogic(currentPosition:Position,desiredPosition:Position,direction:Position,currentBoard:Piece[]){
        let initialValue= {x:currentPosition.x+direction.x,y:currentPosition.y+direction.y};
        while(initialValue.x!==desiredPosition.x || initialValue.y!==desiredPosition.y){
            if(this.isTileAlreadyOccupied(initialValue,currentBoard)){
                return false;
            }
            initialValue={x:initialValue.x+direction.x,y:initialValue.y+direction.y}
        }
        return true
    }
}