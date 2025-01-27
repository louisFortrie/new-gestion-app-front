'use client'

export const AboutScreen = () => {
  const features = [
    {
      title: 'Gestion simplifiée de vos fiches Google My Business',
      description:
        "Modifiez facilement vos horaires d'ouverture, descriptions, et autres informations essentielles pour toutes vos boutiques.",
    },
    {
      title: 'Gestion centralisée des avis clients',
      description:
        'Visualisez et gérez tous vos avis clients depuis une interface unique. Suivez les notes, dates et statuts de réponse.',
    },
    {
      title: 'Réponses intelligentes aux avis',
      description:
        "Générez des réponses personnalisées grâce à l'intelligence artificielle et utilisez des templates pré-définis selon le type d'avis.",
    },
    {
      title: 'Analyses et statistiques détaillées',
      description:
        'Accédez à des tableaux de bord complets pour suivre la performance de vos établissements.',
    },
  ]

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>À propos d'Avistar</h1>
          <p style={styles.subtitle}>
            Votre solution tout-en-un pour la gestion de vos établissements sur Google My Business
          </p>
        </div>

        <div style={styles.card}>
          <p style={styles.description}>
            Avistar est une plateforme innovante conçue pour simplifier la gestion de votre présence
            sur Google My Business. En vous connectant avec votre compte Google, vous pouvez
            centraliser la gestion de tous vos établissements et optimiser votre présence en ligne
            de manière efficace.
          </p>
        </div>

        <div style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div key={index} style={styles.featureCard}>
              <div style={styles.featureContent}>
                <h3 style={styles.featureTitle}>{feature.title}</h3>
                <p style={styles.featureDescription}>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <h2 style={styles.sectionTitle}>Commencez dès maintenant</h2>
          <p style={styles.description}>
            Connectez-vous avec votre compte Google pour commencer à gérer vos établissements et
            améliorer votre présence en ligne de manière efficace.
          </p>
          <p style={styles.footer}>
            © 2025 Avistar |{' '}
            <a href="https://gestion.avistar.fr/privacy" target="_blank" style={styles.link}>
              Politique de confidentialité
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

import { CSSProperties } from 'react'

const styles: { [key: string]: CSSProperties } = {
  container: {
    flex: 1,
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: 'Outfit, sans-serif',
  },
  content: {
    maxWidth: '1024px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.25rem',
    color: '#4B5563',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  description: {
    color: '#4B5563',
    lineHeight: '1.6',
    marginBottom: '1rem',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  featureCard: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  featureContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  featureTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    color: '#111827',
  },
  featureDescription: {
    color: '#4B5563',
    lineHeight: '1.5',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    marginBottom: '1rem',
  },
  footer: {
    fontSize: '0.875rem',
    color: '#6B7280',
    marginTop: '2rem',
  },
  link: {
    color: '#2563EB',
    textDecoration: 'none',
  },
}
