import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import haversine from "haversine-distance"
import Zoom from "chartjs-plugin-zoom";
import CrosshairPlugin from "chartjs-plugin-crosshair";
import {useEffect, useState} from "react";

function StageProfile ({stage}) {
    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend,
        Zoom
    );

    const options = {
        animation: false,
        responsive: true,
        maintainAspectRatio: false,
        fill: true,
        elements: {
            point:{
                radius: 0
            },
            line: {
                borderJoinStyle: 'round'
            }
        },
        scales: {
            y: {
                ticks: {
                callback: function(value, index, ticks) {
                    return value + " m";
                }
                }
            },
            x: {
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 12,
                    stepSize: 1,
                    max: 12,
                }
            }
        },
        plugins: {
            legend: {
                display: false,
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: "x",
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                }
            }
            },
        parsing: {
            xAxisKey: 'distanceTraveled',
            yAxisKey: 'elevation'
        },
    };

    const data = {labels: stage.filter(function(_, i) {
            return i % 3 === 0;
        }).map((feature) => Math.round(feature.distanceTraveled * 1000) / 1000 ),
        datasets: [
            {
            data: stage.filter(function(_, i) {
                return i % 3 === 0;
            }),
                borderColor: '#36A2EB',
                backgroundColor: '#9BD0F5',
                }
        ]}

    let crosshair;
    let selection = {startX: -1, endX: -1};
    let hasSelection = 0;
    const crosshairLabel = {
        id: "crosshairLabel",
        afterDatasetsDraw(chart, args, options, cancelable) {
            const { ctx, chartArea: {left, right, top, bottom}, scales: { x, y } } = chart;

            ctx.lineWidth = 2;
            ctx.strokeStyle = "grey";


            if(crosshair){
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(crosshair[1].startX, crosshair[1].startY);
                ctx.lineTo(crosshair[1].endX, crosshair[1].endY);
                ctx.stroke();
                ctx.fillStyle = "black";
                ctx.fillRect(0, crosshair[0].startY - 10, left, 40);
                ctx.font = "bold 10px sans-serif";
                ctx.fillStyle = "white";
                ctx.textAlign = "center"
                ctx.fillText(data.datasets[0].data[x.getValueForPixel(crosshair[1].startX)]?.elevation + " m", left/2, crosshair[0].startY + 2);
                ctx.fillText((data.labels.slice(-1)[0] - data.labels[x.getValueForPixel(crosshair[1].startX)]).toFixed(0) + "km", left/2, crosshair[0].startY + 22);
            }
            ctx.fillStyle = "black";
            if(selection?.startX != -1){
                ctx.fillRect(selection.startX, top, 1, bottom);
            }
            if(selection?.endX != -1){
                ctx.fillRect(selection.endX-1, top, 1, bottom);
            }
            if(selection?.endX > selection?.startX){
                const width = Math.max(selection.endX - selection.startX, 100)
                ctx.fillRect(selection.startX, bottom, width, 20);
                ctx.fillStyle = "white";
                const elevationDifference = data.datasets[0].data[x.getValueForPixel(selection?.endX)]?.elevation - data.datasets[0].data[x.getValueForPixel(selection?.startX)]?.elevation
                const distanceDifference = (data.labels[x.getValueForPixel(selection?.endX)] * 100) - (data.labels[x.getValueForPixel(selection?.startX)] * 100)
                ctx.fillText((distanceDifference*10).toFixed(2) + "m " + ": " + (elevationDifference/distanceDifference*10).toFixed(2) + "%", selection.startX + width / 2, bottom+12);
            }
        },
        afterEvent(chart, args) {
            const { ctx, chartArea: {left, right, top, bottom} } = chart;
            const xCoor = args.event.x;
            const yCoor = args.event.y;

            if(!args.inChartArea && crosshair) {
                crosshair = undefined;
                args.changed = true;
            } else if(args.inChartArea){
                crosshair = [
                    {
                        startX: left,
                        startY: yCoor,
                        endX: right,
                        endY: yCoor,
                    },
                    {
                        startX: xCoor,
                        startY: top,
                        endX: xCoor,
                        endY: bottom,
                    }
                ];
                chart.canvas.addEventListener("wheel", (e) => {
                    selection["startX"] = -1;
                    selection["endX"] = -1;
                    hasSelection = 0;
                })
                if(args.event.type === "click" && hasSelection === 2){
                    selection["startX"] = -1;
                    selection["endX"] = -1;
                    hasSelection = 0;
                }
                if(args.event.type === "click" && selection["startX"] != -1 && hasSelection === 1) {
                    selection["endX"] = xCoor;
                    hasSelection = 2;
                }
                if(args.event.type === "click" && selection["startX"] === -1 && hasSelection === 0) {
                    selection["startX"] = xCoor;
                    hasSelection = 1;
                }
                args.changed = true;
            }
        }
    }
    {/*
    const stage = stage1.features.map((feature, idx) => {
        return {id: idx, coordinates: feature.geometry.coordinates, y: feature.properties.ele};
    })

    stage[0].x = 0

    let previousPoint = null;

    for (const point of stage) {
        if (previousPoint !== null) {
            // Calculate distance between current point and previous point
            const distance = haversine(
                previousPoint.coordinates,
                point.coordinates
            ) / 1000;
            point.x = distance + previousPoint.x;
        }

        previousPoint = point;
    }

    console.log(stage)
    */}


    return (
        <div style={{width: "100%", height: "400px"}}>
            <Line data={data} plugins={[crosshairLabel]} options = {options}/>
        </div>
    );
}

export default StageProfile;