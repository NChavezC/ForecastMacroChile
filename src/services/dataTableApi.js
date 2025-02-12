import api from "./apiData";

export async function getData() {
  const res = await api.get("/data");
  return res.data;
}

export async function addDataARIMA(data) {
  const res = await api.post("/arima", data);
  const forecastData = res.data;
  return forecastData;
}

export async function addDataSARIMA(data) {
  const res = await api.post("/sarima", data);
  const forecastData = res.data;
  return forecastData;
}
