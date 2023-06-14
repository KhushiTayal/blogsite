import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Topics from './Topics';
import AddTopicForm from './AddTopicForm';
import Editor from './Editor';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const App = () => {
  const [topics, setTopics] = useState({
    Technology: [
      {
        name: 'Artificial Intelligence',
        keywords: ['AI', 'Machine Learning', 'Deep Learning'],
      },
      {
        name: 'Blockchain',
        keywords: ['Bitcoin', 'Cryptocurrency', 'Smart Contracts'],
      },
    ],
    Science: [
      {
        name: 'Quantum Mechanics',
        keywords: ['Quantum Entanglement', 'Superposition', 'Quantum Computing'],
      },
    ],
  });

  const addTopic = (category, topicName, keywords) => {
    // Logic to add a new topic
    const newTopic = { name: topicName, keywords };
    setTopics((prevTopics) => ({
      ...prevTopics,
      [category]: [...(prevTopics[category] || []), newTopic],
    }));
  };

  const deleteTopic = (category, index) => {
    // Logic to delete a topic
    setTopics((prevTopics) => {
      const updatedTopics = { ...prevTopics };
      updatedTopics[category].splice(index, 1);
      return updatedTopics;
    });
  };

  return (
    <div className="wrapper">
      <div className="content">
      <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Topics topics={topics} deleteTopic={deleteTopic} />
          {/* <AddTopicForm addTopic={addTopic} /> */}
        </Route>
        <Route exact path="/addTopic">
          <AddTopicForm addTopic={addTopic} />
        </Route>
        <Route exact path="/editor">
          <Editor />
        </Route>
        <Route exact path="/editor/:topicName">
          <Editor />
        </Route>
      </Switch>
      {/* <Footer /> */}
      </BrowserRouter>
    </div>
    </div>
  );
};

export default App;
