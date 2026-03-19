import { moods, moodToTags } from '../data/moodMapping';

const moodIcons = {
  开心: '😊',
  难过: '😢',
  压力: '😰',
  放松: '😌',
  无聊: '😐',
  庆祝: '🎉'
};

const moodColors = {
  开心: { bg: '#FFF7E6', border: '#FFD591', icon: '#FA8C16' },
  难过: { bg: '#E6F7FF', border: '#91D5FF', icon: '#1890FF' },
  压力: { bg: '#F9F0FF', border: '#D3ADF7', icon: '#722ED1' },
  放松: { bg: '#F6FFED', border: '#B7EB8F', icon: '#52C41A' },
  无聊: { bg: '#FFF1F0', border: '#FFCCC7', icon: '#FF4D4F' },
  庆祝: { bg: '#FFF0F6', border: '#FFADD2', icon: '#EB2F96' }
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
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '16px 12px',
    borderRadius: '12px',
    border: '2px solid transparent',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff'
  },
  cardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)'
  },
  cardSelected: {
    borderColor: 'var(--primary-color, #1890ff)',
    boxShadow: '0 4px 16px rgba(24, 144, 255, 0.25)'
  },
  icon: {
    fontSize: '32px',
    marginBottom: '8px',
    transition: 'transform 0.3s ease'
  },
  iconSelected: {
    transform: 'scale(1.15)'
  },
  name: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '4px'
  },
  tags: {
    fontSize: '11px',
    color: '#888',
    textAlign: 'center'
  },
  checkmark: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-color, #1890ff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '12px'
  }
};

function MoodSelector({ selectedMood, onMoodChange }) {
  const handleMoodClick = (mood) => {
    onMoodChange?.(mood === selectedMood ? null : mood);
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>今天心情如何？</div>
      <div style={styles.grid}>
        {moods.map((mood) => {
          const isSelected = selectedMood === mood;
          const colors = moodColors[mood];
          const tags = moodToTags[mood]?.join(' / ') || '';

          return (
            <div
              key={mood}
              onClick={() => handleMoodClick(mood)}
              style={{
                ...styles.card,
                backgroundColor: isSelected ? colors.bg : '#fff',
                borderColor: isSelected ? colors.border : '#f0f0f0',
                ...(isSelected ? styles.cardSelected : {}),
                position: 'relative'
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
              <div
                style={{
                  ...styles.icon,
                  ...(isSelected ? styles.iconSelected : {})
                }}
              >
                {moodIcons[mood]}
              </div>
              <div style={styles.name}>{mood}</div>
              <div style={styles.tags}>{tags}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MoodSelector;
