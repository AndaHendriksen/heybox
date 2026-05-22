interface StepShellProps {
  title: string
  description?: string
  children: React.ReactNode
}

export default function StepShell({ title, description, children }: StepShellProps) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight mb-1">{title}</h1>
      {description && <p className="text-zinc-500 mb-8">{description}</p>}
      {!description && <div className="mb-8" />}
      {children}
    </div>
  )
}
