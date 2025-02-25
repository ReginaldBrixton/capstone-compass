import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Star } from 'lucide-react';

/**
 * TeamMember component displays a team member's information with their avatar and role.
 * Enhanced with animations, interactive elements, and additional features.
 * Fully responsive design that adapts to all screen sizes from mobile to desktop.
 *
 * @param {Object} props - The properties object.
 * @param {string} props.name - The name of the team member.
 * @param {string} props.role - The role of the team member.
 * @param {string} [props.email] - The email of the team member.
 * @param {string} [props.status] - The current status of the team member.
 * @param {number} [props.rating] - The performance rating (1-5).
 * @param {Array} [props.skills] - Array of skills the team member possesses.
 * @param {boolean} [props.isOnline] - Whether the team member is currently online.
 * @returns {JSX.Element} The rendered TeamMember component.
 */
export const TeamMember = ({ 
  name = '', 
  role = '', 
  email = 'contact@example.com',
  status = 'Available',
  rating = 4,
  skills = ['Teamwork', 'Communication'],
  isOnline = true
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const avatarUrl = `https://avatar.vercel.sh/${name}.png`;

  const statusColors = {
    'Available': 'bg-green-500',
    'Busy': 'bg-red-500',
    'Away': 'bg-yellow-500',
    'Offline': 'bg-gray-500'
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div 
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="grid grid-cols-[auto,1fr] gap-2 sm:gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-300"
        onClick={toggleExpand}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.01 }}
      >
        <div className="relative w-10 h-10 xs:w-11 xs:h-11">
          <motion.img
            src={avatarUrl}
            alt={name}
            className="rounded-full w-full h-full object-cover border-2 border-gray-100 dark:border-gray-800"
            whileHover={{ scale: 1.05 }}
            animate={isHovered ? { rotate: [0, 3, -3, 0] } : {}}
            transition={{ duration: 0.5 }}
          />
          {isOnline && (
            <motion.div 
              className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full ${statusColors[status]} border-2 border-white dark:border-gray-900`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            />
          )}
        </div>

        <div className="flex flex-col justify-center min-w-0 gap-1 w-full">
          <div className="flex flex-col xs:flex-row xs:justify-between xs:items-center w-full">
            <h3 className="text-sm xs:text-base font-medium text-gray-900 dark:text-gray-100 truncate">
              {name || 'Anonymous User'}
            </h3>
            <div className="flex mt-0.5 xs:mt-0">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  size={10} 
                  className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} sm:w-3 sm:h-3`} 
                />
              ))}
            </div>
          </div>
          <div className="w-fit px-2 py-0.5 rounded-full text-xs bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-gray-700">
            {role || 'Team Member'}
          </div>
          
          <motion.div 
            className="overflow-hidden w-full"
            initial={{ height: 0 }}
            animate={{ height: isExpanded ? 'auto' : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 w-full">
              <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 mb-1.5">
                <Mail size={12} className="flex-shrink-0" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400 mb-1.5">
                <MessageSquare size={12} className="flex-shrink-0" />
                <span>Status: {status}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="px-1.5 py-0.5 text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300 rounded-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
