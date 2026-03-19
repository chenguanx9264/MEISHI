import { tasteOptions } from '../data/tasteOptions';

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
  hint: {
    fontSize: '12px',
    color: '#999',
    marginTop: '-8px'
  },
  tagContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  tag: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '10px 16px',
    borderRadius: '24px',
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff',
    fontSize: '14px',
    fontWeight: 500
  },
  tagSelected: {
    color: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
  },
  tagHover: {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  icon: {
    fontSize: '18px'
  },
  name: {
    fontWeight: 600
  },
  description: {
    fontSize: '11px',
    opacity: 0.85,
    marginLeft: '2px'
  },
  selectedCount: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginTop: '12px',
    padding: '8px 12px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#666'
  },
  clearButton: {
    marginLeft: 'auto',
    padding: '4px 12px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }
};

function TasteSelector({ selectedTastes = [], onTasteChange }) {
  const handleTasteClick = (taste) => {
    const newSelected = selectedTastes.includes(taste.value)
      ? selectedTastes.filter(t => t !== taste.value)
      : [...selectedTastes, taste.value];
    onTasteChange?.(newSelected);
  };

  const handleClear = () => {
    onTasteChange?.([]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>偏好口味</div>
      <div style={styles.hint}>可多选，选择你喜欢的口味</div>
      <div style={styles.tagContainer}>
        {tasteOptions.map((taste) => {
          const isSelected = selectedTastes.includes(taste.value);

          return (
            <div
              key={taste.id}
              onClick={() => handleTasteClick(taste)}
              style={{
                ...styles.tag,
                borderColor: isSelected ? taste.color : `${taste.color}40`,
                backgroundColor: isSelected ? taste.color : '#fff',
                color: isSelected ? '#fff' : taste.color,
                ...(isSelected ? styles.tagSelected : {})
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = taste.color + '15';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${taste.color}30`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.backgroundColor = '#fff';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              <span style={styles.icon}>{taste.icon}</span>
              <span style={styles.name}>{taste.name}</span>
              <span style={styles.description}>{taste.description}</span>
            </div>
          );
        })}
      </div>
      {selectedTastes.length > 0 && (
        <div style={styles.selectedCount}>
          <span>已选择 {selectedTastes.length} 种口味</span>
          <button
            style={styles.clearButton}
            onClick={handleClear}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#ff7875';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ff4d4f';
            }}
          >
            清除
          </button>
        </div>
      )}
    </div>
  );
}

export default TasteSelector;
