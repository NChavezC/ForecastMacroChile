import { Link } from "react-router-dom";
import ForecastSeriesChart from "../features/forecast/ForecastSeriesChart";
import useChileInflation from "../features/plot/useChileInflation";
import useChileUnemployment from "../features/plot/useChileUnemployment";
import { useForecast } from "../contexts/ForecastContext";

function Forecast() {
  const { model, setModel, series, setSeries } = useForecast();
  return (
    <div>
      {series === "Inflation" && (
        <ForecastSeriesChart getData={useChileInflation} />
      )}
      {series === "Unemployment" && (
        <ForecastSeriesChart getData={useChileUnemployment} />
      )}
      <Link to="/">
        <button>Back to Plot</button>
      </Link>
    </div>
  );
}

export default Forecast;
