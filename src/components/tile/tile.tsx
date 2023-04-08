import './tile.css'
import {url} from "inspector";

interface Props {
    position:number;
    image:string | undefined;
}

export default function Tile({position,image}:Props){
    return(
        <span className={`tile ${(position)%2?'black':'white'}-tile`}>{image && <div className='chess-piece'
                                                                            style={{backgroundImage: `url(${image})`}}></div>}</span>)

}