import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react'

const control =
  'peer w-full rounded-2xl border bg-foam/4 px-4 pt-6 pb-2.5 text-[0.9375rem] text-foam transition-colors duration-300 outline-none placeholder:text-transparent focus:bg-foam/7'

// Applied explicitly rather than via an `aria-[invalid]` variant, so the invalid
// state cannot lose a specificity race with the hover/focus border rules.
const borderOk = 'border-foam/10 hover:border-foam/18 focus:border-aqua-400/55'
const borderBad = 'border-red-400/70 bg-red-400/5 hover:border-red-400/80 focus:border-red-400'

const labelCls =
  'pointer-events-none absolute top-2 left-4 text-[0.6875rem] font-medium tracking-[0.1em] text-fog uppercase transition-all duration-300 peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-[0.875rem] peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-[0.6875rem] peer-focus:tracking-[0.1em] peer-focus:text-aqua-300 peer-focus:uppercase'

function Error({ msg, id }: { msg?: string; id?: string }) {
  if (!msg) return null
  return (
    <p id={id} role="alert" className="mt-1.5 pl-1 text-[0.75rem] text-red-300">
      {msg}
    </p>
  )
}

export function Field({
  label,
  name,
  error,
  className = '',
  required,
  ...props
}: { label: string; name: string; error?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <div className="relative">
        <input
          id={name}
          name={name}
          placeholder={label}
          required={required}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? name + '-error' : undefined}
          className={control + ' ' + (error ? borderBad : borderOk)}
          {...props}
        />
        <label htmlFor={name} className={labelCls}>
          {label}
          {required ? <span className="text-aqua-400"> *</span> : null}
        </label>
      </div>
      <Error msg={error} id={name + '-error'} />
    </div>
  )
}

export function SelectField({
  label,
  name,
  options,
  className = '',
  ...props
}: { label: string; name: string; options: readonly string[] } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={className}>
      <div className="relative">
        <select
          id={name}
          name={name}
          className={
            control +
            ' ' +
            borderOk +
            ' appearance-none cursor-pointer pr-11 text-foam [&>option]:bg-hull [&>option]:text-foam'
          }
          {...props}
        >
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <label
          htmlFor={name}
          className="pointer-events-none absolute top-2 left-4 text-[0.6875rem] font-medium tracking-[0.1em] text-fog uppercase"
        >
          {label}
        </label>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-fog"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m7 10 5 5 5-5" />
        </svg>
      </div>
    </div>
  )
}

export function TextareaField({
  label,
  name,
  error,
  className = '',
  ...props
}: { label: string; name: string; error?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <div className="relative">
        <textarea
          id={name}
          name={name}
          placeholder={label}
          rows={4}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? name + '-error' : undefined}
          className={control + ' resize-none ' + (error ? borderBad : borderOk)}
          {...props}
        />
        <label htmlFor={name} className={labelCls}>
          {label}
        </label>
      </div>
      <Error msg={error} id={name + '-error'} />
    </div>
  )
}
