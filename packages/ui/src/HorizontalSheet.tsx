import { use, useEffect, useState } from 'react'
import {
  Sheet,
  Button,
  YStack,
  XStack,
  styled,
  Text,
  AnimatePresence,
  Stack,
  TextArea,
  Dialog,
  Unspaced,
  Spinner,
} from 'tamagui'
import {
  Calendar,
  LayoutTemplate,
  MessagesSquare,
  PenSquare,
  Reply,
  Sparkles,
  Star,
  StarFull,
  Trash2,
  User2,
  X,
} from '@tamagui/lucide-icons'
import { CustomButton } from './CustomButton'
import axios from 'axios'
import useAuth from 'app/hooks/useAuth'
import useStores from 'app/hooks/useStores'

interface ReviewResponse {
  id: number
  text: string
}

interface AuthorResponses {
  author: string
  responses: ReviewResponse[]
}

export const RESTAURANT_RESPONSES: AuthorResponses[] = [
  {
    author: 'Victoria Giret-caradec',
    responses: [
      {
        id: 0,
        text: "Bonjour Victoria,\nUn grand merci pour votre superbe avis ! 🌟 Nous sommes ravis d'apprendre que vous avez apprécié la rapidité de la livraison et, surtout, que nos plats ont su vous régaler. Votre satisfaction est notre plus belle récompense !\nÀ très bientôt pour une nouvelle expérience tout aussi délicieuse. 😊",
      },
      {
        id: 1,
        text: 'Bonjour Victoria,\nQuel plaisir de lire votre message ! 😊 Nous sommes ravis que vous ayez été conquise par nos plats et par la rapidité de notre service. Votre satisfaction nous motive à continuer de donner le meilleur chaque jour. Merci pour vos 5 étoiles et à très bientôt ! 🌟',
      },
      {
        id: 2,
        text: 'Bonjour Victoria,\nUn immense merci pour cet avis si enthousiaste ! Nous sommes heureux de savoir que notre cuisine vous a séduite dès la première bouchée. Cela nous fait chaud au cœur de recevoir un tel retour. À très vite pour une nouvelle commande gourmande ! 😋',
      },
      {
        id: 3,
        text: 'Bonjour Victoria,\nMerci infiniment pour ce retour si positif ! Savoir que notre service et nos plats vous ont pleinement satisfaite nous comble de joie. Nous espérons vous régaler à nouveau très bientôt. Passez une excellente journée ! 🥰',
      },
      {
        id: 4,
        text: "Bonjour Victoria,\nVotre avis nous fait tellement plaisir ! Nous sommes ravis que la rapidité de notre service et la qualité de nos plats aient répondu à vos attentes. Merci de partager votre expérience avec autant d'enthousiasme. À très bientôt ! 🍴✨",
      },
      {
        id: 5,
        text: "Bonjour Victoria,\nQuelle joie de découvrir votre avis ! Nous sommes enchantés de savoir que tout était parfait, de la livraison à nos plats. Merci pour ces mots chaleureux qui boostent toute l'équipe. À bientôt pour d'autres délices ! 🥂",
      },
      {
        id: 6,
        text: 'Bonjour Victoria,\nNous sommes touchés par vos mots et vos 5 étoiles ! ❤️ Cela nous motive encore plus à maintenir un service rapide et une cuisine savoureuse. Un grand merci pour votre retour. Nous serions ravis de vous régaler à nouveau prochainement ! ',
      },
    ],
  },
  {
    author: 'เทพ รัชยานนท',
    responses: [
      {
        id: 1,
        text: "Un grand merci pour cet avis plein d'enthousiasme ! 😊 Nous sommes ravis que l'entrée \"Dynamite\" ait su vous séduire avec son goût et son prix attractif. C'est un vrai plaisir de savoir que vous l'avez trouvée délicieuse. À très bientôt pour une nouvelle dégustation !",
      },
      {
        id: 2,
        text: 'Merci infiniment pour ce retour si gourmand ! 🤩 Nous sommes ravis que vous ayez apprécié l\'entrée "Dynamite" et ses saveurs. Votre satisfaction est notre priorité, et vos mots nous motivent à continuer de vous régaler. À bientôt !',
      },
      {
        id: 3,
        text: 'Quel plaisir de lire votre avis ! 😍 Nous sommes enchantés que l\'entrée "Dynamite" ait fait votre bonheur, tant par son goût que par son prix. Merci pour ces mots encourageants, et à très vite pour une nouvelle expérience tout aussi savoureuse !',
      },
      {
        id: 4,
        text: 'Merci beaucoup pour cet avis 5 étoiles ! 🌟 Nous sommes ravis que l\'entrée "Dynamite" vous ait tant plu. Votre satisfaction nous touche énormément, et nous espérons avoir le plaisir de vous régaler à nouveau prochainement.',
      },
      {
        id: 5,
        text: 'Un immense merci pour votre retour si positif ! ❤️ Savoir que l\'entrée "Dynamite" a su répondre à vos attentes est une vraie récompense pour nous. Nous serions ravis de vous faire découvrir d\'autres saveurs très bientôt.',
      },
      {
        id: 6,
        text: "Merci pour ce retour si chaleureux ! 😊 Nous sommes heureux de savoir que l'entrée \"Dynamite\" a été un vrai régal pour vous. C'est toujours un plaisir de voir nos clients satisfaits. À bientôt pour d'autres délices !",
      },
      {
        id: 7,
        text: 'Merci pour vos 5 étoiles et ce bel avis ! ✨ Nous sommes ravis que vous ayez trouvé l\'entrée "Dynamite" savoureuse et équilibrée. Votre retour positif est une belle récompense pour toute l\'équipe. À très vite !',
      },
    ],
  },
  {
    author: 'William Leroux',
    responses: [
      {
        id: 1,
        text: 'Merci beaucoup pour votre superbe avis, William ! 😊 Nous sommes ravis de savoir que vous avez trouvé nos portions généreuses et nos plats excellents. Au plaisir de vous accueillir à nouveau très bientôt !',
      },
      {
        id: 2,
        text: 'Un grand merci, William, pour ce retour enthousiaste ! 🌟 Nous sommes ravis que nos portions généreuses et notre cuisine aient su vous satisfaire. À très vite pour une nouvelle expérience gourmande !',
      },
      {
        id: 3,
        text: "Merci infiniment, William, pour vos 5 étoiles ! 🤩 C'est un plaisir de savoir que nos portions généreuses ont répondu à vos attentes. Nous espérons vous régaler à nouveau très prochainement !",
      },
      {
        id: 4,
        text: "William, votre avis nous fait tellement plaisir ! ✨ Merci d'avoir pris le temps de partager votre expérience. Nous sommes ravis que nos portions généreuses et notre qualité aient été à la hauteur. À bientôt !",
      },
      {
        id: 5,
        text: 'Merci pour vos mots chaleureux, William ! ❤️ Nous sommes ravis que nos portions et nos plats aient su vous conquérir. Votre satisfaction est notre priorité. À très bientôt !',
      },
      {
        id: 6,
        text: "Quel plaisir de lire votre avis, William ! 😊 Savoir que vous avez trouvé nos portions généreuses et nos plats excellents est une belle récompense pour toute l'équipe. Merci encore, et à très vite !",
      },
      {
        id: 7,
        text: 'William, un immense merci pour cet avis 5 étoiles ! 🌟 Nous sommes ravis que nos portions généreuses et notre qualité aient fait votre bonheur. Nous serions enchantés de vous revoir très bientôt !',
      },
    ],
  },
  {
    author: 'Angélina Fernandes',
    responses: [
      {
        id: 1,
        text: 'Merci beaucoup pour cet avis fantastique, Angélina ! 😊 Nous sommes ravis que vous considériez notre cuisine comme la meilleure du 94 et que vous vous régaliez à chaque visite. Votre recommandation nous fait chaud au cœur. À très bientôt !',
      },
      {
        id: 2,
        text: 'Un immense merci, Angélina, pour ces mots si élogieux ! 🌟 Savoir que vous appréciez autant nos plats et que vous nous considérez comme un incontournable du 94 est une belle récompense. À très vite pour continuer à vous régaler !',
      },
      {
        id: 3,
        text: 'Merci infiniment pour votre superbe retour, Angélina ! ❤️ Cela nous touche beaucoup de savoir que notre cuisine vous régale à chaque fois. Merci pour votre confiance et votre recommandation. À bientôt !',
      },
      {
        id: 4,
        text: "Angélina, quel plaisir de lire votre avis ! ✨ Nous sommes ravis que vous soyez conquise à chaque visite et que vous nous considériez comme une référence dans le 94. Merci pour votre fidélité et à très bientôt pour d'autres délices !",
      },
      {
        id: 5,
        text: 'Merci beaucoup pour ce magnifique avis, Angélina ! 😊 Votre satisfaction et votre recommandation sont la meilleure des récompenses pour notre équipe. Nous espérons vous revoir bientôt pour continuer à vous faire voyager avec nos saveurs !',
      },
      {
        id: 6,
        text: 'Angélina, un grand merci pour vos 5 étoiles et vos mots si encourageants ! 🤩 Nous sommes heureux de savoir que vous vous régalez à chaque fois. Votre recommandation est précieuse pour nous. À très bientôt !',
      },
      {
        id: 7,
        text: 'Merci infiniment pour votre retour, Angélina ! 🥰 Savoir que vous nous considérez comme "le meilleur du 94" est un immense honneur. Nous sommes ravis de vous satisfaire à chaque visite et serions enchantés de vous revoir très vite !',
      },
    ],
  },
  {
    author: 'Manga Online',
    responses: [
      {
        id: 1,
        text: 'Merci pour votre avis et cette belle note ! 😊 Nous sommes ravis que vous ayez apprécié votre expérience. Si vous avez des suggestions pour atteindre les 5 étoiles, nous sommes tout ouïe. À bientôt !',
      },
      {
        id: 2,
        text: "Un grand merci pour votre note ! 🌟 Nous sommes contents que votre expérience ait été positive. Si vous voyez un point à améliorer, n'hésitez pas à nous le partager. À très vite !",
      },
      {
        id: 3,
        text: 'Merci beaucoup pour votre retour ! 😊 Votre satisfaction nous tient à cœur, et si vous avez des idées pour rendre votre expérience encore meilleure, nous serions ravis de les entendre. À bientôt !',
      },
      {
        id: 4,
        text: 'Merci pour ces 4 étoiles ! ✨ Nous sommes heureux de savoir que vous avez apprécié. Si nous pouvons faire quoi que ce soit pour mériter la cinquième étoile, faites-le-nous savoir. À bientôt !',
      },
      {
        id: 5,
        text: "Merci pour votre note ! 😊 Nous sommes ravis que vous ayez passé un bon moment avec nous. Si vous avez des retours ou suggestions pour nous améliorer, n'hésitez pas à nous les partager.",
      },
      {
        id: 6,
        text: 'Un grand merci pour vos 4 étoiles ! 🤩 Nous cherchons toujours à nous dépasser pour rendre votre expérience encore meilleure. À bientôt pour peut-être décrocher la 5e étoile !',
      },
      {
        id: 7,
        text: "Merci pour votre retour ! 🌟 Nous sommes heureux de savoir que vous êtes satisfait. Si vous avez des idées pour nous aider à atteindre l'excellence, nous sommes à votre écoute. À bientôt !",
      },
    ],
  },
  {
    author: 'Obito Sid',
    responses: [
      {
        id: 1,
        text: 'Merci beaucoup pour ces 5 étoiles ! 🌟 Votre satisfaction est notre plus belle récompense. À très bientôt ! 😊',
      },
      {
        id: 2,
        text: 'Un immense merci pour cette belle note ! ✨ Nous sommes ravis de savoir que vous avez apprécié votre expérience. À bientôt !',
      },
      {
        id: 3,
        text: 'Merci infiniment pour votre note parfaite ! 🥰 Cela nous motive à continuer de vous offrir le meilleur. À très vite !',
      },
      {
        id: 4,
        text: 'Un grand merci pour ces 5 étoiles ! 🤩 Nous sommes heureux de vous avoir pleinement satisfait. À bientôt pour une nouvelle expérience tout aussi positive !',
      },
      {
        id: 5,
        text: 'Merci pour cette note parfaite ! ❤️ Votre retour compte beaucoup pour nous. Nous serons ravis de vous accueillir à nouveau bientôt.',
      },
      {
        id: 6,
        text: 'Merci beaucoup pour vos 5 étoiles ! 😊 Votre satisfaction est notre priorité, et votre avis nous fait très plaisir. À très vite !',
      },
      {
        id: 7,
        text: "Un grand merci pour cette superbe note ! 🌟 Nous sommes ravis d'avoir été à la hauteur de vos attentes. À très bientôt !",
      },
    ],
  },
  {
    author: 'Florent EYOUM',
    responses: [
      {
        id: 1,
        text: "Merci beaucoup pour votre avis, Florent ! 😊 Nous sommes ravis que nos brochettes de poulet pané vous aient plu. Si vous avez des idées pour améliorer encore votre expérience et mériter la 5e étoile, n'hésitez pas à nous le dire. À très bientôt !",
      },
      {
        id: 2,
        text: 'Un grand merci, Florent, pour votre retour si positif ! 🌟 Nous sommes ravis de savoir que vous avez apprécié nos brochettes de poulet pané. Votre recommandation nous fait chaud au cœur. À très vite pour une nouvelle dégustation !',
      },
      {
        id: 3,
        text: "Merci beaucoup, Florent, pour cet avis et vos 4 étoiles ! 😊 Nous sommes ravis que nos brochettes de poulet pané aient été à votre goût. Si vous avez une idée pour nous aider à décrocher la 5e étoile, nous serions ravis de l'entendre. À bientôt !",
      },
      {
        id: 4,
        text: "Merci pour votre retour, Florent ! ✨ Nous sommes heureux que vous ayez trouvé nos plats savoureux, notamment les brochettes de poulet pané. Si quelque chose peut être amélioré, dites-le-nous, nous sommes à l'écoute. À très bientôt !",
      },
      {
        id: 5,
        text: 'Un immense merci, Florent, pour vos 4 étoiles et votre recommandation ! ❤️ Nous sommes ravis de savoir que nos brochettes de poulet pané ont su vous séduire. Nous espérons vous revoir bientôt pour continuer à vous régaler !',
      },
      {
        id: 6,
        text: "Merci beaucoup, Florent, pour votre retour si encourageant ! 🤩 Nous sommes ravis que nos brochettes de poulet pané vous aient régalé. N'hésitez pas à nous faire part de vos suggestions pour rendre votre prochaine expérience encore meilleure. À très vite !",
      },
      {
        id: 7,
        text: 'Florent, un grand merci pour votre bel avis ! 😊 Nous sommes enchantés que nos brochettes de poulet pané vous aient plu. Si vous avez des idées pour mériter la cinquième étoile, nous sommes à votre écoute. À bientôt pour une nouvelle dégustation !',
      },
    ],
  },
  {
    author: 'Louane Mich',
    responses: [
      {
        id: 1,
        text: "Bonjour Louane,\nNous sommes désolés d'apprendre que votre expérience n'a pas été à la hauteur de vos attentes. Chez Bangkok Factory Choisy 🍍, nous veillons à préparer chaque commande avec soin et à respecter les demandes spécifiques de nos clients.\nNous allons nous pencher sur ce qui a pu se passer pour éviter ce genre de situation à l'avenir. Votre satisfaction est importante pour nous, et nous espérons avoir l'occasion de mieux répondre à vos attentes lors d'une prochaine commande.\nBien cordialement,\nL'équipe Bangkok Factory Choisy 🍍",
      },
      {
        id: 2,
        text: "Bonjour Louane,\nNous regrettons que votre commande n'ait pas été conforme à votre demande. Nous mettons un point d'honneur à respecter les préférences de nos clients, et nous sommes sincèrement navrés pour cette erreur.\nNous allons revoir nos processus pour éviter que cela ne se reproduise et espérons que vous nous donnerez une nouvelle chance de vous satisfaire pleinement à l'avenir.\nCordialement,\nL'équipe Bangkok Factory Choisy 🍍",
      },
      {
        id: 3,
        text: "Bonjour Louane,\nNous sommes désolés pour ce désagrément. Nous faisons tout notre possible pour répondre aux demandes spécifiques de nos clients, et nous regrettons sincèrement que cela n'ait pas été respecté pour votre riz.\nNous allons analyser ce qui a pu se passer et espérons pouvoir regagner votre confiance lors d'une prochaine commande.\nAvec nos excuses,\nL'équipe Bangkok Factory Choisy 🍍",
      },
      {
        id: 4,
        text: "Bonjour Louane,\nNous sommes navrés d'apprendre que votre riz n'a pas été préparé selon votre demande. Chez Bangkok Factory Choisy 🍍, nous tenons à respecter les besoins spécifiques de nos clients, surtout lorsqu'il s'agit d'intolérances ou de préférences alimentaires.\nNous allons corriger cela pour que cela ne se reproduise pas et espérons vous offrir une meilleure expérience à l'avenir.\nBien cordialement,\nL'équipe Bangkok Factory Choisy 🍍",
      },
      {
        id: 5,
        text: "Bonjour Louane,\nNous sommes désolés que votre expérience n'ait pas été satisfaisante. Nous comprenons que recevoir un plat non conforme à vos attentes est frustrant, surtout dans votre situation.\nNous allons faire un point avec notre équipe pour améliorer notre processus et éviter ce genre d'erreur à l'avenir. Nous espérons sincèrement regagner votre confiance lors d'une prochaine commande.\nCordialement,\nL'équipe Bangkok Factory Choisy 🍍",
      },
      {
        id: 6,
        text: "Bonjour Louane,\nNous sommes sincèrement désolés pour cette erreur. Votre satisfaction est notre priorité, et nous veillons normalement à respecter les demandes spécifiques de nos clients. Nous comprenons votre frustration, et nous allons renforcer nos vérifications pour éviter ce type de situation.\nNous espérons avoir l'occasion de vous offrir une meilleure expérience à l'avenir.\nAvec toutes nos excuses,\nL'équipe Bangkok Factory Choisy 🍍",
      },
      {
        id: 7,
        text: "Bonjour Louane,\nNous regrettons profondément que votre commande n'ait pas été conforme à votre demande. Nous nous efforçons de répondre aux besoins spécifiques de chaque client et sommes navrés que cela n'ait pas été respecté pour vous.\nNous allons examiner ce qui a pu se passer et travailler à améliorer nos services. Nous espérons que vous nous donnerez une nouvelle chance de vous satisfaire pleinement.\nCordialement,\nL'équipe Bangkok Factory Choisy 🍍",
      },
    ],
  },
  {
    author: 'Féerhat SHN',
    responses: [
      {
        id: 1,
        text: "Bonjour Féerhat,\nNous sommes désolés d'apprendre que votre expérience avec notre lok lak n'a pas répondu à vos attentes. Nous accordons une grande importance à la qualité de nos ingrédients et à la satisfaction de nos clients.\nNous allons nous pencher sur ce qui a pu poser problème et veiller à améliorer la qualité de nos plats. Nous espérons avoir l'occasion de vous offrir une meilleure expérience à l'avenir.\nBien cordialement,\nL'équipe Bangkok Factory Choisy 🍍",
      },
      {
        id: 2,
        text: "Bonjour Féerhat,\nMerci pour votre retour. Nous sommes navrés que vous ayez trouvé la viande de notre lok lak trop caoutchouteuse. Chez Bangkok Factory Choisy 🍍, nous veillons à offrir des plats savoureux et de qualité, et nous regrettons de ne pas avoir été à la hauteur cette fois-ci.\nNous allons examiner votre remarque avec soin et espérons pouvoir vous satisfaire pleinement lors d'une prochaine visite.\nCordialement,\nL'équipe Bangkok Factory Choisy 🍍",
      },
      {
        id: 3,
        text: "Bonjour Féerhat,\nNous sommes navrés de lire que vous n'avez pas été satisfait par notre lok lak. La qualité de nos plats est une priorité pour nous, et nous allons investiguer sur ce point pour éviter que cela ne se reproduise.\nNous espérons sincèrement regagner votre confiance lors d'une prochaine commande.\nAvec nos excuses,\nL'équipe Bangkok Factory Choisy 🍍",
      },
      {
        id: 4,
        text: "Bonjour Féerhat,\nMerci pour votre retour. Nous regrettons que votre expérience n'ait pas été à la hauteur de vos attentes, notamment concernant la texture de la viande. Votre remarque est précieuse et nous allons y porter une attention particulière.\nNous espérons avoir l'occasion de vous offrir une meilleure expérience à l'avenir.\nBien cordialement,\nL'équipe Bangkok Factory Choisy 🍍",
      },
      {
        id: 5,
        text: "Bonjour Féerhat,\nNous sommes sincèrement désolés que notre lok lak n'ait pas répondu à vos attentes. Nous nous engageons à offrir des plats de qualité, et il semble que nous ayons manqué à cet engagement cette fois-ci.\nNous allons travailler pour améliorer la préparation de ce plat et espérons pouvoir vous surprendre positivement lors d'une prochaine visite.\nCordialement,\nL'équipe Bangkok Factory Choisy 🍍",
      },
      {
        id: 6,
        text: "Bonjour Féerhat,\nNous sommes désolés d'apprendre que la texture de la viande de votre lok lak n'était pas satisfaisante. Nous prenons vos remarques très au sérieux et allons immédiatement revoir ce point avec notre équipe.\nNous espérons sincèrement que vous nous donnerez une autre chance de vous convaincre de la qualité de notre cuisine.\nAvec nos excuses,\nL'équipe Bangkok Factory Choisy 🍍",
      },
      {
        id: 7,
        text: "Bonjour Féerhat,\nNous regrettons que votre expérience n'ait pas été satisfaisante, notamment concernant la texture de la viande dans notre lok lak. Nous travaillons chaque jour pour offrir des plats de qualité, et nous allons corriger cela.\nNous espérons pouvoir vous offrir une meilleure expérience lors d'une prochaine commande.\nCordialement,\nL'équipe Bangkok Factory Choisy 🍍",
      },
    ],
  },
]

