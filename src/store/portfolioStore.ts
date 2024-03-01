import { create } from "zustand";
import { Asset, PortfolioItem } from "@/constant/portfolio";

interface Props {
  config: {
    isShowChart: boolean;
    portfolioSelected: string | null;
  };
  data: {
    list: any;
    realizedData: {
      total: any;
      realized: any[];
    } | null;
    formattedData: any;
    dailyTotalPrice: number;
    prevTotalPrice: number;
    originTotalPrice: number;
    detailSymbol: any;
  };
  init: (portfolio: any[], closePriceData: any[]) => any;
  getValue: (key: string, ns: string) => any;
  setValue: (key: string, ns: string, value: any) => void;
  transformPortfolio: (portfolio: any, closePriceData: any) => any;
  getRealizedData: (portfolio: any) => any;
}

const initData = {
  list: null,
  formattedData: null,
  dailyTotalPrice: -1,
  prevTotalPrice: -1,
  detailSymbol: null,
};

export const usePortfolioStore = create<Props>((set: any, get: any) => ({
  config: {
    isShowChart: true,
    portfolioSelected: null,
  },
  data: {
    list: null,
    realizedData: null,
    formattedData: null,
    formattedDataFilter: null,
    dailyTotalPrice: -1,
    prevTotalPrice: -1,
    originTotalPrice: -1,
    detailSymbol: null,
  },
  getRealizedData: (portfolio) => {
    const reverse = [...portfolio].reverse();
    return reverse.reduce<{ total: any; realized: any[] }>(
      (acc, cur) => {
        if (cur.transactionType === "BUY") {
          if (!acc["total"][cur.assetId]) {
            acc["total"][cur.assetId] = {
              assetId: cur.assetId,
              symbol: cur.asset.symbol,
              name: cur.asset.name,
              totalPrice: 0,
              totalQuantity: 0,
            };
          }
          acc["total"][cur.assetId]["totalPrice"] += cur.price * cur.quantity;
          acc["total"][cur.assetId]["totalQuantity"] += cur.quantity;
        } else {
          const object = {
            assetId: cur.assetId,
            symbol: cur.asset.symbol,
            name: cur.asset.name,
            sellingDay: cur.transactionDate,
            sellingQuantity: cur.quantity,
            sellingTotalPrice: cur.price * cur.quantity,
            sellingPrice: cur.price,
            preSaleTotalPrice: acc["total"][cur.assetId]["totalPrice"],
            preSaleTotalQuantity: acc["total"][cur.assetId]["totalQuantity"],
            plPrice:
              (cur.price -
                acc["total"][cur.assetId]["totalPrice"] /
                  acc["total"][cur.assetId]["totalQuantity"]) *
              cur.quantity,
          };
          acc["realized"].unshift(object);
          acc["total"][cur.assetId]["totalPrice"] -= cur.price * cur.quantity;
          acc["total"][cur.assetId]["totalQuantity"] -= cur.quantity;
        }
        return acc;
      },
      {
        total: {},
        realized: [],
      },
    );
  },
  transformPortfolio: (portfolio, closePriceData) => {
    return portfolio.reduce((acc: any, cur: Asset) => {
      const { assetId, transactionType, price, quantity, asset, category } =
        cur;
      const symbol = asset.symbol;
      const name = category.name;
      const symbolName = asset.name;
      const adjustedPrice =
        transactionType === "BUY" ? price * quantity : price * quantity * -1;

      // 기존 항목 업데이트 또는 새 항목 생성
      const existingItem = acc[symbol] || {
        price: 0,
        quantity: 0,
        symbol,
        name,
        symbolName,
        dailyPrice: -1,
        prevPrice: -1,
        updatedAt: null,
      };

      existingItem.price += adjustedPrice;
      existingItem.quantity += transactionType === "BUY" ? quantity : -quantity;

      existingItem.dailyPrice = closePriceData[assetId].dailyClosePrice;
      existingItem.prevPrice = closePriceData[assetId].prevClosePrice;
      existingItem.updatedAt = closePriceData[assetId].createdAtDaily;

      acc[symbol] = existingItem;
      return acc;
    }, {});
  },
  init: (portfolio: any, closePriceData: any) => {
    set({ data: initData });
    const list: Record<string, PortfolioItem> = get().transformPortfolio(
      portfolio,
      closePriceData,
    );

    const realizedData = get().getRealizedData(portfolio);
    console.log("realizedData::", realizedData);
    const formattedDataFilter: PortfolioItem[] = Object.values(list)
      .filter((item) => item.quantity > 0)
      .sort(
        (a, b) => b?.dailyPrice * b?.quantity - a?.dailyPrice * a?.quantity,
      );
    const formattedData: PortfolioItem[] = Object.values(list).sort(
      (a, b) => b?.dailyPrice * b?.quantity - a?.dailyPrice * a?.quantity,
    );

    const dailyTotalPrice = formattedDataFilter?.reduce(
      (acc: any, cur: any) => {
        acc += cur?.dailyPrice * cur?.quantity;
        return acc;
      },
      0.0,
    );

    const prevTotalPrice = formattedDataFilter?.reduce((acc: any, cur: any) => {
      acc += cur?.prevPrice * cur?.quantity;
      return acc;
    }, 0.0);

    const originTotalPrice = formattedDataFilter?.reduce(
      (acc: any, cur: any) => {
        acc += cur?.price;
        return acc;
      },
      0.0,
    );

    set({
      data: {
        list,
        realizedData,
        formattedDataFilter,
        formattedData,
        dailyTotalPrice,
        prevTotalPrice,
        originTotalPrice,
      },
    });
  },
  getValue: (key: string, ns: string) => {
    switch (key) {
      case "data":
        const data = get().data;
        return data[ns];
      case "config":
        const config = get().config;
        return config[ns];
    }
  },
  setValue: (key: string, ns: string, value: any) => {
    switch (key) {
      case "data":
        const data = get().data;
        data[ns] = value;
        set({ data });
        return;
      case "config":
        const config = get().config;
        config[ns] = value;
        set({ config });
        return;
    }
  },
}));

export const usePortfolio = () => usePortfolioStore();
