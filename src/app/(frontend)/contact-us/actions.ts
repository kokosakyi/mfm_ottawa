'use server'

import { getPayloadClient } from '@/lib/payload'

export interface ContactActionState {
  status: 'idle' | 'success' | 'error'
  message: string
}

export async function submitContactForm(
  _prevState: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const name = String(formData.get('your-name') ?? '').trim()
  const email = String(formData.get('your-email') ?? '').trim()
  const subject = String(formData.get('your-subject') ?? '').trim()
  const message = String(formData.get('your-message') ?? '').trim()
  const honeypot = String(formData.get('website_hp') ?? '').trim()

  if (honeypot) {
    return {
      status: 'success',
      message:
        'Thank you for your message. It has been sent. / Merci pour votre message. Il a été envoyé.',
    }
  }

  if (!name || !email || !subject || !message) {
    return {
      status: 'error',
      message:
        'One or more fields have an error. Please check and try again. / Un ou plusieurs champs contiennent une erreur.',
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      status: 'error',
      message:
        'Please enter a valid email address. / Veuillez entrer une adresse courriel valide.',
    }
  }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'contact-submissions',
      data: {
        name,
        email,
        subject,
        message,
        status: 'new',
      },
    })

    return {
      status: 'success',
      message:
        'Thank you for your message. It has been sent. / Merci pour votre message. Il a été envoyé.',
    }
  } catch (err) {
    console.error('Failed to store contact submission:', err)
    return {
      status: 'error',
      message:
        'There was an error trying to send your message. Please try again later.',
    }
  }
}
