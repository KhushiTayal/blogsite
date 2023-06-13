import React from 'react';
import { Link } from 'react-router-dom';

const Topics = ({ topics, deleteTopic }) => {
  return (
    <div className="space-y-6">
      {Object.entries(topics).map(([category, topicList]) => (
        <div key={category} className="border border-gray-200 rounded p-4 shadow-md">
          <h3 className="text-2xl font-bold mb-4">{category}</h3>
          <ul className="list-disc ml-6 space-y-4">
            {topicList.map((topic, index) => (
              <li key={index} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="mr-2 text-lg">{topic.name}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => deleteTopic(category, index)}
                      className="text-red-500 hover:text-red-600 transition-colors duration-300"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/editor/${encodeURIComponent(topic.name)}`}
                      className="text-indigo-500 hover:text-indigo-600 transition-colors duration-300"
                    >
                      Write
                    </Link>
                  </div>
                </div>
                <div className="text-gray-600 text-sm border-t border-gray-200 pt-2">
                  <span className="font-semibold">Keywords:</span> {topic.keywords.join(', ')}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Topics;
