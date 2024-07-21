"use client"
import ChartOne from "@/components/Charts/ChartOne"
import ChartTwo from "@/components/Charts/ChartTwo"
import React from "react"

const Chart = () => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
      </div>
    </>
  )
}

export default Chart
