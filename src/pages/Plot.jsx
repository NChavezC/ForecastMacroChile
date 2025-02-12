import Dropdown from "../ui/Dropdown";
import TimeSeriesChart from "../features/plot/TimeSeriesChart";
import useChileInflation from "../features/plot/useChileInflation";
import useChileUnemployment from "../features/plot/useChileUnemployment";
import { useForecast } from "../contexts/ForecastContext";

function Plot() {
  const { model, setModel, series, setSeries } = useForecast();

  return (
    <div className="grid grid-rows-2 grid-cols-[.3fr_1fr]">
      <div className="row-start-1 row-end-2 col-start-1 col-end-2">
        <label>Select Macroeconomic Variable</label>
        <Dropdown
          options={["Inflation", "Unemployment"]}
          state={series}
          setState={setSeries}
        />
      </div>
      <div className="row-start-2 row-end-3 col-start-1 col-end-2">
        <label>Select Model</label>
        <Dropdown
          options={["ARIMA", "SARIMA"]}
          state={model}
          setState={setModel}
        />
      </div>
      <div className="row-start-1 row-end-3 col-start-2 col-end-3">
        {series === "Inflation" && (
          <TimeSeriesChart getData={useChileInflation} />
        )}
        {series === "Unemployment" && (
          <TimeSeriesChart getData={useChileUnemployment} />
        )}
      </div>
    </div>
  );
}

export default Plot;
