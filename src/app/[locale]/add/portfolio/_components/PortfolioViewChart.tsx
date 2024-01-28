"use client";
import Contents from "@/components/layout/Contents";
import { useConvenienceStore } from "@/store/convenienceStore";
import { IS_SHOW_CHART } from "@/constant/portfolio";

import DoughnutChart from "@/components/share/chart/DoughnutChart";
import ChartLabel from "@/components/share/chart/ChartLegend";
import { useEffect, useRef, useState } from "react";
import { usePortfolio } from "@/hooks/react-query/portfolio.query";
import { DesktopTypeTM, TabletAndMobile } from "@/components/layout/responsive";
import Row from "@/components/layout/Row";
import { useTranslation } from "@/app/[locale]/i18n/i18n-client";
import TreeMapChart from "@/components/share/chart/TreeMapChart";

export default function PortfolioViewChart() {
  const { getValue } = useConvenienceStore();
  const { myList, isPending } = usePortfolio();
  const { t } = useTranslation("portfolio");
  const ref = useRef();
  const [width, setWidth] = useState<number>(0);
  const isShow = getValue(IS_SHOW_CHART);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        setWidth(newWidth);
      }
    });
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref?.current);
      }
    };
  }, [isShow]);

  if (!getValue(IS_SHOW_CHART)) {
    return null;
  }

  if (isPending) {
    return null;
  }

  const list = myList.reduce((acc: any, cur: any) => {
    acc[cur?.asset?.symbol] = {
      price: Number(acc[cur?.asset?.symbol]?.price ?? 0) + Number(cur?.price),
      amount:
        Number(acc[cur?.asset?.symbol]?.amount ?? 0) + Number(cur?.amount),
      symbol: cur?.asset?.symbol,
    };
    return acc;
  }, {});
  const array: any[] = Object.values(list).sort(
    (a: any, b: any) => b.price - a.price,
  );
  const totalPrice = array?.reduce((acc: any, cur: any) => {
    acc += cur?.price;
    return acc;
  }, 0);

  return (
    <Contents
      className={
        "flex w-full max-w-full flex-col gap-[20px] font-Inter md:flex-row"
      }
      ref={ref as any}
    >
      <DesktopTypeTM>
        <Contents
          className={
            "mt-[40px] flex w-full flex-col rounded-[10px] bg-white p-[20px] shadow-chart"
          }
          style={{ maxWidth: `${width / 2 - 10}px` }}
        >
          <DoughnutChart
            height={330}
            width={width / 2 - 210}
            data={array}
            legend={
              <ChartLabel
                data={array}
                object={list}
                totalPrice={Number(totalPrice)}
              />
            }
          />
        </Contents>
        <Contents
          className={
            "mt-[40px] flex w-full flex-col rounded-[10px] bg-white p-[20px] shadow-chart"
          }
          style={{ maxWidth: `${width / 2 - 10}px` }}
        >
          <TreeMapChart height={330} width={width / 2 - 40} />
        </Contents>
      </DesktopTypeTM>
      <TabletAndMobile>
        <Contents
          className={"flex w-full flex-col rounded-[10px] bg-white py-[20px]"}
          style={{ maxWidth: `${width}px` }}
        >
          <Row>
            <h3 className={"text-[18px] font-bold"}>{t("allocation")}</h3>
          </Row>
          <DoughnutChart
            height={300}
            width={width}
            data={array}
            type={"mobile"}
            legend={
              <ChartLabel
                data={array}
                object={list}
                totalPrice={Number(totalPrice)}
              />
            }
          />
        </Contents>
      </TabletAndMobile>
    </Contents>
  );
}