const HorizontalSheetStyled = styled(YStack, {
  position: 'fixed',
  top: 0,
  right: 0,
  height: '100%',
  backgroundColor: '$background',
  borderLeftWidth: 1,
  borderColor: '$borderColor',
  shadowColor: '$shadowColor',
  shadowOffset: { width: -2, height: 0 },
  shadowOpacity: 0.2,
  shadowRadius: 10,
  variants: {
    position: {
      right: {
        right: 0,
      },
      left: {
        left: 0,
      },
    },
  } as const,
})

const Overlay = styled(YStack, {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
})

const LogoContainer = styled(Stack, {
  borderRadius: '$4',
  backgroundColor: '#F1F5F9',
  padding: '$3',
})

const SectionTitle = styled(Text, {
  color: '#1E293B',
  fontSize: 20,
  fontWeight: 600,
})

const TemplateCard = styled(YStack, {
  gap: '$2',
  backgroundColor: 'white',
  padding: '$4',
  borderRadius: '$4',
  height: 230,
  justifyContent: 'space-between',
  borderColor: '#E2E8F0',
  borderWidth: 1,
})

const TemplateCategory = styled(Text, {
  paddingVertical: '$2',
  paddingHorizontal: '$3',
  borderRadius: 1000,
  borderWidth: 1,
  width: 'fit-content',
  fontSize: 14,
  variants: {
    positive: {
      true: {
        borderColor: '#17B26A',
        color: '#067647',
        backgroundColor: '#DCFAE6',
      },
    },
    neutral: {
      true: {
        borderColor: '#B54708',
        color: '#B54708',
        backgroundColor: '#FEF0C7',
      },
    },
    negative: {
      true: {
        borderColor: '#B42318',
        color: '#B42318',
        backgroundColor: '#FEE4E2',
      },
    },
  } as const,
})

