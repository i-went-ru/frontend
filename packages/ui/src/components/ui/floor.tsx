import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"
import { Button } from "./button"
import { Cabinet } from "./cabinet"

const floorVariants = cva(
)

interface Paths {
    d: string
    text?: string
    color: string
    id: number
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
    current?: boolean
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

    //@ts-ignore
    menu: React.ReactHTMLElement
}

const Floor = React.forwardRef<HTMLElement, floorProps>(
    ({ setPaths, width = 400, height = 400, paths, menu,className, color, text, isEditResident, isEditMarker, setMarkers, markers, markerRadius, ...props }, ref) => {
        const svgRef = React.useRef(null);
        const [currentPoints, setCurrentPoints] = React.useState<Point[]>([]);
        const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
            const svg = e.currentTarget;
            //@ts-ignore
            const pt = svg.createSVGPoint();

            pt.x = e.clientX;
            pt.y = e.clientY;

            //@ts-ignore
            const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
            setCurrentPoints([...currentPoints, { x: svgPoint.x, y: svgPoint.y }]);
        };

        const handleSvgClickMarker = (e: React.MouseEvent<SVGSVGElement>) => {
            const svg = e.currentTarget;
            //@ts-ignore
            const pt = svg.createSVGPoint();

            pt.x = e.clientX;
            pt.y = e.clientY;

            //@ts-ignore
            const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
            setMarkers!!([...markers, { point: { x: svgPoint.x, y: svgPoint.y }, color: color!!, onClick: () => { } }]);
        };

        const getCenterFromPath = (pathD: any, svgElement: any) => {
            const matches = pathD.match(/\d+\.\d+ \d+\.\d+/g);
            if (!matches) return { x: 0, y: 0 };

            const points = matches.map((match: any) => {
                const [x, y] = match.split(' ').map(Number);
                return { x, y };
            });
            const centerX = points.reduce((sum: any, point: any) => sum + point.x, 0) / points.length;
            const centerY = points.reduce((sum: any, point: any) => sum + point.y, 0) / points.length;
            return {
                x: centerX,
                y: centerY
            };
        };



        const handleCompletePolygon = () => {
            if (currentPoints.length < 3) return;

            const pathD = currentPoints.reduce((acc, point, index) => {
                return acc + `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y} `;
            }, '') + 'Z';

            setPaths!!([...paths, { id:0, d: pathD, color: color!!, text: text }]);
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
                    ref={svgRef}
                    viewBox="0 0 400 400"
                    className={cn(floorVariants({ className }))}
                    onClick={(e) => {
                        if (isEditResident) {
                            handleSvgClick(e)
                        }
                        if (isEditMarker) {
                            handleSvgClickMarker(e)
                        }
                    }}
                >
                    {props.children}
                    {paths.map((path, i) => {
                        const center = svgRef.current ? getCenterFromPath(path.d, svgRef.current) : { x: 0, y: 0 };
                        return (
                            <Cabinet idCabinet={path.id} menu={menu} index={i} x={center.x} y={center.y} path={path} />
                        )

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
                            className={[marker.current ? "fill-red-200": ""].join(" ")}
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
export type { Paths, Marker, Point }
