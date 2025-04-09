import { Chart } from "react-google-charts";

export const ColumnGraph = ({ graphTitle, titleFontSize, columnsGraph, graphData, graphColors, isStacked, grapWidth, graphHeight, ylabel, xlabel }) => {

    const data = [
        columnsGraph,
        ...graphData // Usamos el spread operator para incluir cada submatriz en data
    ];

    const options = {
        title: `${graphTitle}`,
        titleTextStyle: {
            color: "#222121",               // color 'red' or '#cc00cc'
            //fontName: "Courier New",    // 'Times New Roman'
            fontSize: `${titleFontSize}`,               // 12, 18
            bold: true
        },
        vAxis: {
            title: `${ylabel}`,
        },
        hAxis: {
            title: `${xlabel}`,
            textStyle: {
                fontSize: 12 // or the number you want
            }
        },
        isStacked: isStacked,
        colors: graphColors
    }

    return (
        <div>
            <Chart
                chartType="ColumnChart"
                width={grapWidth}
                height={graphHeight}
                data={data}
                options={options}
            />
        </div>
    )
}