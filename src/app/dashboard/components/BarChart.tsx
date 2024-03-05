'use client'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { LinkUserType } from '@/lib/types'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

type DataSetType = {
  label: string
  data: number[]
  backgroundColor: string
  borderColor: string
  borderWidth: number
}

function BarChart({ link }: { link: LinkUserType | null }) {
  const [charData, setChartData] = useState<{
    labels: string[]
    datasets: DataSetType[]
  }>({
    labels: [],
    datasets: []
  })

  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    if (link) {
      setChartData({
        labels: link.countries.map((country) => country.country.name),
        datasets: [
          {
            label: 'Visits',
            data: link.countries.map((country) => country.visits),
            backgroundColor: 'rgba(53, 162, 235, 0.4)',
            borderColor: 'rgb(53, 162, 235)',
            borderWidth: 1
          }
        ]
      })
    }
    setChartOptions({
      maintainAspectRatio: false,
      responsive: true
    })
  }, [link])

  return (
    <>
      <div
        className={`relative w-full h-[100%] lg:h-[70vh] flex justify-center items-center m-auto p-4 border rounded-lg ${link ? 'bg-white' : 'bg-gray-300'} lg:col-start-2 lg:col-end-4`}
      >
        {link ? (
          <Bar data={charData} options={chartOptions} />
        ) : (
          <p className="text-black">Select a link to view country charts</p>
        )}
      </div>
    </>
  )
}

export default BarChart
