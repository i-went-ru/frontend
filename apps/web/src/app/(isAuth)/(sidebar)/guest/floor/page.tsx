"use client";
import Link from "next/link";
import useSWR from "swr";
import { Dialog, Transition } from '@headlessui/react'
import { Button, Floor, Marker, Paths, Point, StreetView2D } from "ui";
import React, { Fragment, useEffect, useState } from 'react';
import { fetcherSWR } from "../../../../../utils/fetch";
import AdminContextMenu from "../../../../../components/AdminContextMenu";


interface Cabinet {
    id: number
    resident: number
    cabinet_number: string
    color: string
    path: string
}

interface MapPhoto {
    x: number
    y: number
    color: string
    image: string
}

interface Func {
    leftClick: () => void
    rightClick: () => void
    forwardClick: () => void
    backClick: () => void
}

export default function Page() {
    const { data, error, isLoading } = useSWR<Cabinet[]>('/cabinets/', fetcherSWR)
    const { data: markerData, } = useSWR<MapPhoto[]>('/map_photos/', fetcherSWR)
    const [paths, setPaths] = useState<Paths[]>([])
    const [markers, setMarkers] = useState<Marker[]>([])
    const [open, setOpen] = useState(false);
    const [currentMarker, setCurrentMarker] = useState<Marker>(null)
    const [func, setFunc] = useState<Func>({
        leftClick: () => { },
        rightClick: () => { },
        forwardClick: () => { },
        backClick: () => { },
    })


    useEffect(() => {
        if (data) {
            const newPaths = data.map(path => ({
                d: path.path,
                text: path.cabinet_number + "",
                color: path.color,
                id: path.id,
            }));
            setPaths(newPaths);
        }
    }, [data]);

    useEffect(() => {
        if (markerData) {
            const newMarkers = markerData.map(marker => ({
                point: { x: marker.x, y: marker.y },
                onClick: () => { },
                color: marker.color,
                imageURL: marker.image,
                current: false,
            }));
            const newMarkersMap = newMarkers.map((marker) => {
                marker.onClick = () => {
                    setCurrentMarker(marker)
                    const { left, right, up, down } = findNearestMarkers({ x: marker.point.x, y: marker.point.y }, newMarkers)
                    setFunc({
                        leftClick: () => {
                            if (left) {
                                marker.current = false
                                setCurrentMarker(left)
                                left.onClick()
                            }
                        },
                        rightClick: () => {
                            if (right) {
                                marker.current = false
                                setCurrentMarker(right)
                                right.onClick()
                            }
                        },
                        forwardClick: () => {
                            if (up) {
                                marker.current = false
                                setCurrentMarker(up)
                                up.onClick()
                            }
                        },
                        backClick: () => {
                            if (down) {
                                marker.current = false
                                setCurrentMarker(down)
                                down.onClick()
                            }
                        },
                    })
                    marker.current = true
                    setOpen(true);
                }
                return marker;
            });
            setMarkers(newMarkersMap);
        }
    }, [markerData]);

    const euclideanDistance = (point1: Point, point2: Point): number => {
        return Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
    }

    function closeModal() {
        setOpen(false)
        const newMarkersMap = markers.map((marker) => {
            if (marker === currentMarker) {
                marker.current = false
            }
            return marker;
        });
        setMarkers(newMarkersMap)
    }

    const findNearestMarkers = (currentPoint: Point, markers: Marker[]): { left: Marker | null; right: Marker | null; up: Marker | null; down: Marker | null } => {
        let left: Marker | null = null;
        let right: Marker | null = null;
        let up: Marker | null = null;
        let down: Marker | null = null;
        let minDistanceToLeft = Infinity;
        let minDistanceToRight = Infinity;
        let minDistanceToUp = Infinity;
        let minDistanceToDown = Infinity;

        for (const marker of markers) {
            const distance = euclideanDistance(currentPoint, marker.point);

            if (marker.point.x < currentPoint.x && distance < minDistanceToLeft) {
                left = marker;
                minDistanceToLeft = distance;
            }
            if (marker.point.x > currentPoint.x && distance < minDistanceToRight) {
                right = marker;
                minDistanceToRight = distance;
            }
            if (marker.point.y < currentPoint.y && distance < minDistanceToUp) {
                up = marker;
                minDistanceToUp = distance;
            }
            if (marker.point.y > currentPoint.y && distance < minDistanceToDown) {
                down = marker;
                minDistanceToDown = distance;
            }
        }

        return { left, right, up, down };
    };


    return (
        <div>
            <div>
                <Button asChild={true}>
                    <Link href={"/admin/floor/cabinet"}>
                        Добавить кабинет
                    </Link>
                </Button>
                <Button className="ml-2" asChild={true}>
                    <Link href={"/admin/floor/marker"}>
                        Добавить маркер
                    </Link>
                </Button>
            </div>
            <div>

                <Transition appear show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle transition-all">
                                        <StreetView2D leftClick={func.leftClick} rightClick={func.rightClick} forwardClick={func.forwardClick} backClick={func.backClick}>
                                            {currentMarker ? <img src={currentMarker.imageURL} /> : ""}
                                        </StreetView2D>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                <Floor markers={markers}
                    paths={paths}
                    markerRadius={2}
                    isEditMarker={false}
                    isEditResident={false}
                    setPaths={setPaths}
                    className="w-full h-[1024px]"
                    menu={<></>}
                >
                    <image href={"/floor7.svg"} x="0" y="0" width="400" height="400" />
                </Floor>
            </div>
        </div>
    );
}
