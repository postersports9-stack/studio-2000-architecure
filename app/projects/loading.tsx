export default function ProjectsLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="h-16 w-48 animate-pulse rounded bg-foreground/8 md:h-20 md:w-64" />
        </div>
      </section>

      {/* Filter bar skeleton */}
      <div className="border-b border-foreground/10">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="flex gap-2 py-4">
            {[80, 60, 110, 70, 80, 90].map((w, i) => (
              <div
                key={i}
                className="h-7 animate-pulse rounded-full bg-foreground/8"
                style={{ width: w }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Grid skeleton */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1600px] px-6 md:px-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i}>
                <div className="aspect-[4/5] w-full animate-pulse rounded bg-foreground/8" />
                <div className="mt-5 space-y-2">
                  <div className="h-3 w-6 animate-pulse rounded bg-foreground/8" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-foreground/8" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-foreground/8" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
