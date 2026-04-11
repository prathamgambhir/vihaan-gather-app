const featuredColleges = [
  {
    name: "IIT Bombay",
    description: "Fast-moving student communities, flagship fests, and strong alumni backing.",
  },
  {
    name: "Delhi University",
    description: "A wide mix of societies, creator-led events, and campus collaborations.",
  },
  {
    name: "BITS Pilani",
    description: "Tight-knit clubs with a strong builder culture and frequent student initiatives.",
  },
];

export default function CollegesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 md:px-10">
        <div className="max-w-2xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            Colleges
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Discover active campuses building memorable communities.
          </h1>
          <p className="text-base leading-7 text-muted-foreground md:text-lg">
            This page is the starting point for college discovery. It can grow into searchable campus
            profiles, featured societies, and event activity as the product evolves.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {featuredColleges.map((college) => (
            <article
              key={college.name}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <h2 className="text-2xl font-semibold">{college.name}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{college.description}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
