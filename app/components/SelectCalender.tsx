"use client";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import React, { useState } from "react";
import { eachDayOfInterval } from "date-fns";

type Props = {
  reservation:
    | {
        startDate: Date;
        endDate: Date;
      }[]
    | undefined;
};

const SelectCalender: React.FC<Props> = ({ reservation }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  let disableDates: Date[] = [];
  reservation?.forEach((reservation) => {
    const dateRange = eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate),
    });

    disableDates = [...disableDates, ...dateRange];
  });
  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={["#FF5A5F"]}
        ranges={state}
        onChange={(item) => setState([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disableDates}
      />
    </>
  );
};

export default SelectCalender;
