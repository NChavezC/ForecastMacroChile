import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useSendDataForARIMA } from "./useSendDataForARIMA";
import { useSendDataForSARIMA } from "./useSendDataForSARIMA";
import { useForecast } from "../../contexts/ForecastContext";

function TimeSeriesChart({ getData }) {
  const { loading: sendingARIMA, addDataARIMA } = useSendDataForARIMA();
  const { loading: sendingSARIMA, addDataSARIMA } = useSendDataForSARIMA();
  const { model, series } = useForecast();
  const navigate = useNavigate();
  const { loading, data = [] } = getData();

  function handleClick() {
    if (model === "ARIMA") addDataARIMA(data);
    if (model === "SARIMA") addDataSARIMA(data);
    navigate("/forecast");
  }

  if (loading) return <Spinner />;
  return (
    <>
      <header>{series} Plot</header>
      <div className="border border-stone-400">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis
              dataKey="date"
              tickFormatter={(tick) => new Date(tick).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="blue"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div>
        <button onClick={handleClick} disabled={sendingARIMA || sendingSARIMA}>
          Create {model} Forecast of {series}
        </button>
      </div>
    </>
  );
}

export default TimeSeriesChart;
