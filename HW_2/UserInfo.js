import React from 'react';

function UserInfo({ name, handleNameChange, currentDate }) {
  return (
    <div>
      <h2>使用者資訊</h2>
      <input
        type="text"
        value={name}
        onChange={handleNameChange}
        placeholder="輸入你的姓名"
      />
      <p>你好, {name || '使用者'}!</p>
      <p>今天的日期是: {currentDate}</p>
    </div>
  );
}

export default UserInfo;
