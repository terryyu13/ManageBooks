import React, { useState, useEffect } from "react";
import axios from "axios";

// 主元件：管理書籍清單的功能
function ManageBooks() {
  // 定義狀態：存放書籍項目清單
  const [items, setItems] = useState([]);
  // 定義狀態：存放新書籍項目的輸入資料
  const [newItem, setNewItem] = useState({ name: "", description: "" });

  // 使用 useEffect 在元件載入時從伺服器獲取現有書籍項目
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items") // 向後端 API 發送 GET 請求
      .then((res) => setItems(res.data)) // 請求成功後，將資料更新至 items 狀態
      .catch((err) => console.error(err)); // 處理請求失敗的錯誤
  }, []); // 空的依賴陣列，表示此 effect 僅執行一次

  // 新增書籍項目的函式
  const addItem = () => {
    axios
      .post("http://localhost:5000/api/items", newItem) // 向後端 API 發送 POST 請求，提交新書籍資料
      .then((res) => setItems([...items, res.data])) // 更新 items 狀態，將新項目添加到清單
      .catch((err) => console.error(err)); // 處理請求失敗的錯誤
    setNewItem({ name: "", description: "" }); // 重置輸入欄位
  };

  // 刪除書籍項目的函式
  const deleteItem = (id) => {
    console.log("Delete triggered for:", id); // 偵錯用，顯示被刪除的項目 ID
    axios
      .delete(`http://localhost:5000/api/items/${id}`) // 向後端 API 發送 DELETE 請求
      .then((response) => {
        console.log("Delete response:", response); // 偵錯用，顯示伺服器回應
        // 從清單中移除已刪除的項目
        setItems((prevItems) => prevItems.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error("Error during deletion:", err); // 處理刪除失敗的錯誤
      });
  };

  // 返回 JSX 標記，渲染 UI
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      {/* 標題 */}
      <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">
        Manage Books
      </h1>

      {/* 輸入區域，用於新增新書籍 */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name" // 書籍名稱的輸入欄位
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} // 更新書籍名稱的狀態
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Description" // 書籍描述的輸入欄位
          value={newItem.description}
          onChange={(e) =>
            setNewItem({ ...newItem, description: e.target.value })
          } // 更新書籍描述的狀態
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {/* 新增按鈕 */}
        <button
          onClick={addItem} // 點擊時調用 addItem 函式
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Item
        </button>
      </div>

      {/* 顯示書籍清單 */}
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li
            key={item._id} // 唯一標識符
            className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm"
          >
            <div>
              {/* 顯示書籍名稱和描述 */}
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </div>
            {/* 刪除按鈕 */}
            <button
              onClick={() => deleteItem(item._id)} // 點擊時調用 deleteItem 函式
              className="text-red-500 hover:text-red-600 transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ManageBooks; // 將元件匯出，供其他模組使用
