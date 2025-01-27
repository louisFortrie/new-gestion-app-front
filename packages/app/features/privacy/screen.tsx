export const Privacy = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Règles de Confidentialité RKSE (Avistar)</h1>
      <h2 style={styles.subtitle}>Dernière mise à jour : 22/11/2024</h2>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>1. Responsable du Traitement</h3>
        <p style={styles.text}>
          La société RKSE, exploitant sous la marque Avistar, est responsable du traitement des
          données personnelles collectées via ses services.
        </p>
        <p style={styles.text}>Coordonnées :</p>
        <p style={styles.text}>Nom : RKSE / Avistar</p>
        <p style={styles.text}>Adresse : 46 rue de l’avenir 94380, Bonneuil-sur-Marne, France</p>
        <p style={styles.text}>Email : contact@avistar.fr</p>
        <p style={styles.text}>Téléphone : 06 52 25 63 81</p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>2. Données Collectées</h3>
        <p style={styles.text}>Nous collectons et traitons les données personnelles suivantes :</p>
        <h4 style={styles.subsectionTitle}>2.1. Données fournies directement par l'utilisateur</h4>
        <p style={styles.text}>Nom et prénom</p>
        <p style={styles.text}>Adresse email</p>
        <p style={styles.text}>Numéro de téléphone</p>
        <p style={styles.text}>Informations de facturation</p>
        <p style={styles.text}>
          Informations relatives aux comptes Google connectés (permissions, identifiants des pages,
          etc.)
        </p>
        <h4 style={styles.subsectionTitle}>2.2. Données collectées automatiquement</h4>
        <p style={styles.text}>Adresse IP</p>
        <p style={styles.text}>Informations sur le navigateur et l’appareil utilisé</p>
        <p style={styles.text}>
          Données de navigation et d’interaction avec nos services (pages consultées, clics, etc.)
        </p>
        <h4 style={styles.subsectionTitle}>2.3. Données des clients finaux</h4>
        <p style={styles.text}>
          Dans le cadre de nos services, nous collectons les données relatives aux avis clients
          (notes, commentaires) et les informations associées aux pages Google concernées. Ces
          données ne sont pas associées à des informations personnelles sans consentement explicite.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>3. Finalités du Traitement</h3>
        <p style={styles.text}>
          Nous utilisons vos données personnelles pour les finalités suivantes :
        </p>
        <p style={styles.text}>
          Fournir et améliorer nos services, notamment la gestion des pages Google et des avis
        </p>
        <p style={styles.text}>
          Permettre l’utilisation de l’application et ses fonctionnalités principales
        </p>
        <p style={styles.text}>Garantir la sécurité et le bon fonctionnement de nos plateformes</p>
        <p style={styles.text}>
          Vous communiquer des informations sur nos services, mises à jour et offres
        </p>
        <p style={styles.text}>Respecter nos obligations légales et réglementaires</p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>4. Partage des Données</h3>
        <p style={styles.text}>
          Nous ne vendons jamais vos données personnelles à des tiers. Cependant, vos données
          peuvent être partagées avec :
        </p>
        <p style={styles.text}>
          Fournisseurs tiers : pour l’hébergement, la maintenance technique, les services Google
          API, et autres outils nécessaires à l'exécution de nos services.
        </p>
        <p style={styles.text}>
          Autorités légales : si requis par la loi ou pour protéger nos droits.
        </p>
        <p style={styles.text}>
          Tous nos partenaires sont contractuellement tenus de respecter la confidentialité et la
          sécurité de vos données.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>5. Utilisation des API Google</h3>
        <p style={styles.text}>
          Notre application utilise les API Google pour permettre la gestion des pages et avis
          Google. Ces accès sont soumis aux conditions d’utilisation des API Google, et nous
          n’accédons qu’aux données pour lesquelles vous avez explicitement donné votre
          consentement. Les permissions requises sont limitées au strict nécessaire pour exécuter
          les fonctionnalités de l'application.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>6. Conservation des Données</h3>
        <p style={styles.text}>
          Nous conservons vos données personnelles uniquement pendant la durée nécessaire pour
          atteindre les finalités décrites dans cette politique ou pour satisfaire aux exigences
          légales. Les données associées aux comptes Google connectés sont supprimées dès que
          l’utilisateur déconnecte son compte ou cesse d’utiliser nos services.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>7. Vos Droits</h3>
        <p style={styles.text}>
          Conformément au Règlement Général sur la Protection des Données (RGPD) et à la Loi
          Informatique et Libertés, vous disposez des droits suivants :
        </p>
        <p style={styles.text}>
          Droit d'accès : consulter les données personnelles que nous détenons sur vous.
        </p>
        <p style={styles.text}>
          Droit de rectification : corriger des données inexactes ou incomplètes.
        </p>
        <p style={styles.text}>
          Droit à l’effacement : demander la suppression de vos données personnelles.
        </p>
        <p style={styles.text}>
          Droit à la portabilité : récupérer vos données dans un format structuré.
        </p>
        <p style={styles.text}>Droit d’opposition : refuser certains traitements de vos données.</p>
        <p style={styles.text}>
          Pour exercer vos droits, vous pouvez nous contacter à [Email de contact].
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>8. Cookies et Technologies Similaires</h3>
        <p style={styles.text}>
          Nous utilisons des cookies pour vous authentifier et rien d’autre.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>9. Sécurité des Données</h3>
        <p style={styles.text}>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
          protéger vos données contre les accès non autorisés, les pertes, les altérations ou les
          divulgations. Toutes les communications entre notre application et les services Google
          sont chiffrées et sécurisées.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>10. Modifications de la Politique</h3>
        <p style={styles.text}>
          Cette politique de confidentialité peut être mise à jour à tout moment pour refléter des
          changements dans nos pratiques ou pour se conformer à des évolutions légales. En cas de
          modification importante, nous vous en informerons via nos services ou par email.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>11. Contact</h3>
        <p style={styles.text}>
          Pour toute question ou demande concernant cette politique ou vos données personnelles,
          veuillez nous contacter à :
        </p>
        <p style={styles.text}>Email : contact@avistar.fr</p>
        <p style={styles.text}>Adresse : 46 rue de l’Avenir 94380, Bonneuil-sur-Marne, France</p>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '16px',
    backgroundColor: '#fff',
    fontFamily: 'Outfit, sans-serif',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  subtitle: {
    fontSize: '16px',
    marginBottom: '16px',
  },
  section: {
    marginBottom: '16px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '8px',
  },
  subsectionTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '4px',
  },
  text: {
    fontSize: '14px',
    marginBottom: '4px',
  },
}
