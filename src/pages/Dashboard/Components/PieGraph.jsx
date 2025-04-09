import { Chart } from "react-google-charts";

export const PieGraph = ({ pieData }) => {

    const data = [
        ["Estatus", "Pct"],
        ["Expedientes vacíos", pieData.pct_empty_expedientes],
        ["Expedientes con contenido", pieData.pct_digitized_expedientes]
    ];

    const options = {
        title: "Porcentaje de digitalización de todas las UAU",
        titleTextStyle: {
            color: "#222121",               // color 'red' or '#cc00cc'
            //fontName: "Courier New",    // 'Times New Roman'
            fontSize: 18,               // 12, 18
            bold: true
        },
        pieHole: 0.4,
        is3D: false,
        slices: {
            0: { color: "#a54b4b" },
            1: { color: "#42b046", offset: 0.1 },
        },
    };

    return (
        <div>
            <Chart
                chartType="PieChart"
                width="50rem"
                height="400px"
                data={data}
                options={options}
            />
        </div>
    )
}
