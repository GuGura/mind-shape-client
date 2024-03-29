import Col from "@/components/layout/Col";
import Row from "@/components/layout/Row";
import {
  ShowOrHideAmount,
  ShowOrHideTrigger,
} from "@/components/share/button/ShowOrHideAmount";
import React from "react";
import { useTranslation } from "@/app/[locale]/i18n/i18n-client";
import CardBox from "@/components/share/CardBox";

export default function Header({ data }: { data: any }) {
  const symbol = data.symbol;
  const symbolName = data.symbolName;
  const quantity = data.quantity;
  const holdingPrice = data.quantity * data.dailyPrice;
  const avgPrice = data.price / quantity;
  const { t } = useTranslation("portfolio");
  return (
    <Col className={"w-full pb-[24px] pt-[28px]"}>
      <h3 className={"text-text-secondary"}>{`${symbolName} (${symbol})`}</h3>
      <Row
        className={"items-center justify-between gap-[8px] sm:justify-start"}
      >
        <ShowOrHideAmount
          text={`$${holdingPrice?.toLocaleString()}`}
          className={"text-[32px] font-semibold text-text"}
        />
        <ShowOrHideTrigger className={"h-[20px] w-[24px]"} />
      </Row>
      <Col
        className={"mt-[24px] w-full text-[12px] sm:flex-row sm:items-center"}
      >
        <CardBox>
          <p className={"font-medium text-text-secondary"}>{t("quantity")}</p>
          <h3 className={"mt-[4px] text-[25px] font-semibold text-black"}>
            <ShowOrHideAmount text={`${quantity} ${symbol}`} />
          </h3>
        </CardBox>
        <CardBox>
          <p className={"font-medium text-text-secondary"}>
            {t("avg_buy_price")}
          </p>
          <h3 className={"mt-[4px] text-[25px] font-semibold text-black"}>
            <ShowOrHideAmount
              text={`$${avgPrice?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            />
          </h3>
        </CardBox>
        <CardBox>
          <p className={"font-medium text-text-secondary"}>
            {t("total_holdings")}
          </p>
          <h3 className={"mt-[4px] text-[25px] font-semibold text-black"}>
            <ShowOrHideAmount
              text={`$${holdingPrice?.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}`}
            />
          </h3>
        </CardBox>
      </Col>
      {data.quantity === 0 && (
        <p
          className={
            "rounded-[10px] border border-red px-5 py-3 font-medium text-red"
          }
        >
          {t("detail_warning")}
        </p>
      )}
    </Col>
  );
}
