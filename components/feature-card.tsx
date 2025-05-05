import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: LucideIcon
  iconColor?: string
  className?: string
}

export function FeatureCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-blue-400",
  className = "",
}: FeatureCardProps) {
  return (
    <Card className={`bg-gray-800/80 border-gray-700 hover:bg-gray-800 transition-all ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-full bg-gray-700 ${iconColor}`}>
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle className="text-white text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-300">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
