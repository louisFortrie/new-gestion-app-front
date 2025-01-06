import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

// Enregistrement des modules nécessaires
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend)

export const BarChart = ({ dataProps }) => {
  // Données du graphique
  const data = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Ventes 2024',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#E3DEFF', // Couleur des barres
        borderWidth: 1, // Épaisseur de la bordure
        borderRadius: 4,
      },
    ],
  }

  // Options du graphique
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: false,
        },
        beginAtZero: true,
      },
    },
  }

  return <Bar data={dataProps} options={options} />
}
