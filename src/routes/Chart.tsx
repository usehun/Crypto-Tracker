import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import Price from "./Price";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

// interface IplotOptions {
//   candlestick:
//     colors: {
//       upward: '#3C90EB',
//       downward: '#DF7D46'
// }

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  // console.log(data);

  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                data?.map((price) => {
                  return {
                    x: new Date(price.time_close * 1000),
                    y: [price.open, price.high, price.low, price.close],
                  };
                }) ?? [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              // background: "transparent",
            },
            title: {
              text: "CandleStick Chart",
              align: "left",
            },
            xaxis: {
              type: "datetime",
              // categories: data?.map((price) => price.time_close),
              labels: {
                style: {
                  colors: "green",
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: `green`,
                },
              },
              tooltip: {
                enabled: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
