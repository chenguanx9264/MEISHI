import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { collegeFoodCategories } from '../data/collegeFoodData';

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif'
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '2px solid rgba(255,255,255,0.3)',
    borderRadius: '25px',
    color: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    zIndex: 10
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#fff',
    margin: '0 0 10px 0',
    textShadow: '0 0 20px rgba(255, 107, 107, 0.5)'
  },
  subtitle: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    margin: 0
  },
  wheelContainer: {
    position: 'relative',
    width: '350px',
    height: '350px',
    marginBottom: '30px'
  },
  wheel: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 0 50px rgba(255, 107, 107, 0.3), inset 0 0 30px rgba(0, 0, 0, 0.3)',
    border: '8px solid rgba(255, 255, 255, 0.1)'
  },
  pointer: {
    position: 'absolute',
    top: '-20px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '0',
    height: '0',
    borderLeft: '20px solid transparent',
    borderRight: '20px solid transparent',
    borderTop: '40px solid #FF6B6B',
    zIndex: 10,
    filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
  },
  centerCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '24px',
    fontWeight: 'bold',
    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.5)',
    zIndex: 5,
    cursor: 'pointer',
    border: '4px solid rgba(255, 255, 255, 0.3)'
  },
  spinButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
    border: 'none',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    zIndex: 6,
    boxShadow: '0 4px 20px rgba(255, 107, 107, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    lineHeight: 1.2
  },
  resultModal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 100
  },
  resultContent: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '20px',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
    animation: 'scaleIn 0.3s ease'
  },
  resultEmoji: {
    fontSize: '80px',
    marginBottom: '20px'
  },
  resultTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#fff',
    margin: '0 0 10px 0'
  },
  resultCategory: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '15px'
  },
  resultDesc: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '20px'
  },
  resultPrice: {
    display: 'inline-block',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: '8px 20px',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '14px',
    marginBottom: '25px'
  },
  closeButton: {
    backgroundColor: '#fff',
    color: '#667eea',
    border: 'none',
    padding: '12px 40px',
    borderRadius: '25px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  instruction: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: '14px',
    textAlign: 'center',
    marginTop: '20px'
  },
  categoryHint: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
    maxWidth: '500px'
  },
  categoryTag: {
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    color: '#fff',
    opacity: 0.8,
    transition: 'all 0.3s ease'
  }
};

function CollegeFoodWheel() {
  const navigate = useNavigate();
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const wheelRef = useRef(null);

  const categories = collegeFoodCategories;
  const segmentAngle = 360 / categories.length;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes scaleIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const getRandomSegment = () => {
    const random = Math.random();
    const segment = Math.floor(random * categories.length);
    return segment;
  };

  const spinWheel = () => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setShowResult(false);
    
    const targetSegment = getRandomSegment();
    const baseRotations = 5 * 360;
    const targetRotation = baseRotations + (360 - targetSegment * segmentAngle - segmentAngle / 2);
    
    const newRotation = rotation + targetRotation;
    setRotation(newRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      const winningIndex = targetSegment;
      setResult(categories[winningIndex]);
      setShowResult(true);
    }, 4000);
  };

  const closeResult = () => {
    setShowResult(false);
  };

  const renderWheelSegments = () => {
    return categories.map((category, index) => {
      const angle = index * segmentAngle;
      const rotate = angle;
      
      return (
        <div
          key={category.id}
          style={{
            position: 'absolute',
            width: '50%',
            height: '50%',
            left: '50%',
            top: '0',
            transformOrigin: '0% 100%',
            transform: `rotate(${rotate}deg)`,
            backgroundColor: category.color,
            clipPath: 'polygon(0% 100%, 100% 0%, 0% 0%)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingBottom: '20px'
          }}
        >
          <span
            style={{
              transform: 'rotate(90deg) translateX(30px)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 'bold',
              textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            {category.emoji} {category.name}
          </span>
        </div>
      );
    });
  };

  return (
    <div style={styles.container}>
      <button 
        style={styles.backButton}
        onClick={() => navigate('/')}
        onMouseEnter={e => {
          e.target.style.backgroundColor = 'rgba(255,255,255,0.2)';
        }}
        onMouseLeave={e => {
          e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
        }}
      >
        ← 返回推荐
      </button>

      <div style={styles.header}>
        <h1 style={styles.title}>🎰 今日吃啥</h1>
        <p style={styles.subtitle}>选择困难症福音，转出你的今日美食</p>
      </div>

      <div style={styles.categoryHint}>
        {categories.slice(0, 4).map(cat => (
          <span 
            key={cat.id} 
            style={{...styles.categoryTag, backgroundColor: cat.color}}
          >
            {cat.emoji} {cat.name}
          </span>
        ))}
      </div>

      <div style={styles.wheelContainer}>
        <div style={styles.wheel} ref={wheelRef}>
          <div 
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
              transform: `rotate(${rotation}deg)`
            }}
          >
            {renderWheelSegments()}
          </div>
        </div>
        
        <div style={styles.pointer}></div>
        
        <button 
          style={styles.spinButton}
          onClick={spinWheel}
          disabled={isSpinning}
        >
          {isSpinning ? '🤔' : '🎲'}
          <span style={{fontSize: '12px', marginTop: '2px'}}>
            {isSpinning ? '转中' : '开始'}
          </span>
        </button>
      </div>

      <p style={styles.instruction}>点击中间按钮开始转盘，命运的美食将指引你</p>

      {showResult && result && (
        <div style={styles.resultModal} onClick={closeResult}>
          <div style={styles.resultContent} onClick={e => e.stopPropagation()}>
            <div style={styles.resultEmoji}>{result.emoji}</div>
            <h2 style={styles.resultTitle}>{result.name}</h2>
            <p style={styles.resultCategory}>{result.description}</p>
            <p style={styles.resultDesc}>点击美食卡片获取推荐</p>
            <div style={styles.resultPrice}>
              💰 人均: {result.foods[0]?.priceRange || '随机'}
            </div>
            <div style={{marginBottom: '20px'}}>
              <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '14px', marginBottom: '10px'}}>
                今日推荐菜品:
              </p>
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px'}}>
                {result.foods.slice(0, 3).map(food => (
                  <span 
                    key={food.id}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      padding: '6px 12px',
                      borderRadius: '15px',
                      color: '#fff',
                      fontSize: '13px'
                    }}
                  >
                    {food.emoji} {food.name}
                  </span>
                ))}
              </div>
            </div>
            <button 
              style={styles.closeButton}
              onClick={closeResult}
              onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={e => e.target.style.transform = 'scale(1)'}
            >
              再转一次 🔄
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CollegeFoodWheel;
