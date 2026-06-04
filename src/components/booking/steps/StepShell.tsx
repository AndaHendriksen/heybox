import { P } from "@/components/ui/text"

interface StepShellProps {
  title: string
  description?: string
  children: React.ReactNode
}

export default function StepShell({ title, description, children }: StepShellProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-1">{title}</h1>
      {description && <P color="gray" className="mb-8">{description}</P>}
      {!description && <div className="mb-8" />}
      {children}
    </div>
  )
}
