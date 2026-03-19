import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MoodSelector from '../components/MoodSelector';
import WeatherSelector from '../components/WeatherSelector';
import TasteSelector from '../components/TasteSelector';
import CitySelector from '../components/CitySelector';
import RecommendationCard from '../components/RecommendationCard';
import { getCombinedRecommendations } from '../utils/recommendation';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '0 24px 40px'
  },
  header: {
    textAlign: 'center',
    padding: '48px 24px 40px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    margin: '0 -24px 32px',
    borderRadius: '0 0 24px 24px'
  },
  title: {
    fontSize: '36px',
    fontWeight: 700,
    color: '#fff',
    margin: 0,
    letterSpacing: '-0.5px'
  },
  subtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: '12px'
  },
  selectorPanel: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
    marginBottom: '32px'
  },
  selectorSection: {
    marginBottom: '28px'
  },
  selectorSectionLast: {
    marginBottom: 0
  },
  getRecommendButton: {
    width: '100%',
    padding: '16px 32px',
    fontSize: '18px',
    fontWeight: 600,
    color: '#fff',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    marginTop: '24px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
  },
  resultsSection: {
    marginTop: '32px'
  },
  resultsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  resultsTitle: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#333',
    margin: 0
  },
  resultsCount: {
    fontSize: '14px',
    color: '#666'
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '24px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#fff',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
  },
  emptyIcon: {
    fontSize: '64px',
    marginBottom: '16px'
  },
  emptyTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#333',
    marginBottom: '8px'
  },
  emptyText: {
    fontSize: '14px',
    color: '#666'
  }
};

function Home() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [selectedTastes, setSelectedTastes] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleGetRecommendations = () => {
    const taste = selectedTastes.length > 0 ? selectedTastes[0] : null;
    const city = selectedCity ? selectedCity.name : null;
    
    const results = getCombinedRecommendations({
      mood: selectedMood,
      weather: selectedWeather,
      taste: taste,
      city: city
    });
    
    setRecommendations(results);
    setHasSearched(true);
  };

  const handleDetailClick = (restaurant) => {
    navigate(`/detail/${restaurant.id}`);
  };

  const handleFavorite = (restaurant) => {
    console.log('Favorite:', restaurant);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🍽️ 今日美食推荐</h1>
        <p style={styles.subtitle}>根据你的心情、天气和口味，定制专属美食推荐</p>
        <button 
          style={{
            marginTop: '20px',
            padding: '10px 24px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: '2px solid rgba(255,255,255,0.5)',
            borderRadius: '25px',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onClick={() => navigate('/wheel')}
        >
          🎰 转到模式
        </button>
      </header>

      <div style={styles.selectorPanel}>
        <div style={styles.selectorSection}>
          <MoodSelector 
            selectedMood={selectedMood} 
            onMoodChange={setSelectedMood} 
          />
        </div>
        
        <div style={styles.selectorSection}>
          <WeatherSelector 
            selectedWeather={selectedWeather} 
            onWeatherChange={setSelectedWeather} 
          />
        </div>
        
        <div style={styles.selectorSection}>
          <TasteSelector 
            selectedTastes={selectedTastes} 
            onTasteChange={setSelectedTastes} 
          />
        </div>
        
        <div style={styles.selectorSectionLast}>
          <CitySelector 
            selectedCity={selectedCity} 
            onCityChange={setSelectedCity} 
          />
        </div>

        <button 
          style={styles.getRecommendButton}
          onClick={handleGetRecommendations}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
          }}
        >
          🎯 为我推荐美食
        </button>
      </div>

      {hasSearched && (
        <div style={styles.resultsSection}>
          <div style={styles.resultsHeader}>
            <h2 style={styles.resultsTitle}>推荐结果</h2>
            <span style={styles.resultsCount}>
              共找到 {recommendations.length} 家餐厅
            </span>
          </div>

          {recommendations.length > 0 ? (
            <div style={styles.resultsGrid}>
              {recommendations.map((restaurant) => (
                <RecommendationCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  reason={restaurant.recommendationReasons}
                  onDetailClick={handleDetailClick}
                  onFavorite={handleFavorite}
                />
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>🔍</div>
              <div style={styles.emptyTitle}>暂无推荐</div>
              <div style={styles.emptyText}>
                试试调整筛选条件，获取更多推荐
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
