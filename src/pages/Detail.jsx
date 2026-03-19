import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import restaurants from '../data/restaurants';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    paddingBottom: '40px'
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 500,
    color: '#333',
    cursor: 'pointer',
    margin: '24px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease'
  },
  imageSection: {
    position: 'relative',
    width: '100%',
    height: '320px',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  fallbackImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '80px'
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px',
    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.7))'
  },
  cityTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '6px 14px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#333',
    marginRight: '12px'
  },
  cuisineTag: {
    display: 'inline-flex',
    padding: '6px 14px',
    backgroundColor: '#667eea',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#fff'
  },
  contentSection: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 24px'
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    marginTop: '-40px',
    position: 'relative',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: '#333',
    margin: '0 0 16px',
    lineHeight: 1.3
  },
  metaRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap'
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    backgroundColor: '#fff7e6',
    borderRadius: '10px'
  },
  rating: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#fa8c16'
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '15px',
    color: '#666'
  },
  price: {
    fontWeight: 600,
    color: '#52c41a'
  },
  tasteContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '6px 14px',
    backgroundColor: '#f0f5ff',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#1890ff'
  },
  description: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '1px solid #f0f0f0'
  },
  descriptionTitle: {
    fontSize: '16px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '8px'
  },
  descriptionText: {
    fontSize: '15px',
    color: '#666',
    lineHeight: 1.7
  },
  reasonSection: {
    marginTop: '24px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
  },
  reasonTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '18px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '16px'
  },
  reasonText: {
    fontSize: '15px',
    color: '#555',
    lineHeight: 1.7,
    padding: '16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '12px',
    borderLeft: '4px solid #667eea'
  },
  tagsSection: {
    marginTop: '24px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
  },
  tagsTitle: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '16px'
  },
  tagsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  moodTag: {
    padding: '8px 16px',
    backgroundColor: '#fff7e6',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#fa8c16'
  },
  weatherTag: {
    padding: '8px 16px',
    backgroundColor: '#e6f7ff',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#1890ff'
  },
  actionButtons: {
    marginTop: '24px',
    display: 'flex',
    gap: '16px'
  },
  primaryButton: {
    flex: 1,
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#fff',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  },
  secondaryButton: {
    flex: 1,
    padding: '16px 32px',
    fontSize: '16px',
    fontWeight: 600,
    color: '#667eea',
    backgroundColor: '#fff',
    border: '2px solid #667eea',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  notFound: {
    textAlign: 'center',
    padding: '100px 24px'
  },
  notFoundIcon: {
    fontSize: '64px',
    marginBottom: '16px'
  },
  notFoundTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '8px'
  },
  notFoundText: {
    fontSize: '14px',
    color: '#666'
  }
};

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurants.find(r => r.id === parseInt(id));
  const [imageError, setImageError] = useState(false);

  const getPriceDisplay = (price) => {
    if (price <= 50) return '¥ (便宜)';
    if (price <= 100) return '¥¥ (适中)';
    if (price <= 200) return '¥¥¥ (较贵)';
    return '¥¥¥¥ (高端)';
  };

  const getCuisineEmoji = (cuisine) => {
    const emojiMap = {
      '火锅': '🍲',
      '甜品': '🍰',
      '烧烤': '🍖',
      '日料': '🍣',
      '咖啡厅': '☕',
      '川菜': '🌶️',
      '粤菜': '🦐',
      '西餐': '🍽️',
      '轻食': '🥗',
      '海鲜': '🦞',
      '湘菜': '🌶️',
      '浙菜': '🥢',
      '韩餐': '🥘',
      '东南亚菜': '🍜',
      '素食': '🥬',
      '茶馆': '🍵',
      '冷食': '🧊',
      '西北菜': '🥙',
      '京菜': '🥟',
      '融合菜': '🌍'
    };
    return emojiMap[cuisine] || '🍽️';
  };

  if (!restaurant) {
    return (
      <div style={styles.container}>
        <button 
          style={styles.backButton}
          onClick={() => navigate('/')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateX(-4px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateX(0)';
          }}
        >
          ← 返回首页
        </button>
        <div style={styles.notFound}>
          <div style={styles.notFoundIcon}>🔍</div>
          <div style={styles.notFoundTitle}>餐厅未找到</div>
          <div style={styles.notFoundText}>抱歉，您访问的餐厅不存在</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <button 
        style={styles.backButton}
        onClick={() => navigate('/')}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(-4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        ← 返回首页
      </button>

      <div style={styles.imageSection}>
        {!imageError ? (
          <img
            src={restaurant.image}
            alt={restaurant.name}
            style={styles.image}
            onError={() => setImageError(true)}
          />
        ) : (
          <div style={styles.fallbackImage}>
            {getCuisineEmoji(restaurant.cuisine)}
          </div>
        )}
        <div style={styles.imageOverlay}>
          <span style={styles.cityTag}>📍 {restaurant.city}</span>
          <span style={styles.cuisineTag}>{restaurant.cuisine}</span>
        </div>
      </div>

      <div style={styles.contentSection}>
        <div style={styles.header}>
          <h1 style={styles.title}>{restaurant.name}</h1>
          
          <div style={styles.metaRow}>
            <div style={styles.ratingContainer}>
              <span>⭐</span>
              <span style={styles.rating}>{restaurant.rating}</span>
            </div>
            <div style={styles.priceContainer}>
              <span>人均:</span>
              <span style={styles.price}>{getPriceDisplay(restaurant.price)}</span>
            </div>
            <div style={styles.tasteContainer}>
              <span>口味: {restaurant.taste}味</span>
            </div>
          </div>

          <div style={styles.description}>
            <div style={styles.descriptionTitle}>餐厅简介</div>
            <p style={styles.descriptionText}>{restaurant.description}</p>
          </div>
        </div>

        <div style={styles.reasonSection}>
          <div style={styles.reasonTitle}>
            <span>💡</span> 推荐理由
          </div>
          <div style={styles.reasonText}>
            {restaurant.city}热门{restaurant.cuisine}餐厅，
            {restaurant.taste}味代表，评分{restaurant.rating}分。
            {restaurant.tags?.moods?.length > 0 && `适合${restaurant.tags.moods.join('、')}时用餐。`}
            {restaurant.tags?.weather?.length > 0 && `在${restaurant.tags.weather.join('、')}天气尤其受欢迎。`}
          </div>
        </div>

        {restaurant.tags && (restaurant.tags.moods?.length > 0 || restaurant.tags.weather?.length > 0) && (
          <div style={styles.tagsSection}>
            <div style={styles.tagsTitle}>适合场景</div>
            <div style={styles.tagsContainer}>
              {restaurant.tags.moods?.map((mood, index) => (
                <span key={`mood-${index}`} style={styles.moodTag}>
                  {mood}
                </span>
              ))}
              {restaurant.tags.weather?.map((weather, index) => (
                <span key={`weather-${index}`} style={styles.weatherTag}>
                  {weather}
                </span>
              ))}
            </div>
          </div>
        )}

        <div style={styles.actionButtons}>
          <button style={styles.primaryButton}>
            📞 立即预订
          </button>
          <button 
            style={styles.secondaryButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#f0f5ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff';
            }}
          >
            🗺️ 查看地图
          </button>
        </div>
      </div>
    </div>
  );
}

export default Detail;
