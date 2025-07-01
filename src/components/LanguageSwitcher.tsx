"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export const LanguageSwitcher: React.FC = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* <Label htmlFor="language-select">{t("language_select_label")}:</Label>
      <Select onValueChange={changeLanguage} defaultValue={i18n.language}>
        <SelectTrigger id="language-select" className="w-[120px]">
          <SelectValue placeholder={t("language_english")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t("language_english")}</SelectItem>
          <SelectItem value="mr">{t("language_marathi")}</SelectItem>
        </SelectContent>
      </Select> */}
    </div>
  );
};