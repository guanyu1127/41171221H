import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo'; // 引入 UserInfo 元件

function PostApp() {
  const [inputPost, setInputPost] = useState('');
  const [posted, setPosted] = useState('');
  const [name, setName] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [weather, setWeather] = useState('sunny'); // 預設為晴天
  const [mood, setMood] = useState('happy'); // 預設為快樂

  // 自動獲取當前日期
  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    setCurrentDate(formattedDate);
  }, []);

  // 當應用加載時從 localStorage 讀取已保存的POST
  useEffect(() => {
    const savedPost = localStorage.getItem('posted');
    const savedName = localStorage.getItem('name');
    const savedWeather = localStorage.getItem('weather');
    const savedMood = localStorage.getItem('mood');

    if (savedPost) setPosted(savedPost);
    if (savedName) setName(savedName);
    if (savedWeather) setWeather(savedWeather);
    if (savedMood) setMood(savedMood);
  }, []);

  // 處理姓名輸入變化
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  // 處理 post 輸入變化
  const handleInputChange = (e) => {
    setInputPost(e.target.value);
  };

  // 處理天氣選擇變化
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  // 處理心情選擇變化
  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  // 提交 post
  const handleSubmit = (e) => {
    e.preventDefault();
    setPosted(inputPost);
    localStorage.setItem('posted', inputPost); // 保存POST到localStorage
    localStorage.setItem('name', name); // 保存姓名到localStorage
    localStorage.setItem('weather', weather); // 保存天氣到localStorage
    localStorage.setItem('mood', mood); // 保存心情到localStorage
    setInputPost('');
  };

  return (
    <div>
      <h1>Post App</h1>

      {/* 渲染 UserInfo 元件，傳遞 name 和處理姓名變化的函數 */}
      <UserInfo name={name} handleNameChange={handleNameChange} currentDate={currentDate} />

      <form onSubmit={handleSubmit}>
        <textarea
          value={inputPost}
          onChange={handleInputChange}
          placeholder="輸入你的 post..."
        />
        <br />

        {/* 天氣選擇 */}
        <label htmlFor="weather">今天的天氣: </label>
        <select id="weather" value={weather} onChange={handleWeatherChange}>
          <option value="sunny">晴天</option>
          <option value="cloudy">多雲</option>
          <option value="rainy">下雨</option>
          <option value="stormy">暴風雨</option>
        </select>
        <br />

        {/* 心情選擇 */}
        <label htmlFor="mood">你的心情: </label>
        <select id="mood" value={mood} onChange={handleMoodChange}>
          <option value="happy">快樂</option>
          <option value="sad">難過</option>
          <option value="angry">生氣</option>
          <option value="excited">興奮</option>
        </select>
        <br />

        <button type="submit">提交</button>
      </form>

      {/* 顯示姓名、天氣、心情與 Post */}
      {posted && (
        <div>
          <h3>{name} 的 Post:</h3>
          <p>今天的天氣是: {weather}</p>
          <p>心情: {mood}</p>
          <p>{posted}</p>
        </div>
      )}
    </div>
  );
}

export default PostApp;
