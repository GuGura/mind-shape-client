import { request } from "@/service/axios";
import { AddPortfolio, UpdatePortfolio } from "@/constant/portfolio";
enum transactionTypes {
  BUY = "BUY",
  SELL = "SELL",
}
export function addPortfolio({
  assetId,
  price,
  quantity,
  categoryId,
  transactionDate,
  transactionType,
}: AddPortfolio) {
  const transactionEnum =
    transactionType.toLowerCase() === "buy"
      ? transactionTypes.BUY
      : transactionTypes.SELL;
  return request({
    url: "/portfolio",
    method: "POST",
    data: {
      assetId,
      price,
      quantity,
      categoryId,
      transactionDate,
      transactionType: transactionEnum,
    },
  });
}

export function getPortfolio() {
  return request({
    url: "/portfolio",
    method: "GET",
  });
}

export function deleteTransaction({ index }: { index: number }) {
  return request({
    url: "/portfolio/delete",
    method: "POST",
    data: {
      index,
    },
  });
}

export function updateTransaction({
  price,
  quantity,
  index,
  transactionDate,
}: UpdatePortfolio) {
  return request({
    url: "/portfolio/update",
    method: "POST",
    data: {
      price,
      quantity,
      index,
      transactionDate,
    },
  });
}
