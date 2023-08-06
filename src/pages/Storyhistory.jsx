// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const StoryHistory = () => {
//   const [stories, setStories] = useState([]);

//   useEffect(() => {
//     // Fetch story data from the Node.js backend
//     axios.get('http://localhost:5002/api/story/get_all_stories')
//       .then((response) => {
//         setStories(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching story data:', error);
//       });
//   }, []);

//   return (
//     <div>
//       <h2>Story History</h2>
//       {stories.length > 0 ? (
//         <ul>
//           {stories.map((story) => (
//             // Access the 'story' property from the story object
//             <li key={story._id}>
//               {story.story.map((part, index) => (
//                 // Render each part of the story as a separate list item
//                 <p key={index}>{part}</p>
//               ))}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div>No stories available.</div>
//       )}
//     </div>
//   );
// };

// export default StoryHistory;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Drawer, List, Button, Row, Col, Card } from 'antd';

const StoryHistory = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [screenplay, setScreenplay] = useState('');

  useEffect(() => {
    // Fetch story data from the Node.js backend
    axios
      .get('http://localhost:5002/api/story/get_all_stories')
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching story data:', error);
      });
  }, []);

  const handleDrawerClick = (story) => {
    setSelectedStory(story);
    fetchScreenplay(story._id);
    setIsDrawerVisible(true);
  };

  const fetchScreenplay = (storyId) => {
    // Fetch screenplay from the backend based on the selected story's ID
    axios
      .get(`http://localhost:5002/api/screenplay/${storyId}`)
      .then((response) => {
        setScreenplay(response.data.screenplay);
      })
      .catch((error) => {
        console.error('Error fetching screenplay data:', error);
      });
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  return (
    <div>
      <h2>Story History</h2>
      {stories.length > 0 ? (
        stories.map((story) => (
          <Card
            key={story._id}
            style={{ background: '#f0f0f0', marginBottom: 16 }}
            bodyStyle={{ padding: 16 }}
          >
            <p>{story.story[0]}</p>
            <Button onClick={() => handleDrawerClick(story)}>Show Screenplay</Button>
          </Card>
        ))
      ) : (
        <div>No stories available.</div>
      )}

      {/* Ant Design Drawer */}
      <Drawer
        title={selectedStory ? selectedStory.story[0] : ''}
        placement="right"
        closable={true}
        onClose={closeDrawer}
        visible={isDrawerVisible}
      >
        {screenplay && <p>{screenplay}</p>}
      </Drawer>
    </div>
  );
};

export default StoryHistory;
