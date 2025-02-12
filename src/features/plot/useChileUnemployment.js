import { useState, useEffect } from "react";
import * as d3 from "d3";

function useChileUnemployment() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function fetchCsv() {
    d3.csv("/chile_unemployment.csv")
      .then((parsedData) => {
        const formattedData = parsedData.map((d) => ({
          date: d.date,
          value: parseFloat(d.unemployment_value),
        }));
        setData(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchCsv();
  }, []);

  return { data, loading, error };
}

export default useChileUnemployment;

//chile_unemployment.csv
