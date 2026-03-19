export const tasteOptions = [
  {
    id: 1,
    name: "辣",
    value: "spicy",
    icon: "🌶️",
    description: "麻辣、 香辣、 酸辣",
    color: "#FF4D4F",
    suitableWeathers: ["雨天", "雪天", "寒冷"],
    suitableMoods: ["开心", "庆祝", "压力"],
    cuisineTypes: ["川菜", "湘菜", "火锅", "烧烤"]
  },
  {
    id: 2,
    name: "甜",
    value: "sweet",
    icon: "🍰",
    description: "甜蜜、 清甜、 醇甜",
    color: "#FF85C0",
    suitableWeathers: ["晴天", "炎热"],
    suitableMoods: ["开心", "庆祝", "放松"],
    cuisineTypes: ["甜品", "西餐", "粤菜"]
  },
  {
    id: 3,
    name: "咸",
    value: "savory",
    icon: "🧂",
    description: "鲜咸、 酱香、 醇厚",
    color: "#FFC069",
    suitableWeathers: ["晴天", "寒冷", "雪天"],
    suitableMoods: ["庆祝", "开心", "无聊"],
    cuisineTypes: ["西北菜", "烧烤", "京菜", "海鲜"]
  },
  {
    id: 4,
    name: "酸",
    value: "sour",
    icon: "🍋",
    description: "酸甜、 酸辣、 清酸",
    color: "#95DE64",
    suitableWeathers: ["雨天", "炎热", "晴天"],
    suitableMoods: ["无聊", "庆祝", "开心"],
    cuisineTypes: ["东南亚菜", "韩餐", "川菜", "西餐"]
  },
  {
    id: 5,
    name: "鲜",
    value: "fresh",
    icon: "🍲",
    description: "鲜美、 清鲜、 醇鲜",
    color: "#5CDBD3",
    suitableWeathers: ["雨天", "雪天", "寒冷"],
    suitableMoods: ["难过", "压力", "放松"],
    cuisineTypes: ["粤菜", "日料", "火锅", "炖品"]
  },
  {
    id: 6,
    name: "苦",
    value: "bitter",
    icon: "☕",
    description: "微苦、 苦涩、 回甘",
    color: "#85A5FF",
    suitableWeathers: ["雨天", "雪天", "晴天"],
    suitableMoods: ["压力", "放松", "无聊"],
    cuisineTypes: ["咖啡厅", "茶馆", "素食"]
  }
];

export const tasteMap = {
  辣: "spicy",
  甜: "sweet",
  咸: "savory",
  酸: "sour",
  鲜: "fresh",
  苦: "bitter"
};

export const tasteToId = {
  辣: 1,
  甜: 2,
  咸: 3,
  酸: 4,
  鲜: 5,
  苦: 6
};

export default tasteOptions;
