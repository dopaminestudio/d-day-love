"use client";

import React from "react";

import { addDays, differenceInDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar, CalendarIcon, Gift, Heart, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function DdayCalculator() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  // 연도 목록 생성 (현재 연도부터 10년 전까지)
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearList = Array.from({ length: 20 }, (_, i) => currentYear - i);
  }, []);

  // 현재 날짜
  const today = new Date();

  // D-day 계산
  const daysCount = startDate ? differenceInDays(today, startDate) : 0;

  // 다가오는 기념일 계산
  const calculateUpcomingAnniversaries = () => {
    if (!startDate) return [];

    const anniversaries = [
      { days: 100, label: "100일", icon: <Heart className="h-4 w-4" /> },
      { days: 200, label: "200일", icon: <Heart className="h-4 w-4" /> },
      { days: 300, label: "300일", icon: <Heart className="h-4 w-4" /> },
      { days: 365, label: "1주년", icon: <Gift className="h-4 w-4" /> },
      { days: 500, label: "500일", icon: <Sparkles className="h-4 w-4" /> },
      { days: 730, label: "2주년", icon: <Gift className="h-4 w-4" /> },
      { days: 1000, label: "1000일", icon: <Sparkles className="h-4 w-4" /> },
      { days: 1095, label: "3주년", icon: <Gift className="h-4 w-4" /> },
    ];

    return anniversaries.map((anniversary) => {
      const anniversaryDate = addDays(startDate, anniversary.days);
      const daysUntil = differenceInDays(anniversaryDate, today);
      return {
        ...anniversary,
        date: anniversaryDate,
        daysUntil,
        isPast: daysUntil < 0,
      };
    });
  };

  const upcomingAnniversaries = calculateUpcomingAnniversaries();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-pink-100 via-rose-50 to-white p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center mb-6 animate-fade-in">
          <h1 className="text-3xl font-bold text-pink-600 mb-2 flex items-center justify-center">
            <Heart className="h-6 w-6 mr-2 text-pink-500 animate-pulse" fill="currentColor" />
            커플 D-day 계산기
            <Heart className="h-6 w-6 ml-2 text-pink-500 animate-pulse" fill="currentColor" />
          </h1>
          <p className="text-pink-400">소중한 순간을 함께 기억해요</p>
        </div>

        <Card className="border-pink-200 shadow-lg overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100 rounded-full -mr-12 -mt-12 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-pink-100 rounded-full -ml-8 -mb-8 opacity-50"></div>

          <CardHeader className="text-center relative z-10">
            <CardTitle className="text-2xl font-bold text-pink-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 mr-2 text-pink-500" />
              우리의 연애
              <Sparkles className="h-5 w-5 ml-2 text-pink-500" />
            </CardTitle>
            <CardDescription>연애 시작일을 입력하고 특별한 날들을 확인하세요</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 relative z-10">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-pink-700">
                연애 시작일
              </Label>

              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant="outline"
                    className={cn(
                      "w-full justify-start border-pink-200 text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-pink-500" />
                    {startDate ? format(startDate, "PPP", { locale: ko }) : <span>날짜를 선택하세요</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                      setIsOpen(false);
                    }}
                    locale={ko}
                    initialFocus
                    defaultMonth={new Date(selectedYear, 0)}
                    fromYear={selectedYear - 10}
                    toYear={selectedYear + 10}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {startDate && (
              <Card className="border-pink-200 bg-linear-to-r from-pink-50 to-rose-50 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="h-6 w-6 text-pink-500 animate-pulse" fill="currentColor" />
                      <h3 className="text-2xl font-bold text-pink-600">오늘은 {daysCount}일째</h3>
                      <Heart className="h-6 w-6 text-pink-500 animate-pulse" fill="currentColor" />
                    </div>
                    <div className="flex items-center text-sm text-pink-500">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(startDate, "PPP", { locale: ko })}부터 함께한 날
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        {startDate && upcomingAnniversaries.length > 0 && (
          <Card className="border-pink-200 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 w-20 h-20 bg-pink-100 rounded-full -ml-10 -mt-10 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-pink-100 rounded-full -mr-8 -mb-8 opacity-50"></div>

            <CardHeader className="relative z-10">
              <CardTitle className="text-xl text-pink-600 flex items-center">
                <Gift className="h-5 w-5 mr-2 text-pink-500" />
                다가오는 기념일
              </CardTitle>
            </CardHeader>

            <CardContent className="relative z-10">
              <div className="space-y-3">
                {upcomingAnniversaries.map((anniversary, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center justify-between rounded-lg border p-3 transition-all hover:shadow-md",
                      anniversary.isPast
                        ? "border-gray-200 bg-gray-50"
                        : "border-pink-200 bg-linear-to-r from-pink-50 to-rose-50"
                    )}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={cn("p-1.5 rounded-full", anniversary.isPast ? "bg-gray-100" : "bg-pink-100")}>
                        {React.cloneElement(anniversary.icon as React.ReactElement, {
                          className: cn("h-4 w-4", anniversary.isPast ? "text-gray-400" : "text-pink-500"),
                        })}
                      </div>
                      <span className={cn("font-medium", anniversary.isPast ? "text-gray-500" : "text-pink-700")}>
                        {anniversary.label}
                      </span>
                    </div>
                    <div className="text-right">
                      <div
                        className={cn("text-sm font-medium", anniversary.isPast ? "text-gray-500" : "text-pink-600")}
                      >
                        {format(anniversary.date, "PPP", { locale: ko })}
                      </div>
                      <div
                        className={cn(
                          "text-xs mt-0.5 px-2 py-0.5 rounded-full inline-block",
                          anniversary.isPast ? "bg-gray-100 text-gray-500" : "bg-pink-100 text-pink-600"
                        )}
                      >
                        {anniversary.isPast
                          ? `${Math.abs(anniversary.daysUntil)}일 지남`
                          : `D-${anniversary.daysUntil}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="flex justify-center text-sm text-pink-500 relative z-10">
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 mr-1" />
                특별한 날들을 함께 기념하세요
                <Sparkles className="h-4 w-4 ml-1" />
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
