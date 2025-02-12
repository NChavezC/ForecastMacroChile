import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDataARIMA as addDataARIMAApi } from "../../services/dataTableApi";
import { useForecast } from "../../contexts/ForecastContext";

export function useSendDataForARIMA() {
  const queryClient = useQueryClient();
  const { setForecast } = useForecast();

  const {
    isSuccess: loading,
    mutate: addDataARIMA,
    data: forecastData,
  } = useMutation({
    mutationKey: ["data"],
    mutationFn: (data) => addDataARIMAApi({ data: data }),
    onSuccess: (data) => {
      setForecast(data);
      queryClient.invalidateQueries({ queryKey: ["data"] });
    },
  });

  return { loading, addDataARIMA, forecastData };
}
