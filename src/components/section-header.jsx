export default function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-8">
      {eyebrow ? (
        <p className="mb-2 inline-flex rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 max-w-3xl text-slate-600">{description}</p> : null}
    </div>
  )
}
