import { weathers, weatherToTags } from '../data/weatherMapping';

const weatherIcons = {
  晴天: '☀️',
  雨天: '🌧️',
  雪天: '❄️',
  炎热: '🔥',
  寒冷: '🥶'
};

const weatherDescriptions = {
  晴天: '阳光明媚',
  雨天: '细雨绵绵',
  雪天: '银装素裹',
  炎热: '高温酷暑',
  寒冷: '天寒地冻'
};

const weatherColors = {
  晴天: { bg: '#FFF7E6', border: '#FFD591', gradient: 'linear-gradient(135deg, #FFF7E6 0%, #FFE7BA 100%)' },
  雨天: { bg: '#E6F7FF', border: '#91D5FF', gradient: 'linear-gradient(135deg, #E6F7FF 0%, #BAE7FF 100%)' },
  雪天: { bg: '#F0F5FF', border: '#ADC6FF', gradient: 'linear-gradient(135deg, #F0F5FF 0%, #D6E4FF 100%)' },
  炎热: { bg: '#FFF1F0', border: '#FFCCC7', gradient: 'linear-gradient(135deg, #FFF1F0 0%, #FFCCC7 100%)' },
  寒冷: { bg: '#E6F7FF', border: '#87CEEB', gradient: 'linear-gradient(135deg, #E6F7FF 0%, #B4E0FF 100%)' }
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  title: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '4px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '14px 8px',
    borderRadius: '12px',
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff',
    position: 'relative',
    overflow: 'hidden'
  },
  cardSelected: {
    borderColor: 'var(--primary-color, #1890ff)',
    boxShadow: '0 4px 16px rgba(24, 144, 255, 0.25)'
  },
  icon: {
    fontSize: '28px',
    marginBottom: '6px',
    transition: 'transform 0.3s ease',
    position: 'relative',
    zIndex: 1
  },
  iconSelected: {
    transform: 'scale(1.2)'
  },
  name: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '2px',
    position: 'relative',
    zIndex: 1
  },
  description: {
    fontSize: '11px',
    color: '#888',
    position: 'relative',
    zIndex: 1
  },
  checkmark: {
    position: 'absolute',
    top: '6px',
    right: '6px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-color, #1890ff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '11px',
    zIndex: 2
  },
  weatherBg: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    opacity: 0.3,
    fontSize: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'scale(1.5)',
    pointerEvents: 'none'
  }
};

function WeatherSelector({ selectedWeather, onWeatherChange }) {
  const handleWeatherClick = (weather) => {
    onWeatherChange?.(weather === selectedWeather ? null : weather);
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>今天天气如何？</div>
      <div style={styles.grid}>
        {weathers.map((weather) => {
          const isSelected = selectedWeather === weather;
          const colors = weatherColors[weather];

          return (
            <div
              key={weather}
              onClick={() => handleWeatherClick(weather)}
              style={{
                ...styles.card,
                backgroundColor: isSelected ? colors.bg : '#fff',
                borderColor: isSelected ? colors.border : '#f0f0f0',
                ...(isSelected ? styles.cardSelected : {})
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = colors.bg;
                  e.currentTarget.style.borderColor = colors.border;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.borderColor = '#f0f0f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {isSelected && <div style={styles.checkmark}>✓</div>}
              <div style={styles.weatherBg}>{weatherIcons[weather]}</div>
              <div
                style={{
                  ...styles.icon,
                  ...(isSelected ? styles.iconSelected : {})
                }}
              >
                {weatherIcons[weather]}
              </div>
              <div style={styles.name}>{weather}</div>
              <div style={styles.description}>{weatherDescriptions[weather]}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default WeatherSelector;
