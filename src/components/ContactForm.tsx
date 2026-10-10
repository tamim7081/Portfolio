import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, CheckCircle2, LoaderCircle, Send } from 'lucide-react'

type Fields = { name: string; email: string; subject: string; message: string }
const initialFields: Fields = { name: '', email: '', subject: '', message: '' }

export function ContactForm() {
  const [fields, setFields] = useState(initialFields)
  const [errors, setErrors] = useState<Partial<Fields>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors: Partial<Fields> = {}
    for (const field of Object.keys(fields) as (keyof Fields)[]) {
      if (!fields[field].trim()) nextErrors[field] = `Please enter your ${field}.`
    }
    if (fields.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) nextErrors.email = 'Please enter a valid email address.'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const formData = new FormData(event.currentTarget)
      const body = new URLSearchParams()
      formData.forEach((value, key) => body.append(key, String(value).trim()))
      const response = await fetch('/contact.html', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: body.toString() })
      if (!response.ok) throw new Error('Submission failed')
      setStatus('success')
      setFields(initialFields)
    } catch {
      setStatus('error')
    }
  }

  return <div className="contact-form-card">
    <div className="form-heading"><Send size={19}/><div><h3>Have something in mind?</h3><p>Let’s start a conversation.</p></div></div>
    {status === 'success' ? <div className="form-success" role="status"><CheckCircle2 size={34}/><h3>Thanks for reaching out.</h3><p>Your message was submitted successfully. I look forward to connecting with you.</p><button className="button button-secondary" onClick={() => setStatus('idle')}>Send another message <ArrowUpRight size={16}/></button></div> : <form name="portfolio-contact" ref={formRef} onSubmit={submit} noValidate>
      <input type="hidden" name="form-name" value="portfolio-contact"/>
      <div hidden aria-hidden="true"><label>Leave this empty<input name="bot-field" tabIndex={-1} autoComplete="off"/></label></div>
      <div className="form-row">{(['name', 'email'] as const).map(field => <label key={field} htmlFor={`contact-${field}`}>{field === 'name' ? 'Your name' : 'Email address'}<input id={`contact-${field}`} name={field} type={field === 'email' ? 'email' : 'text'} autoComplete={field} placeholder={field === 'name' ? 'Your full name' : 'you@example.com'} value={fields[field]} onChange={event => setFields({ ...fields, [field]: event.target.value })} required maxLength={field === 'name' ? 120 : 254} aria-invalid={Boolean(errors[field])} aria-describedby={errors[field] ? `error-${field}` : undefined}/>{errors[field] && <span className="field-error" id={`error-${field}`}>{errors[field]}</span>}</label>)}</div>
      <label htmlFor="contact-subject">Subject<input id="contact-subject" name="subject" placeholder="What would you like to talk about?" value={fields.subject} onChange={event => setFields({ ...fields, subject: event.target.value })} required maxLength={200} aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? 'error-subject' : undefined}/>{errors.subject && <span className="field-error" id="error-subject">{errors.subject}</span>}</label>
      <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" rows={4} placeholder="Tell me a little about your idea or opportunity…" value={fields.message} onChange={event => setFields({ ...fields, message: event.target.value })} required maxLength={5000} aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'error-message' : undefined}/>{errors.message && <span className="field-error" id="error-message">{errors.message}</span>}</label>
      {status === 'error' && <p className="submission-error" role="alert">Your message could not be submitted. Please try again or email <a href="mailto:tamim4346@gmail.com">tamim4346@gmail.com</a> directly.</p>}
      <button type="submit" className="button button-primary" disabled={status === 'sending'}>{status === 'sending' ? <>Sending message <LoaderCircle size={17} className="loading-icon"/></> : <>Send Message <ArrowUpRight size={17}/></>}</button>
      <p className="form-footnote">Securely submitted through Netlify Forms.</p>
    </form>}
  </div>
}
