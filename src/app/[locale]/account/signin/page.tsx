import PageContainer from "@/components/layout/page/index/PageContainer";
import Body from "@/app/[locale]/account/signin/_components/Body";

export default function page() {
  return (
    <PageContainer>
      <h1 className={""}>로그인 페이지</h1>
      <Body />
    </PageContainer>
  );
}