const TemplateTitle = styled(Text, {
  fontSize: 18,
  fontWeight: 600,
})

const TemplateDescription = styled(Text, {
  fontSize: 14,
  color: '#475569',
})
const apiUrl = process.env.NEXT_PUBLIC_API_URL

export const HorizontalSheet = ({ open, selectedReview, handleOpenPressed, handleSendPress }) => {
  const [response, setResponse] = useState(selectedReview?.reviewReply?.comment || '')
  const [templates, setTemplates] = useState<any[]>([])

  const { user } = useAuth()
  const { selectedStore } = useStores()
  console.log(selectedReview)
  const getTemplates = () => {
    axios
      .get(`${apiUrl}/api/templates/${user.id}`, {
        withCredentials: true,
      })
      .then((response) => {
        const templates = response.data.responseTemplates
        setTemplates(templates)
      })
  }

  const handleUseTemplate = (templateId) => {
    const usedTemplate = templates.find((template) => template.id === templateId)

    setResponse(usedTemplate?.message || '')
  }
  const convertStarRatingToNumber = (starRating: string) => {
    switch (starRating) {
      case 'ONE':
        return 1
      case 'TWO':
        return 2
      case 'THREE':
        return 3
      case 'FOUR':
        return 4
      case 'FIVE':
        return 5
      default:
        return 0
    }
  }

  const [loading, setLoading] = useState(false)
  const handleGenerateResponse = async () => {
    if (!selectedReview || !selectedStore) return
    setLoading(true)
    const response = await axios.post(
      `${apiUrl}/api/openAi/reply`,
      {
        review: selectedReview,
        businessName: selectedStore.title,
        reviewerName: selectedReview.reviewer.displayName,
      },
      {
        withCredentials: true,
      }
    )
    setResponse(response.data.message)
    setLoading(false)
    console.log(response)
  }

  useEffect(() => {
    if (!user) return
    getTemplates()
  }, [user])

  useEffect(() => {
    setResponse(selectedReview?.reviewReply?.comment || '')
  }, [selectedReview])

  return (
    <YStack padding="$4">
      <AnimatePresence>
        {open && (
          <>
            <Overlay
              animation="quick"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
              opacity={1}
              onPress={() => handleOpenPressed(false)}
            />

            <HorizontalSheetStyled
              width={'70%'}
              animation="100ms"
              enterStyle={{ x: '100%' }}
              exitStyle={{ x: '100%' }}
              x={0}
            >
              <YStack padding="$4" gap={32}>
                <XStack alignItems="center" gap="$4">
                  <LogoContainer>
                    <User2 />
                  </LogoContainer>
                  <YStack>
                    <SectionTitle>Reviewer</SectionTitle>
                    <Text>{selectedReview.reviewer.displayName}</Text>
                  </YStack>
                </XStack>
                <XStack alignItems="center" gap="$4">
                  <LogoContainer>
                    <Star />
                  </LogoContainer>
                  <YStack>
                    <SectionTitle>Note</SectionTitle>
                    <XStack gap={8}>
                      <StarFull color={'orange'} size={'$1'} />
                      <Text color={'orange'}>
                        {convertStarRatingToNumber(selectedReview.starRating)}
                      </Text>
                    </XStack>
                  </YStack>
                </XStack>
                <XStack alignItems="center" gap="$4">
                  <LogoContainer>
                    <MessagesSquare />
                  </LogoContainer>
                  <YStack width={'96%'}>
                    <SectionTitle>Commentaire</SectionTitle>

                    <Text>{selectedReview.comment}</Text>
                  </YStack>
                </XStack>
                <XStack alignItems="center" gap="$4">
                  <LogoContainer>
                    <Calendar />
                  </LogoContainer>
                  <YStack>
                    <SectionTitle>Date</SectionTitle>
                    <Text>{new Date(selectedReview.createTime).toLocaleDateString('fr')}</Text>
                  </YStack>
                </XStack>
                <XStack alignItems="flex-start" gap="$4">
                  <LogoContainer>
                    <Reply />
                  </LogoContainer>
                  <YStack f={1} gap={8}>
                    <XStack justifyContent="space-between">
                      <SectionTitle>Réponse</SectionTitle>
                      <XStack gap={8}>
                        <Button
                          icon={loading && <Spinner />}
                          iconAfter={<Sparkles />}
                          onPress={() => handleGenerateResponse()}
                        >
                          Générer par l'IA
                        </Button>
                        <Dialog modal>
                          <Dialog.Trigger asChild>
                            <Button iconAfter={<LayoutTemplate />}>Utiliser un template</Button>
                          </Dialog.Trigger>
                          <Dialog.Portal>
                            <Dialog.Overlay
                              key="overlay"
                              animation="quick"
                              opacity={0.5}
                              enterStyle={{ opacity: 0 }}
                              exitStyle={{ opacity: 0 }}
                            />
                            <Dialog.Content
                              width={'60%'}
                              bordered
                              elevate
                              key="content"
                              animateOnly={['transform', 'opacity']}
                              animation={[
                                'quicker',
                                {
                                  opacity: {
                                    overshootClamping: true,
                                  },
                                },
                              ]}
                              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                            >
                              <Dialog.Title marginBottom={16}>Choisissez un template</Dialog.Title>
                              <XStack f={1} gap={16}>
                                <YStack f={1} gap={16} width={'calc(33% - 16px)'}>
                                  {templates.length > 0 &&
                                    templates
                                      .filter((template) => template.category === 'positive')
                                      .map((template) => (
                                        <TemplateCard key={template.title}>
                                          <TemplateCategory positive>Positif</TemplateCategory>
                                          <TemplateTitle>{template.title}</TemplateTitle>
                                          <TemplateDescription>
                                            {template.message}
                                          </TemplateDescription>
                                          <XStack gap={16} width={'100%'}>
                                            <Dialog.Close>
                                              <CustomButton
                                                f={1}
                                                onPress={() => handleUseTemplate(template.id)}
                                              >
                                                Utiliser
                                              </CustomButton>
                                            </Dialog.Close>
                                          </XStack>
                                        </TemplateCard>
                                      ))}
                                  {/* <TemplateCard>

            <TemplateCategory positive>Positive</TemplateCategory>
            <TemplateTitle>Merci pour vos mots doux ! </TemplateTitle>
            <TemplateDescription>
              We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority,
              and we can’t wait to serve you again soon.
            </TemplateDescription>
            <XStack gap={16}>
              <Button icon={<PenSquare />}>Modifier</Button>
              <Button icon={<Trash2 />}>Supprimer</Button>
            </XStack>
          </TemplateCard>
          <TemplateCard>
            <TemplateCategory positive>Positive</TemplateCategory>
            <TemplateTitle>Merci pour vos mots doux ! </TemplateTitle>
            <TemplateDescription>
              We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority,
              and we can’t wait to serve you again soon.
            </TemplateDescription>
            <XStack gap={16}>
              <Button icon={<PenSquare />}>Modifier</Button>
              <Button icon={<Trash2 />}>Supprimer</Button>
            </XStack>
          </TemplateCard> */}
                                </YStack>
                                <YStack f={1} gap={16} width={'calc(33% - 16px)'}>
                                  {templates.length > 0 &&
                                    templates
                                      .filter((template) => template.category === 'neutral')
                                      .map((template) => (
                                        <TemplateCard key={template.title}>
                                          <TemplateCategory neutral>Neutre</TemplateCategory>
                                          <TemplateTitle>{template.title}</TemplateTitle>
                                          <TemplateDescription>
                                            {template.message}
                                          </TemplateDescription>
                                          <XStack gap={16} width={'100%'}>
                                            <Dialog.Close>
                                              <CustomButton
                                                f={1}
                                                onPress={() => handleUseTemplate(template.id)}
                                              >
                                                Utiliser
                                              </CustomButton>
                                            </Dialog.Close>
                                          </XStack>
                                        </TemplateCard>
                                      ))}

                                  {/* <TemplateCard>
            <TemplateCategory positive>Positive</TemplateCategory>
            <TemplateTitle>Merci pour vos mots doux ! </TemplateTitle>
            <TemplateDescription>
              We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority,
              and we can’t wait to serve you again soon.
            </TemplateDescription>
            <XStack gap={16}>
              <Button icon={<PenSquare />}>Modifier</Button>
              <Button icon={<Trash2 />}>Supprimer</Button>
            </XStack>
          </TemplateCard> */}
                                </YStack>
                                <YStack f={1} gap={16} width={'calc(33% - 16px)'}>
                                  {templates.length > 0 &&
                                    templates
                                      .filter((template) => template.category === 'negative')
                                      .map((template) => (
                                        <TemplateCard key={template.title}>
                                          <TemplateCategory negative>Négatif</TemplateCategory>
                                          <TemplateTitle>{template.title}</TemplateTitle>
                                          <TemplateDescription>
                                            {template.message}
                                          </TemplateDescription>
                                          <XStack gap={16} width={'100%'}>
                                            <Dialog.Close>
                                              <CustomButton
                                                f={1}
                                                onPress={() => handleUseTemplate(template.id)}
                                              >
                                                Utiliser
                                              </CustomButton>
                                            </Dialog.Close>
                                          </XStack>
                                        </TemplateCard>
                                      ))}
                                  {/* <TemplateCard>
            <TemplateCategory positive>Positive</TemplateCategory>
            <TemplateTitle>Merci pour vos mots doux ! </TemplateTitle>
            <TemplateDescription>
              We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority,
              and we can’t wait to serve you again soon.
            </TemplateDescription>
            <XStack gap={16}>
              <Button icon={<PenSquare />}>Modifier</Button>
              <Button icon={<Trash2 />}>Supprimer</Button>
            </XStack>
          </TemplateCard>
          <TemplateCard>
            <TemplateCategory positive>Positive</TemplateCategory>
            <TemplateTitle>Merci pour vos mots doux ! </TemplateTitle>
            <TemplateDescription>
              We’re thrilled to know you enjoyed dining with us! Your satisfaction is our priority,
              and we can’t wait to serve you again soon.
            </TemplateDescription>
            <XStack gap={16}>
              <Button icon={<PenSquare />}>Modifier</Button>
              <Button icon={<Trash2 />}>Supprimer</Button>
            </XStack>
          </TemplateCard> */}
                                </YStack>
                              </XStack>
                              <Unspaced>
                                <Dialog.Close asChild>
                                  <Button
                                    position="absolute"
                                    top="$3"
                                    right="$3"
                                    size="$2"
                                    circular
                                    icon={X}
                                  />
                                </Dialog.Close>
                              </Unspaced>
                            </Dialog.Content>
                          </Dialog.Portal>
                        </Dialog>
                      </XStack>
                    </XStack>
                    <TextArea
                      onChangeText={(text) => setResponse(text)}
                      value={response}
                    ></TextArea>
                  </YStack>
                </XStack>
              </YStack>
              <XStack alignSelf="flex-end" padding={'$4'}>
                <CustomButton
                  onPress={() => {
                    handleSendPress(selectedReview.reviewId, response)
                    handleOpenPressed(false)
                  }}
                  alignSelf="flex-end"
                  marginRight="$4"
                >
                  Envoyer
                </CustomButton>
                <Button
                  onPress={() => handleOpenPressed(false)}
                  alignSelf="flex-end"
                  variant="outlined"
                >
                  Annuler
                </Button>
              </XStack>
            </HorizontalSheetStyled>
          </>
        )}
      </AnimatePresence>
    </YStack>
  )
}
