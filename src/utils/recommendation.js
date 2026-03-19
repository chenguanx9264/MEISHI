import { moodToCuisine, moodToTags } from '../data/moodMapping.js';
import { weatherToCuisine, weatherToTags } from '../data/weatherMapping.js';
import restaurants from '../data/restaurants.js';
import cities from '../data/cities.js';

function getRecommendationReason(restaurant, matches) {
  const reasons = [];
  
  if (matches.city) {
    reasons.push(`位于${restaurant.city}，品味当地特色美食`);
  }
  if (matches.mood) {
    reasons.push(`符合您当前的心情需求`);
  }
  if (matches.weather) {
    reasons.push(`适合当前的天气条件`);
  }
  if (matches.taste) {
    reasons.push(`口味符合您的偏好：${restaurant.taste}味`);
  }
  
  if (reasons.length === 0) {
    reasons.push(`餐厅评分高达${restaurant.rating}分，值得一试`);
  }
  
  return reasons.join('，');
}

function createRecommendation(restaurant, matches) {
  return {
    ...restaurant,
    recommendationReasons: getRecommendationReason(restaurant, matches)
  };
}

export function getMoodRecommendations(mood) {
  if (!mood || !moodToCuisine[mood]) {
    return [];
  }

  const targetCuisines = moodToCuisine[mood];
  const targetTags = moodToTags[mood];

  const filtered = restaurants.filter(restaurant => {
    const restaurantCuisine = restaurant.cuisine;
    const restaurantTags = restaurant.tags?.moods || [];
    
    const cuisineMatch = targetCuisines.some(c => 
      restaurantCuisine.includes(c) || c.includes(restaurantCuisine)
    );
    const tagMatch = restaurantTags.some(tag => targetTags.includes(tag));
    
    return cuisineMatch || tagMatch;
  });

  return filtered.map(r => createRecommendation(r, { mood: true }));
}

export function getWeatherRecommendations(weather) {
  if (!weather || !weatherToCuisine[weather]) {
    return [];
  }

  const targetCuisines = weatherToCuisine[weather];
  const targetTags = weatherToTags[weather];

  const filtered = restaurants.filter(restaurant => {
    const restaurantCuisine = restaurant.cuisine;
    const restaurantWeatherTags = restaurant.tags?.weather || [];
    
    const cuisineMatch = targetCuisines.some(c => 
      restaurantCuisine.includes(c) || c.includes(restaurantCuisine)
    );
    const tagMatch = restaurantWeatherTags.some(tag => targetTags.includes(tag));
    
    return cuisineMatch || tagMatch;
  });

  return filtered.map(r => createRecommendation(r, { weather: true }));
}

export function getTasteRecommendations(taste) {
  if (!taste) {
    return [];
  }

  const filtered = restaurants.filter(restaurant => 
    restaurant.taste === taste
  );

  return filtered.map(r => createRecommendation(r, { taste: true }));
}

export function getCityRecommendations(city) {
  if (!city) {
    return { restaurants: [], citySpecialties: [] };
  }

  const cityInfo = cities.find(c => c.name === city);
  const citySpecialties = cityInfo ? cityInfo.specialties : [];

  const filtered = restaurants.filter(restaurant => 
    restaurant.city === city
  );

  return {
    restaurants: filtered.map(r => createRecommendation(r, { city: true })),
    citySpecialties: citySpecialties.map(specialty => ({
      name: specialty,
      description: `来自${city}的特色美食`,
      city: city
    }))
  };
}

export function getCombinedRecommendations({ mood, weather, taste, city }) {
  const WEIGHT_CITY = 3;
  const WEIGHT_MOOD = 2;
  const WEIGHT_WEATHER = 2;
  const WEIGHT_TASTE = 2;

  const scoredRestaurants = restaurants.map(restaurant => {
    let score = 0;
    const matches = {
      city: false,
      mood: false,
      weather: false,
      taste: false
    };

    if (city && restaurant.city === city) {
      score += WEIGHT_CITY;
      matches.city = true;
    }

    if (mood && moodToCuisine[mood]) {
      const targetCuisines = moodToCuisine[mood];
      const targetTags = moodToTags[mood];
      const restaurantTags = restaurant.tags?.moods || [];
      
      const cuisineMatch = targetCuisines.some(c => 
        restaurant.cuisine.includes(c) || c.includes(restaurant.cuisine)
      );
      const tagMatch = restaurantTags.some(tag => targetTags.includes(tag));
      
      if (cuisineMatch || tagMatch) {
        score += WEIGHT_MOOD;
        matches.mood = true;
      }
    }

    if (weather && weatherToCuisine[weather]) {
      const targetCuisines = weatherToCuisine[weather];
      const targetTags = weatherToTags[weather];
      const restaurantWeatherTags = restaurant.tags?.weather || [];
      
      const cuisineMatch = targetCuisines.some(c => 
        restaurant.cuisine.includes(c) || c.includes(restaurant.cuisine)
      );
      const tagMatch = restaurantWeatherTags.some(tag => targetTags.includes(tag));
      
      if (cuisineMatch || tagMatch) {
        score += WEIGHT_WEATHER;
        matches.weather = true;
      }
    }

    if (taste && restaurant.taste === taste) {
      score += WEIGHT_TASTE;
      matches.taste = true;
    }

    return {
      restaurant,
      score,
      matches
    };
  });

  const hasAnyFilter = mood || weather || taste || city;
  
  const filtered = hasAnyFilter 
    ? scoredRestaurants.filter(item => item.score > 0)
    : scoredRestaurants;

  const sorted = filtered.sort((a, b) => b.score - a.score);

  return sorted.map(item => createRecommendation(item.restaurant, item.matches));
}

export default {
  getMoodRecommendations,
  getWeatherRecommendations,
  getTasteRecommendations,
  getCityRecommendations,
  getCombinedRecommendations
};
