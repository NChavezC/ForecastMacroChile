import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDataSARIMA as addDataSARIMAApi } from "../../services/dataTableApi";
import { useForecast } from "../../contexts/ForecastContext";

export function useSendDataForSARIMA() {
  const queryClient = useQueryClient();
  const { setForecast } = useForecast();

  const {
    isSuccess: loading,
    mutate: addDataSARIMA,
    data: forecastData,
  } = useMutation({
    mutationKey: ["data"],
    mutationFn: (data) => addDataSARIMAApi({ data: data }),
    onSuccess: (data) => {
      setForecast(data);
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  return { loading, addDataSARIMA, forecastData };
}
