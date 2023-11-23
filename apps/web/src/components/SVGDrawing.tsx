import React, { useState } from 'react';
import { Button } from 'ui';

function SVGDrawing({ paths, setPaths, floor, color, text }: any) {
    const [currentPoints, setCurrentPoints] = useState([]);
    // const [paths, setPaths] = useState([]);
    const handleSvgClick = (e:any) => {
        const { offsetX, offsetY } = e.nativeEvent;
        setCurrentPoints([...currentPoints, { x: offsetX, y: offsetY }]);
    };

    const handleCompletePolygon = () => {
        if (currentPoints.length < 3) return;

        const pathD = currentPoints.reduce((acc, point, index) => {
            return acc + `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y} `;
        }, '') + 'Z';

        setPaths([...paths, pathD]);
        setCurrentPoints([]);
    };

    const handleResetPolygon = () => {
        setPaths([]);
        setCurrentPoints([]);
    };

    const getCenterFromPath = (pathD:string) => {
        const matches = pathD.match(/[L|M] (\d+ \d+)/g);
        if (!matches) return { x: 0, y: 0 };
    
        const points = matches.map(match => {
            const [x, y] = match.split(' ').map(Number).slice(-2); // Получаем последние два числа после L или M
            return { x, y };
        });
    
        const centerX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
        const centerY = points.reduce((sum, point) => sum + point.y, 0) / points.length;
    
        return { x: centerX, y: centerY };
    };
    return (
        <>
            <svg
                width="400" height="400"
                onClick={handleSvgClick}
            //   onMouseDown={handleMouseDown}
            //   onMouseUp={handleMouseUp}
            >
                <image href={`/floor${floor}.svg`} width="400" height="400" />
                {paths.map((d, i) => {
                    const center = getCenterFromPath(d);
                    return (<React.Fragment key={i}>
                        <path id={`path-${i}`} key={i} d={d} fill={color} onClick={() => console.log("Test")} />
                        <text x={center.x} y={center.y} fontSize="6" textAnchor="middle" dominantBaseline="central">
                            {text}
                        </text>
                    </React.Fragment>)

                })}

            </svg>
            <div className='flex justify-between'>
                <Button
                    type="button"
                    variant="default"
                    size="xl"
                    onClick={handleCompletePolygon}
                >Применить</Button>
                <Button
                    type="button"
                    variant="secondary"
                    size="xl"
                    onClick={handleResetPolygon}
                >Сбросить</Button>
            </div>

        </>

    );
}

export default SVGDrawing;
