import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  prepareForecastData,
  prepareTimeSeriesData,
} from "../../helpers/helpers";
import { useForecast } from "../../contexts/ForecastContext";
import Spinner from "../../ui/Spinner";
import { useSendDataForSARIMA } from "../plot/useSendDataForSARIMA";
import { useSendDataForARIMA } from "../plot/useSendDataForARIMA";
import Papa from "papaparse";

function ForecastSeriesChart({ getData }) {
  const { series, setSeries, model, setModel } = useForecast();
  const { forecast = [] } = useForecast();

  const { loading, data = [] } = getData();

  const { loading: sendingForARIMA } = useSendDataForARIMA();
  const { loading: sendingForSARIMA } = useSendDataForSARIMA();

  const mergeOriginal = prepareTimeSeriesData(data);

  const mergeForecast = prepareForecastData(forecast);

  const mergedData = [...mergeOriginal, ...mergeForecast];

  function downloadForecastOnly() {
    const csvData = mergeForecast.map((row) => ({
      date: row.date,
      forecast: row.forecast,
    }));

    const csvString = Papa.unparse(csvData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "forecast_only.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function downloadFullData() {
    const fullData = [
      ...mergeOriginal.map((row) => ({
        date: row.date,
        value: row.value,
        data: "original",
      })),
      ...mergeForecast.map((row) => ({
        date: row.date,
        value: row.value,
        data: "forecast",
      })),
    ];

    const csvString = Papa.unparse(fullData);
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "full_data_with_forecast.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  if (loading || sendingForARIMA || sendingForSARIMA) return <Spinner />;
  return (
    <>
      <header>
        {series} Forecast with {model} Model
      </header>
      <div className="border border-stone-400">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart width={600} height={300} data={mergedData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Actual Data Line */}
            <Line
              type="monotone"
              dataKey="actual"
              stroke="blue"
              strokeWidth={2}
              dot={{ stroke: "blue", strokeWidth: 2 }}
              isAnimationActive={true}
            />

            {/* Forecast Data Line (Starts at the correct position) */}
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="red"
              strokeWidth={2}
              dot={{ stroke: "red", strokeWidth: 2 }}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
        <div>
          <button
            onClick={downloadForecastOnly}
            disabled={sendingForARIMA || sendingForSARIMA}
          >
            Download Forecast Only in CSV
          </button>
          <button
            onClick={downloadFullData}
            disabled={sendingForARIMA || sendingForSARIMA}
          >
            Download Full Data (Original + Forecast) in CSV
          </button>
        </div>
      </div>
    </>
  );
}

export default ForecastSeriesChart;
