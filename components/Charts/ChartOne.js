"use client"
import React from "react"
import dynamic from "next/dynamic"
import { useDarkMode } from "@/context/DarkModeContext"

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false
})

const ChartOne = () => {
  const { isDarkMode } = useDarkMode()
  const options = {
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left"
    },
    colors: ["#581c87", "#f472b6"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "black",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.1
      },

      toolbar: {
        show: false
      }
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300
          }
        }
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350
          }
        }
      }
    ],
    stroke: {
      width: [2, 2],
      curve: "straight"
    },
    // labels: {
    //   show: false,
    //   position: "top",
    // },
    grid: {
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#581c87", "#f472b6"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5
      }
    },
    xaxis: {
      type: "category",
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Spt",
        "Oct",
        "Nov",
        "Dec"
      ],
      labels: {
        style: {
          colors: isDarkMode ? "#fff" : "#000",
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },

    yaxis: {
      labels: {
        style: {
          colors: isDarkMode ? "#fff" : "#000",
        }
      },
      min: 0,
      max: 100
    }
  }
  const series = [
    {
      name: "Product One",
      data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45]
    },

    {
      name: "Product Two",
      data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51]
    }
  ]

  return (
    <div className="col-span-12 rounded-sm border-2 border-purple-700 px-5 pb-5 pt-7 shadow sm:px-7 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="flex min-w-52">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-purple-700">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-purple-700"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-purple-700">Total Revenue</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
          <div className="flex min-w-52">
            <span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-pink-400">
              <span className="block h-2.5 w-full max-w-2.5 rounded-full bg-pink-400"></span>
            </span>
            <div className="w-full">
              <p className="font-semibold text-pink-400">Total Sales</p>
              <p className="text-sm font-medium">12.04.2022 - 12.05.2022</p>
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-48 justify-end">
          <div className="inline-flex items-center rounded-md p-1.5">
            <button className="rounded  px-3 py-1 text-xs font-medium  shadow-md hover:shadow-md ">
              Day
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium hover:shadow-md">
              Week
            </button>
            <button className="rounded px-3 py-1 text-xs font-medium hover:shadow-md">
              Month
            </button>
          </div>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={series}
            type="area"
            height={350}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  )
}

export default ChartOne
