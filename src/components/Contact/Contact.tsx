'use client'

import { useState } from 'react'
import { MdEmail } from 'react-icons/md'
import { IoCall } from 'react-icons/io5'
import './Contact.scss'

type ContactProps = {
  email: string
  phone: string
}

export function Contact({ email, phone }: ContactProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const { name: username, email: formEmail, message } = formData

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })
      if (res.ok) {
        setIsFormSubmitted(true)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app__contact" id="contact">
      <h2 className="head-text">Take a coffee & chat with me</h2>

      <div className="app__footer-cards">
        {email && (
          <div className="app__footer-card">
            <a href={`mailto:${email}`}>
              <MdEmail /> <span style={{ padding: '2px' }} /> {email}
            </a>
          </div>
        )}
        {phone && (
          <div className="app__footer-card">
            <a href={`tel:${phone}`}>
              <IoCall /> <span style={{ padding: '2px' }} /> {phone}
            </a>
          </div>
        )}
      </div>

      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <div className="app__flex">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              name="name"
              value={username}
              onChange={handleChangeInput}
            />
          </div>
          <div className="app__flex">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              name="email"
              value={formEmail}
              onChange={handleChangeInput}
            />
          </div>
          <div>
            <textarea
              className="p-text"
              placeholder="Your Message"
              value={message}
              name="message"
              onChange={handleChangeInput}
            />
          </div>
          <button type="button" className="p-text" onClick={handleSubmit} disabled={loading}>
            {!loading ? 'Send Message' : 'Sending...'}
          </button>
        </div>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch!</h3>
        </div>
      )}
    </div>
  )
}
