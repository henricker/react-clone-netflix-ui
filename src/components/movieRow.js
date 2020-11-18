/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './movieRow.css';
import { useState } from 'react'
//import icons
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({title, items})=>{

    const [ScrollX, setScrollX] = useState(0)

    const handleLeftArrow = () => {
        let x = ScrollX + Math.round(window.innerWidth / 2);
        if(x > 0){
            x = 0;
        }
        setScrollX(x);
    }

    const handleRightArrow = () => {
        let x = ScrollX - Math.round(window.innerWidth / 2);
        let lengthList = items.results.length * 150;
        if((window.innerWidth - lengthList) > x) {
            x = (window.innerWidth - lengthList) - 60;
        }
        setScrollX(x);
    }   

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
                <NavigateBeforeIcon/>
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                <NavigateNextIcon/>
            </div>
            <div className="movieRow--listareas">
                <div className="movieRow--list" style={{
                    marginLeft: ScrollX,
                    width: items.results.length * 150
                }}>
                    {items.results.length > 0 && items.results.map((item, key)=>(
                        
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}></img>
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
    );
}