import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddTopicForm = ({ addTopic }) => {
  const history = useHistory();
  const [category, setCategory] = useState('');
  const [topicName, setTopicName] = useState('');
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTopic(category, topicName, keywords.split(',').map((keyword) => keyword.trim()));
    setCategory('');
    setTopicName('');
    setKeywords('');
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4 flex flex-col items-center">
      <div className="flex flex-col w-full max-w-sm">
        <label htmlFor="category" className="text-lg font-medium text-gray-800 mb-2">
          Category
        </label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col w-full max-w-sm">
        <label htmlFor="topicName" className="text-lg font-medium text-gray-800 mb-2">
          Topic Name
        </label>
        <input
          id="topicName"
          type="text"
          value={topicName}
          onChange={(e) => setTopicName(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
        />
      </div>
      <div className="flex flex-col w-full max-w-sm">
        <label htmlFor="keywords" className="text-lg font-medium text-gray-800 mb-2">
          Keywords (comma-separated)
        </label>
        <input
          id="keywords"
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          required
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none"
        />
      </div>
      <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
        Add topic
      </button>
    </form>
  );
};

export default AddTopicForm;
