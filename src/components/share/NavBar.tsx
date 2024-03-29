"use client";
import { useConvenienceStore } from "@/store/convenienceStore";
import AnimatedDiv from "@/components/layout/AnimatedDiv";
import Col from "@/components/layout/Col";
import Row from "@/components/layout/Row";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NavBar({}) {
  const { getValue } = useConvenienceStore();

  const getNavBarStyle = () => {
    return getValue("hideNavBar")
      ? { marginLeft: "-250px" }
      : { marginLeft: "0" };
  };

  return (
    <AnimatedDiv
      className={
        "absolute left-0 top-0 z-[1] flex h-[100dvh] w-[250px] border-r border-line bg-black pt-[75px] transition-all duration-700"
      }
      style={getNavBarStyle()}
    >
      <NavBarOption
        index={0}
        title={"주식조회"}
        option={[
          { title: "투자현황", url: "/view/investment-status" },
          { title: "포트폴리오 상세", url: "/view/portfolio" },
          { title: "누적배당금 내역", url: "/view/accumulated-dividends" },
          { title: "월별수익률", url: "/view/monthly-returns" },
          { title: "월간이력", url: "/view/monthly-history" },
        ]}
      />
      <NavBarOption
        title={"주식내역 등록"}
        option={[
          { title: "포트폴리오내역", url: "/add/portfolio" },
          { title: "외화내역", url: "/add/forex" },
          { title: "배당금내역", url: "/add/dividends" },
          { title: "실현손익내역", url: "/add/realized" },
        ]}
      />
      <NavBarOption
        title={"커뮤니티"}
        option={[
          { title: "뉴스", url: "/view/investment-status" },
          { title: "피드", url: "/view/portfolio" },
          { title: "게시글", url: "/view/accumulated-dividends" },
        ]}
      />
      <NavBarOption
        title={"설정"}
        option={[{ title: "설정", url: "/view/investment-status" }]}
      />
    </AnimatedDiv>
  );
}

function NavBarOption({
  title,
  option,
  index,
}: {
  title?: string;
  option: { title: string; url: string }[];
  index?: number;
}) {
  return (
    <Col className={cn("", index !== 0 && "border-t border-line")}>
      <Title title={title} />
      <Col className={"gap-[15px] px-[20px] py-[15px]"}>
        {option.map((item, index) => (
          <Link
            href={item.url}
            key={index}
            className={
              "cursor-pointer text-[18px] text-white transition-all duration-200 hover:text-orange"
            }
          >
            {item.title}
          </Link>
        ))}
      </Col>
    </Col>
  );
}

function Title({ title }: { title?: string }) {
  if (!title) return;
  return (
    <Row className={"px-[10px] pt-[10px] text-[16px] text-neutralGray"}>
      {title}
    </Row>
  );
}
