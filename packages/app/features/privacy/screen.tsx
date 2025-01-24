import { ScrollView, Text, View, StyleSheet } from 'react-native'

export const Privacy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Règles de Confidentialité RKSE (Avistar)</Text>
      <Text style={styles.subtitle}>Dernière mise à jour : 22/11/2024</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>1. Responsable du Traitement</Text>
        <Text style={styles.text}>
          La société RKSE, exploitant sous la marque Avistar, est responsable du traitement des
          données personnelles collectées via ses services.
        </Text>
        <Text style={styles.text}>Coordonnées :</Text>
        <Text style={styles.text}>Nom : RKSE / Avistar</Text>
        <Text style={styles.text}>
          Adresse : 46 rue de l’avenir 94380, Bonneuil-sur-Marne, France
        </Text>
        <Text style={styles.text}>Email : contact@avistar.fr</Text>
        <Text style={styles.text}>Téléphone : 06 52 25 63 81</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2. Données Collectées</Text>
        <Text style={styles.text}>
          Nous collectons et traitons les données personnelles suivantes :
        </Text>
        <Text style={styles.subsectionTitle}>
          2.1. Données fournies directement par l'utilisateur
        </Text>
        <Text style={styles.text}>Nom et prénom</Text>
        <Text style={styles.text}>Adresse email</Text>
        <Text style={styles.text}>Numéro de téléphone</Text>
        <Text style={styles.text}>Informations de facturation</Text>
        <Text style={styles.text}>
          Informations relatives aux comptes Google connectés (permissions, identifiants des pages,
          etc.)
        </Text>
        <Text style={styles.subsectionTitle}>2.2. Données collectées automatiquement</Text>
        <Text style={styles.text}>Adresse IP</Text>
        <Text style={styles.text}>Informations sur le navigateur et l’appareil utilisé</Text>
        <Text style={styles.text}>
          Données de navigation et d’interaction avec nos services (pages consultées, clics, etc.)
        </Text>
        <Text style={styles.subsectionTitle}>2.3. Données des clients finaux</Text>
        <Text style={styles.text}>
          Dans le cadre de nos services, nous collectons les données relatives aux avis clients
          (notes, commentaires) et les informations associées aux pages Google concernées. Ces
          données ne sont pas associées à des informations personnelles sans consentement explicite.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>3. Finalités du Traitement</Text>
        <Text style={styles.text}>
          Nous utilisons vos données personnelles pour les finalités suivantes :
        </Text>
        <Text style={styles.text}>
          Fournir et améliorer nos services, notamment la gestion des pages Google et des avis
        </Text>
        <Text style={styles.text}>
          Permettre l’utilisation de l’application et ses fonctionnalités principales
        </Text>
        <Text style={styles.text}>
          Garantir la sécurité et le bon fonctionnement de nos plateformes
        </Text>
        <Text style={styles.text}>
          Vous communiquer des informations sur nos services, mises à jour et offres
        </Text>
        <Text style={styles.text}>Respecter nos obligations légales et réglementaires</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>4. Partage des Données</Text>
        <Text style={styles.text}>
          Nous ne vendons jamais vos données personnelles à des tiers. Cependant, vos données
          peuvent être partagées avec :
        </Text>
        <Text style={styles.text}>
          Fournisseurs tiers : pour l’hébergement, la maintenance technique, les services Google
          API, et autres outils nécessaires à l'exécution de nos services.
        </Text>
        <Text style={styles.text}>
          Autorités légales : si requis par la loi ou pour protéger nos droits.
        </Text>
        <Text style={styles.text}>
          Tous nos partenaires sont contractuellement tenus de respecter la confidentialité et la
          sécurité de vos données.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>5. Utilisation des API Google</Text>
        <Text style={styles.text}>
          Notre application utilise les API Google pour permettre la gestion des pages et avis
          Google. Ces accès sont soumis aux conditions d’utilisation des API Google, et nous
          n’accédons qu’aux données pour lesquelles vous avez explicitement donné votre
          consentement. Les permissions requises sont limitées au strict nécessaire pour exécuter
          les fonctionnalités de l'application.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>6. Conservation des Données</Text>
        <Text style={styles.text}>
          Nous conservons vos données personnelles uniquement pendant la durée nécessaire pour
          atteindre les finalités décrites dans cette politique ou pour satisfaire aux exigences
          légales. Les données associées aux comptes Google connectés sont supprimées dès que
          l’utilisateur déconnecte son compte ou cesse d’utiliser nos services.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7. Vos Droits</Text>
        <Text style={styles.text}>
          Conformément au Règlement Général sur la Protection des Données (RGPD) et à la Loi
          Informatique et Libertés, vous disposez des droits suivants :
        </Text>
        <Text style={styles.text}>
          Droit d'accès : consulter les données personnelles que nous détenons sur vous.
        </Text>
        <Text style={styles.text}>
          Droit de rectification : corriger des données inexactes ou incomplètes.
        </Text>
        <Text style={styles.text}>
          Droit à l’effacement : demander la suppression de vos données personnelles.
        </Text>
        <Text style={styles.text}>
          Droit à la portabilité : récupérer vos données dans un format structuré.
        </Text>
        <Text style={styles.text}>
          Droit d’opposition : refuser certains traitements de vos données.
        </Text>
        <Text style={styles.text}>
          Pour exercer vos droits, vous pouvez nous contacter à [Email de contact].
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>8. Cookies et Technologies Similaires</Text>
        <Text style={styles.text}>
          Nous utilisons des cookies pour vous authentifier et rien d’autre.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>9. Sécurité des Données</Text>
        <Text style={styles.text}>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
          protéger vos données contre les accès non autorisés, les pertes, les altérations ou les
          divulgations. Toutes les communications entre notre application et les services Google
          sont chiffrées et sécurisées.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>10. Modifications de la Politique</Text>
        <Text style={styles.text}>
          Cette politique de confidentialité peut être mise à jour à tout moment pour refléter des
          changements dans nos pratiques ou pour se conformer à des évolutions légales. En cas de
          modification importante, nous vous en informerons via nos services ou par email.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>11. Contact</Text>
        <Text style={styles.text}>
          Pour toute question ou demande concernant cette politique ou vos données personnelles,
          veuillez nous contacter à :
        </Text>
        <Text style={styles.text}>Email : contact@avistar.fr</Text>
        <Text style={styles.text}>
          Adresse : 46 rue de l’Avenir 94380, Bonneuil-sur-Marne, France
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subsectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 4,
  },
})
