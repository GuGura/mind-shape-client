"use client";
import { useConvenienceStore } from "@/store/convenienceStore";
import { useEffect } from "react";
import Contents from "@/components/layout/Contents";
import { IconEye, IconEyeOff } from "@/assets";
import { cn } from "@/lib/utils";
import Text from "@/components/layout/Text";

export function ShowOrHideAmount({
  text,
  length = 10,
  className,
}: {
  text: string;
  length?: number;
  className?: string;
}) {
  const { getValue, setValue } = useConvenienceStore();

  useEffect(() => {
    const showAmount = localStorage.getItem("showAmount");
    let isShowAmount;
    if (showAmount === "false") {
      isShowAmount = false;
    } else {
      isShowAmount = true;
    }
    setValue("isShowAmount", isShowAmount);
  }, []);

  if (getValue("isShowAmount")) {
    return (
      <Contents className={cn("flex items-center break-all", className)}>
        <Text>{text}</Text>
      </Contents>
    );
  }
  return (
    <Contents className={cn("flex items-center break-all", className)}>
      <Text>{Array.from(Array(length), () => "*")}</Text>
    </Contents>
  );
}

export function ShowOrHideTrigger({ className }: { className?: string }) {
  const { getValue, setValue } = useConvenienceStore();

  return (
    <Contents
      className={"flex h-full items-center"}
      onClick={() => {
        const value = !getValue("isShowAmount");
        setValue("isShowAmount", value);
        localStorage.setItem("showAmount", String(value));
      }}
    >
      {getValue("isShowAmount") ? (
        <IconEyeOff className={cn("cursor-pointer text-weakGray", className)} />
      ) : (
        <IconEye className={cn("cursor-pointer text-white", className)} />
      )}
    </Contents>
  );
}
