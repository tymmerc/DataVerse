import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { AnimatedCounter } from "./animated-counter"

interface StatCardProps {
  title: string
  value: number
  icon: LucideIcon
  suffix?: string
  iconColor?: string
  valueColor?: string
  className?: string
}

export function StatCard({
  title,
  value,
  icon: Icon,
  suffix = "",
  iconColor = "text-blue-400",
  valueColor = "text-white",
  className = "",
}: StatCardProps) {
  return (
    <Card className={`bg-gray-800/90 border-gray-700 hover:shadow-lg transition-all ${className}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-400">{title}</p>
            <h3 className={`text-2xl font-bold mt-1 ${valueColor}`}>
              <AnimatedCounter value={value} suffix={suffix} />
            </h3>
          </div>
          <div className={`p-2 rounded-full bg-gray-700 ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
