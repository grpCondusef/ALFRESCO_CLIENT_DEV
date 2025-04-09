import React from 'react'
import { Chart } from "react-google-charts";

export const BarChart = ({ barChartTitle, titleFontSize, barChartData, barChartColors }) => {

    const transformedArray = barChartData.map(obj => {
        // Usar Object.entries para obtener la clave y el valor del objeto
        const [key, value] = Object.entries(obj)[0];
        // Crear un nuevo array con el par clave-valor
        return [key, value];
    });


    const data = [
        ["UAU", "Documentos eliminados"],
        ...transformedArray // Usamos el spread operator para incluir cada submatriz en data
    ];


    const options = {
        title: `${barChartTitle}`,
        titleTextStyle: {
            color: "#222121",               // color 'red' or '#cc00cc'
            //fontName: "Courier New",    // 'Times New Roman'
            fontSize: `${titleFontSize}`,               // 12, 18
            bold: true
        },
        bar: { groupWidth: "75%" },
        width: 900,
        height: 740,
        legend: { position: "none" },
        colors: [`${barChartColors}`],
        vAxis: {
            textStyle: {
                fontSize: 11 // or the number you want
            }
        }
    };

    return (
        <div>
            <Chart
                chartType="BarChart"
                width="100%"
                height="46rem"
                data={data}
                options={options}
            />
        </div>
    )
}
