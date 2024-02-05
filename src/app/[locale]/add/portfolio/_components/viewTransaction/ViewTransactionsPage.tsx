"use client";
import { usePortfolioStore } from "@/store/portfolioStore";
import Col from "@/components/layout/Col";
import Contents from "@/components/layout/Contents";
import BackButton from "@/app/[locale]/add/portfolio/_components/viewTransaction/BackButton";
import Header from "@/app/[locale]/add/portfolio/_components/viewTransaction/Header";
import Body from "@/app/[locale]/add/portfolio/_components/viewTransaction/Body";
import { usePortfolio } from "@/hooks/react-query/portfolio.query";

export default function ViewTransactionsPage() {
  const { getValue, setValue } = usePortfolioStore();
  const { data } = usePortfolio();

  const list = data?.filter((item: any) => {
    return item?.asset?.symbol === getValue("symbol");
  });

  const detail = list?.reduce((acc: any, cur: any) => {
    const price = cur?.transactionType === "BUY" ? cur?.price : cur?.price * -1;
    const amount =
      cur?.transactionType === "BUY" ? cur?.amount : cur?.amount * -1;
    const symbol = cur?.asset?.symbol;
    const name = cur?.category?.name;

    acc[cur?.asset?.symbol] = {
      price: Number(acc[symbol]?.price ?? 0) + price * amount,
      amount: Number(acc[symbol]?.amount ?? 0) + amount,
      symbol: symbol,
      name: name,
    };
    return acc;
  }, {});

  if (!detail[getValue("symbol")]) {
    setValue("symbol", undefined);
  }

  return (
    <Contents className={"w-full max-w-[1230px]"}>
      <Col className={"w-full items-start"}>
        <BackButton />
        <Header
          symbol={detail[getValue("symbol")]?.symbol}
          name={detail[getValue("symbol")]?.name}
          totalPrice={detail[getValue("symbol")]?.price}
          totalAmount={detail[getValue("symbol")]?.amount}
        />
        <Body data={list} />
      </Col>
    </Contents>
  );
}
