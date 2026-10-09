import React, { useState } from 'react';
import { Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [topic, setTopic] = useState('General');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

  return (
    <div style={{ backgroundColor: '#131924', color: '#F7F2E8', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* Header */}
      <section style={{ padding: 'clamp(80px, 12vw, 150px) 0 clamp(40px, 6vw, 70px) 0', borderBottom: '1px solid rgba(247, 242, 232, 0.1)' }}>
        <div className="container-wide">
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.25em', color: 'var(--butter)', display: 'block', marginBottom: '14px' }}>
            STUDIO ENQUIRIES // AFTER HOURS
          </span>

          <h1 style={{ fontFamily: 'var(--font-theater)', fontSize: 'var(--text-mega)', lineHeight: 0.92, letterSpacing: '-0.03em' }}>
            WRITE BEFORE DARK.
          </h1>

          <p style={{ fontFamily: 'var(--font-personality)', fontSize: 'clamp(20px, 2.5vw, 28px)', fontStyle: 'italic', color: '#D7CDBD', marginTop: '20px', maxWidth: '720px' }}>
            Whether you are commissioning fixtures for a private residence, inquiring about lead times, or requesting a studio visit.
          </p>
        </div>
      </section>

      {/* Main Split Content: Form & Studio Atelier Details */}
      <section style={{ paddingTop: '64px' }}>
        <div className="container-wide">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1fr',
              gap: 'clamp(32px, 6vw, 84px)',
              alignItems: 'start'
            }}
            className="editorial-card-grid"
          >
            {/* Form */}
            <div>
              {isSent ? (
                <div style={{ padding: '48px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(247, 242, 232, 0.15)', textAlign: 'center' }}>
                  <CheckCircle2 size={44} color="#E9C978" style={{ margin: '0 auto 20px auto' }} />
                  <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '32px', marginBottom: '8px' }}>
                    Message Received.
                  </h3>
                  <p style={{ fontSize: '15px', color: '#D7CDBD', maxWidth: '420px', margin: '0 auto' }}>
                    We read all correspondence by natural light each morning and will reply to your inquiry promptly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    padding: 'clamp(24px, 5vw, 48px)',
                    border: '1px solid rgba(247, 242, 232, 0.12)'
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        style={{
                          width: '100%',
                          padding: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(247, 242, 232, 0.2)',
                          color: '#F7F2E8',
                          fontFamily: 'var(--font-ui)',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jane@domain.com"
                        style={{
                          width: '100%',
                          padding: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(247, 242, 232, 0.2)',
                          color: '#F7F2E8',
                          fontFamily: 'var(--font-ui)',
                          fontSize: '14px',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                      INQUIRY TOPIC *
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {['General', 'Orders & Lead Times', 'Trade Program', 'Press', 'Repairs & Care'].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTopic(t)}
                          style={{
                            padding: '8px 14px',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            backgroundColor: topic === t ? 'var(--butter)' : 'rgba(255, 255, 255, 0.06)',
                            color: topic === t ? '#1E1C1A' : '#F7F2E8',
                            border: '1px solid rgba(247, 242, 232, 0.15)'
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                      ORDER OR PROJECT NUMBER (OPTIONAL)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. OH-2026-084"
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(247, 242, 232, 0.2)',
                        color: '#F7F2E8',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.1em', marginBottom: '8px' }}>
                      MESSAGE *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="How can our studio assist your room?"
                      style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        border: '1px solid rgba(247, 242, 232, 0.2)',
                        color: '#F7F2E8',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '14px',
                        outline: 'none',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ backgroundColor: 'var(--butter)', color: '#1E1C1A', borderColor: 'var(--butter)', padding: '16px 36px', alignSelf: 'flex-start' }}
                  >
                    <span>SEND CORRESPONDENCE &rarr;</span>
                  </button>
                </form>
              )}
            </div>

            {/* Studio Address & Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--butter)' }}>
                  THE ATELIER
                </span>
                <h3 style={{ fontFamily: 'var(--font-theater)', fontSize: '32px', marginTop: '6px' }}>
                  London Studio.
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: '#D7CDBD', marginTop: '12px' }}>
                  42 St. Jude’s Mews, Clerkenwell<br />
                  London EC1R 0LT, United Kingdom
                </p>
              </div>

              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.2em', color: 'var(--butter)' }}>
                  BY APPOINTMENT
                </span>
                <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#D7CDBD', marginTop: '8px' }}>
                  Tuesday &ndash; Friday: 10:00 &ndash; 18:00<br />
                  Evening viewings arranged by request for trade specifiers.
                </p>
              </div>

              <div style={{ padding: '24px', backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(247, 242, 232, 0.1)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.15em', color: '#E9C978', display: 'block', marginBottom: '8px' }}>
                  DIRECT CHANNELS
                </span>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#F7F2E8' }}>
                  General: studio@orielhouse.design<br />
                  Trade: trade@orielhouse.design<br />
                  Telephone: +44 (0)20 7946 0842
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
