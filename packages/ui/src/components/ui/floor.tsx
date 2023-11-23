import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Button } from "./button"

const floorVariants = cva(
)

interface Paths {
    d: string
    text?: string
    color: string
}

interface Point {
    x: number;
    y: number;
}

interface Marker {
    point: Point
    onClick: () => void
    imageURL?: string
    floor?: number
    color: string
}

export interface floorProps
    extends React.HtmlHTMLAttributes<HTMLElement>,
    VariantProps<typeof floorVariants> {
    paths: Paths[]
    markers: Marker[]
    width?: number
    height?: number
    setPaths?: (paths: Paths[]) => void
    setMarkers?: (markers: Marker[]) => void
    isEditResident: boolean
    markerRadius: number
    isEditMarker: boolean
    text?: string
    color?: string
}

const Floor = React.forwardRef<HTMLElement, floorProps>(
    ({ setPaths, width=400, height=400, paths, className, color, text, isEditResident, isEditMarker, setMarkers, markers, markerRadius, ...props }, ref) => {
        const [currentPoints, setCurrentPoints] = React.useState<Point[]>([]);
        const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
            //@ts-ignore
            const { offsetX, offsetY } = e.nativeEvent;
            setCurrentPoints([...currentPoints, { x: offsetX, y: offsetY }]);
        };

        const handleSvgClickMarker = (e: React.MouseEvent<SVGSVGElement>) => {
            //@ts-ignore
            const { offsetX, offsetY } = e.nativeEvent;
            setMarkers!!([...markers, { point: {x: offsetX, y: offsetY}, onClick: () => {}, color: color!! }]);
          };

        const getCenterFromPath = (pathD: string) => {
            const matches = pathD.match(/[L|M] (\d+ \d+)/g);
            if (!matches) return { x: 0, y: 0 };

            const points = matches.map(match => {
                const [x, y] = match.split(' ').map(Number).slice(-2);
                return { x, y };
            });

            const centerX = points.reduce((sum, point) => sum + point.x, 0) / points.length;
            const centerY = points.reduce((sum, point) => sum + point.y, 0) / points.length;

            return { x: centerX, y: centerY };
        };

        const handleCompletePolygon = () => {
            if (currentPoints.length < 3) return;

            const pathD = currentPoints.reduce((acc, point, index) => {
                return acc + `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y} `;
            }, '') + 'Z';

            setPaths!!([...paths, { d: pathD, color: color!!, text: text }]);
            setCurrentPoints([]);
        };

        const handleResetPolygon = () => {
            setPaths!!([]);
            setCurrentPoints([]);
        };
        return (
            <>
                <svg
                    // width={height} height={width}
                    viewBox="0 0 400 400"
                    className={cn(floorVariants({className }))}
                    onClick={(e) => {
                        if (isEditResident) {
                            handleSvgClick(e)
                        }
                        if (isEditMarker){
                            handleSvgClickMarker(e)
                        }
                    }}
                >
                    {props.children}
                    {paths.map((path, i) => {
                        const center = getCenterFromPath(path.d);
                        return (<React.Fragment key={i}>
                            <path id={`path-${i}`} key={i} d={path.d} fill={path.color} onClick={() => console.log("Test")} />
                            <text x={center.x} y={center.y} fontSize="6" textAnchor="middle" dominantBaseline="central">
                                {path.text}
                            </text>
                        </React.Fragment>)

                    })}
                    {markers.map((marker, index) => (
                        <circle
                            key={index}
                            cx={marker.point.x}
                            cy={marker.point.y}
                            r={markerRadius}
                            fill={marker.color}
                            onClick={() => marker.onClick()}
                            style={{ cursor: 'pointer' }}
                        />
                    ))}

                </svg>
                {isEditResident ?
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
                    </div> : ""}
            </>
        )
    }
)
Floor.displayName = "Fllor"

export { Floor, floorVariants }