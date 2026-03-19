import { useState } from 'react';

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    position: 'relative'
  },
  containerHover: {
    transform: 'translateY(-6px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)'
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: '180px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease'
  },
  imageHover: {
    transform: 'scale(1.08)'
  },
  cityTag: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    padding: '4px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: '16px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 500,
    backdropFilter: 'blur(4px)'
  },
  cuisineTag: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    padding: '4px 12px',
    backgroundColor: 'var(--primary-color, #1890ff)',
    borderRadius: '16px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 500
  },
  content: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '12px'
  },
  name: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#333',
    margin: 0,
    lineHeight: 1.4,
    flex: 1
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 10px',
    backgroundColor: '#fff7e6',
    borderRadius: '8px',
    flexShrink: 0
  },
  rating: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#fa8c16'
  },
  ratingStar: {
    fontSize: '12px'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    color: '#666'
  },
  price: {
    fontWeight: 600,
    color: '#52c41a'
  },
  description: {
    fontSize: '13px',
    color: '#666',
    lineHeight: 1.6,
    margin: '4px 0',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  reasonSection: {
    marginTop: '8px',
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    borderLeft: '3px solid var(--primary-color, #1890ff)'
  },
  reasonTitle: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#1890ff',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  reasonText: {
    fontSize: '13px',
    color: '#555',
    lineHeight: 1.5,
    margin: 0
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginTop: '4px'
  },
  tag: {
    fontSize: '11px',
    padding: '3px 10px',
    backgroundColor: '#f0f0f0',
    borderRadius: '12px',
    color: '#666'
  },
  detailButton: {
    marginTop: '12px',
    padding: '10px 16px',
    backgroundColor: 'var(--primary-color, #1890ff)',
    border: 'none',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px'
  },
  detailButtonHover: {
    backgroundColor: '#40a9ff',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(24, 144, 255, 0.4)'
  },
  favoriteButton: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 10
  },
  favoriteButtonHover: {
    transform: 'scale(1.1)',
    backgroundColor: '#fff'
  },
  fallbackImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px'
  }
};

function RecommendationCard({ 
  restaurant, 
  reason, 
  onDetailClick, 
  onFavorite,
  isFavorite = false 
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleDetailClick = (e) => {
    e.stopPropagation();
    onDetailClick?.(restaurant);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavorite?.(restaurant);
  };

  const getPriceDisplay = (price) => {
    if (price <= 50) return '¥';
    if (price <= 100) return '¥¥';
    if (price <= 200) return '¥¥¥';
    return '¥¥¥¥';
  };

  return (
    <div
      style={{
        ...styles.container,
        ...(isHovered ? styles.containerHover : {})
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleDetailClick}
    >
      <button
        style={{
          ...styles.favoriteButton,
          backgroundColor: isFavorite ? '#ff4d4f' : 'rgba(255, 255, 255, 0.9)',
          color: isFavorite ? '#fff' : '#999'
        }}
        onClick={handleFavoriteClick}
        onMouseEnter={(e) => {
          if (!isFavorite) {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.backgroundColor = '#fff';
          }
        }}
        onMouseLeave={(e) => {
          if (!isFavorite) {
            e.target.style.transform = 'scale(1)';
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
          }
        }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <div style={styles.imageContainer}>
        {!imageError ? (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            style={{
              ...styles.image,
              ...(isHovered ? styles.imageHover : {})
            }}
            onError={() => setImageError(true)}
          />
        ) : (
          <div style={styles.fallbackImage}>
            {restaurant.cuisine === '火锅' ? '🍲' : 
             restaurant.cuisine === '甜品' ? '🍰' : 
             restaurant.cuisine === '烧烤' ? '🍖' : 
             restaurant.cuisine === '日料' ? '🍣' : 
             restaurant.cuisine === '咖啡厅' ? '☕' : '🍽️'}
          </div>
        )}
        <div style={styles.cityTag}>📍 {restaurant.city}</div>
        <div style={styles.cuisineTag}>{restaurant.cuisine}</div>
      </div>

      <div style={styles.content}>
        <div style={styles.header}>
          <h3 style={styles.name}>{restaurant.name}</h3>
          <div style={styles.ratingContainer}>
            <span style={styles.ratingStar}>⭐</span>
            <span style={styles.rating}>{restaurant.rating}</span>
          </div>
        </div>

        <div style={styles.priceContainer}>
          <span>人均:</span>
          <span style={styles.price}>{getPriceDisplay(restaurant.price)}</span>
          <span style={{ color: '#999' }}> · ¥{restaurant.price}/人</span>
        </div>

        <p style={styles.description}>{restaurant.description}</p>

        {reason && (
          <div style={styles.reasonSection}>
            <div style={styles.reasonTitle}>
              <span>💡</span> 推荐理由
            </div>
            <p style={styles.reasonText}>{reason}</p>
          </div>
        )}

        <div style={styles.tagsContainer}>
          {restaurant.tags?.moods?.slice(0, 3).map((mood, index) => (
            <span key={`mood-${index}`} style={styles.tag}>{mood}</span>
          ))}
          {restaurant.tags?.weather?.slice(0, 2).map((weather, index) => (
            <span key={`weather-${index}`} style={{...styles.tag, backgroundColor: '#e6f7ff', color: '#1890ff'}}>{weather}</span>
          ))}
        </div>

        <button
          style={{
            ...styles.detailButton,
            ...(isHovered ? styles.detailButtonHover : {})
          }}
          onClick={handleDetailClick}
        >
          查看详情 →
        </button>
      </div>
    </div>
  );
}

export default RecommendationCard;
