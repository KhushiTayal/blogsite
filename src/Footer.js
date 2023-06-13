import React from 'react';
import './Footer.css'

const Footer = () => {
  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com/example' },
    { name: 'Instagram', url: 'https://instagram.com/example' },
    { name: 'Facebook', url: 'https://facebook.com/example' },
  ];

  return (
    <footer className="bg-gray-200 py-6 flex flex-col items-center">
      <div className="text-gray-600 mb-2">
        &copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.
      </div>
      <ul className="flex space-x-4">
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
