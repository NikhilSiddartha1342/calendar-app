import './HeroImage.css'

// Import all 12 images
import january from '../assets/month/January.png'
import february from '../assets/month/February.png'
import march from '../assets/month/March.png'
import april from '../assets/month/April.png'
import may from '../assets/month/May.png'
import june from '../assets/month/June.png'
import july from '../assets/month/July.png'
import august from '../assets/month/August.png'
import september from '../assets/month/September.png'
import october from '../assets/month/October.png'
import november from '../assets/month/November.png'
import december from '../assets/month/December.png'

const monthImages = [
  january, february, march, april,
  may, june, july, august,
  september, october, november, december
]

function HeroImage({ currentDate }) {
  const monthName = currentDate.toLocaleString('default', { month: 'long' })
  const year = currentDate.getFullYear()
  const image = monthImages[currentDate.getMonth()]

  return (
    <div className="hero-container">
      <img className="hero-image" src={image} alt={`${monthName} theme`} />
      <div className="hero-overlay">
        <h2 className="hero-title">{monthName} {year}</h2>
      </div>
    </div>
  )
}

export default HeroImage