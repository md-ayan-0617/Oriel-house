import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';

const tradeSchema = z.object({
  fullName: z.string().min(2, 'Please provide your full name'),
  company: z.string().min(2, 'Please provide your studio or company name'),
  profession: z.string().min(1, 'Please select your profession'),
  website: z.string().url('Please enter a valid website URL (including https://)'),
  email: z.string().email('Please enter a valid business email address'),
  country: z.string().min(2, 'Please specify your country of practice'),
  projectType: z.string().min(1, 'Please select current project type'),
  expectedUsage: z.string().min(1, 'Please indicate anticipated fixture volume'),
  message: z.string().min(10, 'Please share brief details on your upcoming project or specification needs')
});

type TradeFormData = z.infer<typeof tradeSchema>;

export const TradeApply: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<TradeFormData>({
    resolver: zodResolver(tradeSchema)
  });

  const onSubmit = async (data: TradeFormData) => {
    // Simulate studio concierge receipt
    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log('Trade Application Received:', data);
    setIsSubmitted(true);
  };

  return (
    <div style={{ backgroundColor: 'var(--warm-ivory)', minHeight: '100vh', paddingBottom: '120px' }}>
      <section style={{ padding: 'clamp(64px, 8vw, 110px) 0 clamp(32px, 4vw, 56px) 0', borderBottom: '1px solid rgba(30, 28, 26, 0.08)' }}>
        <div className="container-narrow">
          <Link
            to="/trade"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.15em',
              color: 'var(--stone)',
              marginBottom: '24px'
            }}
          >
            <ArrowLeft size={14} />
            <span>BACK TO TRADE PROGRAM</span>
          </Link>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: 'var(--oxblood)', display: 'block', marginBottom: '12px' }}>
            PROFESSIONAL SPECIFICATION ACCOUNT
          </span>

          <h1 style={{ fontFamily: 'var(--font-theater)', fontSize: 'clamp(44px, 6vw, 84px)', lineHeight: 0.98 }}>
            Trade Application.
          </h1>

          <p style={{ fontFamily: 'var(--font-personality)', fontSize: '20px', fontStyle: 'italic', color: 'var(--espresso)', marginTop: '16px' }}>
            Exclusive services for registered architects, interior designers, lighting consultants, and hospitality specifiers.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: '56px' }}>
        <div className="container-narrow">
          {isSubmitted ? (
            <div
              style={{
                padding: '64px 40px',
                backgroundColor: 'var(--parchment)',
                border: '1px solid rgba(30, 28, 26, 0.1)',
                textAlign: 'center'
              }}
            >
              <CheckCircle2 size={48} color="var(--oxblood)" style={{ margin: '0 auto 24px auto' }} />
              <h2 style={{ fontFamily: 'var(--font-theater)', fontSize: '38px', marginBottom: '12px' }}>
                Application Received.
              </h2>
              <p style={{ fontSize: '16px', lineHeight: 1.6, color: 'var(--espresso)', maxWidth: '540px', margin: '0 auto 28px auto' }}>
                Our studio trade concierge will review your credentials and dispatch your trade portal credentials and complimentary material swatch kit within 24 hours.
              </p>
              <Link to="/trade/projects" className="btn-primary">
                <span>VIEW RECENT TRADE PROJECTS &rarr;</span>
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '24px',
                backgroundColor: 'var(--parchment)',
                padding: 'clamp(28px, 5vw, 56px)',
                border: '1px solid rgba(30, 28, 26, 0.1)'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    {...register('fullName')}
                    placeholder="e.g. Alistair Vance"
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--warm-ivory)',
                      border: errors.fullName ? '1px solid var(--oxblood)' : '1px solid rgba(30, 28, 26, 0.2)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  {errors.fullName && <span style={{ color: 'var(--oxblood)', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.fullName.message}</span>}
                </div>

                {/* Company / Studio */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    COMPANY / STUDIO NAME *
                  </label>
                  <input
                    type="text"
                    {...register('company')}
                    placeholder="e.g. Studio Vance Architecture"
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--warm-ivory)',
                      border: errors.company ? '1px solid var(--oxblood)' : '1px solid rgba(30, 28, 26, 0.2)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  {errors.company && <span style={{ color: 'var(--oxblood)', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.company.message}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {/* Profession */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    PROFESSION / PRACTICE *
                  </label>
                  <select
                    {...register('profession')}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--warm-ivory)',
                      border: errors.profession ? '1px solid var(--oxblood)' : '1px solid rgba(30, 28, 26, 0.2)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="">Select profession</option>
                    <option value="Interior Designer">Interior Designer</option>
                    <option value="Architect">Architect</option>
                    <option value="Lighting Consultant">Lighting Consultant / Specifier</option>
                    <option value="Hospitality Developer">Hospitality Developer / Operator</option>
                    <option value="Stylist">Stylist / Art Buyer</option>
                  </select>
                  {errors.profession && <span style={{ color: 'var(--oxblood)', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.profession.message}</span>}
                </div>

                {/* Website */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    PRACTICE WEBSITE *
                  </label>
                  <input
                    type="url"
                    {...register('website')}
                    placeholder="https://yourstudio.com"
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--warm-ivory)',
                      border: errors.website ? '1px solid var(--oxblood)' : '1px solid rgba(30, 28, 26, 0.2)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  {errors.website && <span style={{ color: 'var(--oxblood)', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.website.message}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {/* Business Email */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    BUSINESS EMAIL *
                  </label>
                  <input
                    type="email"
                    {...register('email')}
                    placeholder="designer@studio.com"
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--warm-ivory)',
                      border: errors.email ? '1px solid var(--oxblood)' : '1px solid rgba(30, 28, 26, 0.2)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  {errors.email && <span style={{ color: 'var(--oxblood)', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.email.message}</span>}
                </div>

                {/* Country */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    COUNTRY / LOCATION *
                  </label>
                  <input
                    type="text"
                    {...register('country')}
                    placeholder="e.g. United States, United Kingdom, France"
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--warm-ivory)',
                      border: errors.country ? '1px solid var(--oxblood)' : '1px solid rgba(30, 28, 26, 0.2)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  {errors.country && <span style={{ color: 'var(--oxblood)', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.country.message}</span>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
                {/* Project Type */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    ACTIVE PROJECT TYPE *
                  </label>
                  <select
                    {...register('projectType')}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--warm-ivory)',
                      border: errors.projectType ? '1px solid var(--oxblood)' : '1px solid rgba(30, 28, 26, 0.2)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="">Select project type</option>
                    <option value="High-End Residential">High-End Residential</option>
                    <option value="Boutique Hotel / Resort">Boutique Hotel / Resort</option>
                    <option value="Restaurant / Wine Bar">Restaurant / Wine Bar</option>
                    <option value="Private Office / Gallery">Private Office / Gallery</option>
                    <option value="Other">Other Architectural Commission</option>
                  </select>
                  {errors.projectType && <span style={{ color: 'var(--oxblood)', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.projectType.message}</span>}
                </div>

                {/* Expected Volume */}
                <div>
                  <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                    ANTICIPATED USAGE *
                  </label>
                  <select
                    {...register('expectedUsage')}
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--warm-ivory)',
                      border: errors.expectedUsage ? '1px solid var(--oxblood)' : '1px solid rgba(30, 28, 26, 0.2)',
                      fontFamily: 'var(--font-ui)',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  >
                    <option value="">Select volume</option>
                    <option value="1–5 fixtures">1–5 fixtures (Single residential commission)</option>
                    <option value="6–20 fixtures">6–20 fixtures (Multi-room residential / Penthouse)</option>
                    <option value="20+ fixtures">20+ fixtures (Hospitality / Hotel schedule)</option>
                  </select>
                  {errors.expectedUsage && <span style={{ color: 'var(--oxblood)', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.expectedUsage.message}</span>}
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  PROJECT SPECIFICATION BRIEF / NOTES *
                </label>
                <textarea
                  rows={4}
                  {...register('message')}
                  placeholder="Share details regarding target installation dates, custom finishes, or spec sheets required..."
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: 'var(--warm-ivory)',
                    border: errors.message ? '1px solid var(--oxblood)' : '1px solid rgba(30, 28, 26, 0.2)',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
                {errors.message && <span style={{ color: 'var(--oxblood)', fontSize: '11px', marginTop: '4px', display: 'block' }}>{errors.message.message}</span>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ padding: '16px 36px', alignSelf: 'flex-start', marginTop: '12px' }}
              >
                <span>{isSubmitting ? 'PROCESSING...' : 'SUBMIT TRADE CREDENTIALS &rarr;'}</span>
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
