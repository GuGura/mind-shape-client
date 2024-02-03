import { create } from "zustand";
import { PiePortfolioData } from "@/components/share/chart/pieTypes";

interface State {
  config: {
    isShowChart: boolean;
    portfolioSelected: string | null;
    totalPrice: number;
  };
  data: {};
  priceAndSymbol: PiePortfolioData[];
}

interface Action {
  getValue: (key: string) => any;
  setValue: (key: string, value: any) => void;
}

export const usePortfolioStore = create<State & Action>(
  (set: any, get: any) => ({
    config: {
      isShowChart: true,
      portfolioSelected: null,
      totalPrice: 0,
    },
    priceAndSymbol: [
      {
        symbol: "TSLA",
        price: 6540000,
      },
      {
        symbol: "APPL",
        price: 1250000,
      },
      {
        symbol: "SPA",
        price: 120000,
      },
      {
        symbol: "GENE",
        price: 3500000,
      },
      {
        symbol: "U",
        price: 2000000,
      },
      {
        symbol: "WWR",
        price: 2000000,
      },
      {
        symbol: "KKK",
        price: 69000,
      },
      {
        symbol: "QQQ",
        price: 4000000,
      },
      {
        symbol: "CO",
        price: 3000000,
      },
      {
        symbol: "C",
        price: 100000,
      },
    ],
    data: {},
    getValue: (key: string) => {
      switch (key) {
        case "symbol":
          return get().data["symbol"];
        case "list":
          return get().data["list"];
        default:
          let config = get().config;
          return config[key];
      }
    },
    setValue: (key: string, value: any) => {
      switch (key) {
        case "symbol":
          let dataList = get().data;
          dataList["symbol"] = value;
          set({ data: dataList });
          return;
        default:
          let config = get().config;
          config[key] = value;
          set({ config });
          return;
      }
    },
  }),
);
