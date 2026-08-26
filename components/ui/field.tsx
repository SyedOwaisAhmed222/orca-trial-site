import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

const control =
  'peer w-full rounded-2xl border border-foam/10 bg-foam/4 px-4 pt-6 pb-2.5 text-[0.9375rem] text-foam transition-colors duration-300 outline-none placeholder:text-transparent hover:border-foam/18 focus:border-aqua-400/55 focus:bg-foam/7 aria-[invalid=true]:border-red-400/55'

const labelCls =
  'pointer-events-none absolute top-2 left-4 text-[0.6875rem] font-medium tracking-[0.1em] text-fog uppercase transition-all duration-300 peer-placeholder-shown:top-4.5 peer-placeholder-shown:text-[0.875rem] peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-2 peer-focus:text-[0.6875rem] peer-focus:tracking-[0.1em] peer-focus:text-aqua-300 peer-focus:uppercase'

function Error({ msg }: { msg?: string }) {
  if (!msg) return null
  return <p className="mt-1.5 pl-1 text-[0.75rem] text-red-300">{msg}</p>
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
          className={control}
          {...props}
        />
        <label htmlFor={name} className={labelCls}>
          {label}
          {required ? <span className="text-aqua-400"> *</span> : null}
        </label>
      </div>
      <span id={name + '-error'}>
        <Error msg={error} />
      </span>
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
          className={control + ' resize-none'}
          {...props}
        />
        <label htmlFor={name} className={labelCls}>
          {label}
        </label>
      </div>
      <Error msg={error} />
    </div>
  )
}
