import React, { useState, useEffect } from "react";
import axios from "axios";

// 主元件：管理書籍清單
function ManageBooks() {
  const [items, setItems] = useState([]); // 書籍清單
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    quantity: 0,
    releaseDate: "",
  }); // 新書籍的輸入欄位
  const [editingId, setEditingId] = useState(null); // 目前正在編輯的項目 ID
  const [editingItem, setEditingItem] = useState(null); // 正在編輯的項目資料

  // 載入書籍清單
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  // 新增書籍
  const addItem = () => {
    axios
      .post("http://localhost:5000/api/items", newItem)
      .then((res) => setItems([...items, res.data]))
      .catch((err) => console.error(err));
    setNewItem({ name: "", description: "", quantity: 0, releaseDate: "" });
  };

  // 刪除書籍
  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:5000/api/items/${id}`)
      .then(() => setItems((prevItems) => prevItems.filter((item) => item._id !== id)))
      .catch((err) => console.error(err));
  };

  // 更新書籍
  const updateItem = () => {
    axios
      .put(`http://localhost:5000/api/items/${editingId}`, editingItem)
      .then((res) => {
        setItems((prevItems) =>
          prevItems.map((item) => (item._id === editingId ? res.data : item))
        );
        setEditingId(null);
        setEditingItem(null);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
      {/* 標題 */}
      <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Manage Books</h1>

      {/* 新增書籍 */}
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newItem.quantity}
          onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="date"
          placeholder="Release Date"
          value={newItem.releaseDate}
          onChange={(e) => setNewItem({ ...newItem, releaseDate: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={addItem}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Item
        </button>
      </div>

      {/* 書籍清單 */}
      <ul className="mt-6 space-y-4">
        {items.map((item) =>
          editingId === item._id ? (
            <li key={item._id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
              <input
                type="text"
                value={editingItem.name}
                onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="number"
                value={editingItem.quantity}
                onChange={(e) => setEditingItem({ ...editingItem, quantity: e.target.value })}
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="date"
                value={editingItem.releaseDate}
                onChange={(e) => setEditingItem({ ...editingItem, releaseDate: e.target.value })}
                className="w-full mb-2 px-4 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={updateItem}
                className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingId(null);
                  setEditingItem(null);
                }}
                className="bg-gray-300 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </li>
          ) : (
            <li key={item._id} className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
              <div>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-gray-600 text-sm">Quantity: {item.quantity}</p>
                <p className="text-gray-600 text-sm">Release Date: {item.releaseDate}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setEditingId(item._id);
                    setEditingItem(item);
                  }}
                  className="text-blue-500 hover:text-blue-600 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

export default ManageBooks;
