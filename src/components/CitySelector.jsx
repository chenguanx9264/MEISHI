import { useState, useMemo } from 'react';
import { cities } from '../data/cities';

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
  searchWrapper: {
    position: 'relative'
  },
  searchInput: {
    width: '100%',
    padding: '12px 16px 12px 40px',
    borderRadius: '12px',
    border: '2px solid #e8e8e8',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
    backgroundColor: '#fff'
  },
  searchInputFocus: {
    borderColor: 'var(--primary-color, #1890ff)',
    boxShadow: '0 0 0 3px rgba(24, 144, 255, 0.1)'
  },
  searchIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '16px',
    color: '#999',
    pointerEvents: 'none'
  },
  clearButton: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: '#ccc',
    color: '#fff',
    fontSize: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    maxHeight: '320px',
    overflowY: 'auto',
    padding: '4px'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: '14px 12px',
    borderRadius: '12px',
    border: '2px solid #f0f0f0',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backgroundColor: '#fff',
    position: 'relative'
  },
  cardSelected: {
    borderColor: 'var(--primary-color, #1890ff)',
    backgroundColor: '#e6f7ff',
    boxShadow: '0 4px 12px rgba(24, 144, 255, 0.2)'
  },
  cardHover: {
    borderColor: 'var(--primary-color, #1890ff)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
  },
  cityName: {
    fontSize: '15px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '4px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  },
  cityNameEn: {
    fontSize: '11px',
    color: '#999',
    fontWeight: 400
  },
  specialties: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '4px',
    marginTop: '8px'
  },
  specialtyTag: {
    fontSize: '10px',
    padding: '2px 8px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    color: '#666'
  },
  checkmark: {
    position: 'absolute',
    top: '8px',
    right: '8px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: 'var(--primary-color, #1890ff)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '11px'
  },
  noResult: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '40px 20px',
    color: '#999',
    fontSize: '14px'
  },
  resultCount: {
    fontSize: '12px',
    color: '#999',
    marginTop: '4px'
  }
};

function CitySelector({ selectedCity, onCityChange }) {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const filteredCities = useMemo(() => {
    if (!searchKeyword.trim()) return cities;
    const keyword = searchKeyword.toLowerCase();
    return cities.filter(city =>
      city.name.toLowerCase().includes(keyword) ||
      city.nameEn.toLowerCase().includes(keyword) ||
      city.specialties.some(s => s.toLowerCase().includes(keyword))
    );
  }, [searchKeyword]);

  const handleCityClick = (city) => {
    onCityChange?.(selectedCity?.id === city.id ? null : city);
  };

  const handleClearSearch = () => {
    setSearchKeyword('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>选择城市</div>
      <div style={styles.searchWrapper}>
        <span style={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="搜索城市或特色美食..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            ...styles.searchInput,
            ...(isFocused ? styles.searchInputFocus : {})
          }}
        />
        {searchKeyword && (
          <button
            style={styles.clearButton}
            onClick={handleClearSearch}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#ff7875';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#ccc';
            }}
          >
            ✕
          </button>
        )}
      </div>
      {searchKeyword && (
        <div style={styles.resultCount}>找到 {filteredCities.length} 个结果</div>
      )}
      <div style={styles.grid}>
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => {
            const isSelected = selectedCity?.id === city.id;

            return (
              <div
                key={city.id}
                onClick={() => handleCityClick(city)}
                style={{
                  ...styles.card,
                  ...(isSelected ? styles.cardSelected : {})
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    Object.assign(e.currentTarget.style, styles.cardHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = '#f0f0f0';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {isSelected && <div style={styles.checkmark}>✓</div>}
                <div style={styles.cityName}>
                  {city.name}
                  <span style={styles.cityNameEn}>{city.nameEn}</span>
                </div>
                <div style={styles.specialties}>
                  {city.specialties.slice(0, 3).map((specialty, index) => (
                    <span key={index} style={styles.specialtyTag}>
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div style={styles.noResult}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔍</div>
            <div>未找到匹配的城市</div>
            <div style={{ fontSize: '12px', marginTop: '4px' }}>试试其他关键词</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CitySelector;
