"use client"

import {
  Label,
  PolarAngleAxis,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

const config = {
  value: { label: "Goal", color: "var(--chart-1)" },
} satisfies ChartConfig

type Props = {
  name: string
  value: number
  goal?: number
  unit: string
  small?: boolean
}

export function ChartProgression({ name, value, goal = 1, unit, small = false }: Props) {
  const data = [{ name, value, fill: `var(--color-chart-${name})` }]

  return (
    <ChartContainer
      config={config}
      className="aspect-square w-full mx-auto"
    >
      <RadialBarChart
        data={data}
        startAngle={90}
        endAngle={-270}
        innerRadius={small ? "78%" : "75%"}
        outerRadius="100%"
      >
        <PolarAngleAxis type="number" domain={[0, goal]} tick={false} />

        <RadialBar
          dataKey="value"
          background={{ fill: "var(--muted)" }}
          cornerRadius={10}
        />

        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      className={
                        small
                          ? "fill-foreground text-sm font-bold"
                          : "fill-foreground text-2xl font-bold"
                      }
                    >
                      {Math.round((value / goal) * 100)}%
                    </tspan>
                    {!small && (
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground text-sm"
                      >
                        {value} / {goal} {unit}
                      </tspan>
                    )}
                  </text>
                )
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}