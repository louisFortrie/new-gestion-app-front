import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler
} from 'chart.js'

// Enregistrer les modules nécessaires de Chart.js
ChartJS.register(LineElement, PointElement, LinearScale,CategoryScale,Filler, Title, Tooltip, Legend)

interface LineChartProps {
  dataprops: any
}
export const LineChart = ({ dataprops }: LineChartProps) => {
    
  
  // Options du graphique
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
       display: false, // Position de la légende
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
        grid : {
          display : false
        }
      },
      y: {
        // beginAtZero: true,
        // max : 5,
        title: {
          display: false,
        },
      },
     
    },
  }

  return <Line data={dataprops} options={options} />
}
