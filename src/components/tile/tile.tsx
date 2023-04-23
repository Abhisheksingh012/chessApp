import './tile.css'
import {url} from "inspector";

interface Props {
    position:number;
    image:string | undefined;
    highlight:boolean
}

export default function Tile({position,image,highlight}:Props){
    return(
        <span className={`tile ${(position)%2?'black':'white'}-tile ${highlight?"tile-highlight":''} ${image?"tile-piece-highlight":''} `}>{image && <div className='chess-piece'
                                                                            style={{backgroundImage: `url(${image})`}}>{false}</div>}</span>)

}