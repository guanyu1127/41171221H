import React, { useState, useEffect } from 'react';
import UserInfo from './UserInfo'; // 引入 UserInfo 元件

function PostApp() {
  const [inputPost, setInputPost] = useState('');
  const [posted, setPosted] = useState('');
  const [name, setName] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  // 自動獲取當前日期
  useEffect(() => {
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    setCurrentDate(formattedDate);
  }, []);

  // 處理姓名輸入變化
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleInputChange = (e) => {
    setInputPost(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPosted(inputPost);
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
        <button type="submit">提交</button>
      </form>

      {/* 顯示姓名與 Post */}
      {posted && (
        <div>
          <h3>{name} 的 Post:</h3>
          <p>{posted}</p>
        </div>
      )}
    </div>
  );
}

export default PostApp;
