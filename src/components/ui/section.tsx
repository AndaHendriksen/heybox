
function Section({ children, className }: Readonly<{ children: React.ReactNode, className?: string }>) {
  return (
    <section className={`px-4  ${className || ""}`}>
      <div className="max-w-[1400px] mx-auto">
        {children}
      </div>
    </section>
  )
}

export { Section }