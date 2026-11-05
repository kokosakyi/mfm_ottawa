'use client'

import React, { useActionState, useEffect, useRef } from 'react'
import {
  submitContactForm,
  type ContactActionState,
} from '@/app/(frontend)/contact-us/actions'

const initialState: ContactActionState = {
  status: 'idle',
  message: '',
}

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState,
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state.status])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="wpcf7-form"
      aria-label="Contact form"
    >
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="website_hp">Leave this field empty</label>
        <input
          id="website_hp"
          name="website_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="form-field">
        <label htmlFor="contact-your-name">Your name / Votre nom</label>
        <span className="wpcf7-form-control-wrap">
          <input
            id="contact-your-name"
            name="your-name"
            type="text"
            required
            maxLength={400}
            autoComplete="name"
            className="wpcf7-form-control"
          />
        </span>
      </div>

      <div className="form-field">
        <label htmlFor="contact-your-email">Your email / Votre courriel</label>
        <span className="wpcf7-form-control-wrap">
          <input
            id="contact-your-email"
            name="your-email"
            type="email"
            required
            maxLength={400}
            autoComplete="email"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            className="wpcf7-form-control"
          />
        </span>
      </div>

      <div className="form-field">
        <label htmlFor="contact-your-subject">Subject / Sujet</label>
        <span className="wpcf7-form-control-wrap">
          <input
            id="contact-your-subject"
            name="your-subject"
            type="text"
            required
            maxLength={400}
            className="wpcf7-form-control"
          />
        </span>
      </div>

      <div className="form-field">
        <label htmlFor="contact-your-message">
          Your message / Votre message
        </label>
        <span className="wpcf7-form-control-wrap">
          <textarea
            id="contact-your-message"
            name="your-message"
            rows={10}
            required
            maxLength={2000}
            className="wpcf7-form-control"
          />
        </span>
      </div>

      <div className="form-field">
        <button type="submit" className="wpcf7-submit" disabled={isPending}>
          {isPending ? 'Sending... / Envoi...' : 'Submit/Soumettre'}
        </button>
      </div>

      {state.status !== 'idle' && (
        <div
          role="status"
          aria-live="polite"
          className={`wpcf7-response-output ${
            state.status === 'success'
              ? 'wpcf7-response-output--success'
              : 'wpcf7-response-output--error'
          }`}
        >
          {state.message}
        </div>
      )}
    </form>
  )
}
