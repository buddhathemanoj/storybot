


// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { Row, Col, Button, Dropdown, Menu, Input, Space, Upload } from 'antd';
// import { DeleteOutlined, PlusOutlined, UploadOutlined, DownOutlined, CopyOutlined } from '@ant-design/icons';
// import axios from 'axios';

// const genres = ['Select Genre', 'Fantasy', 'Science Fiction', 'Romance', 'Mystery', 'Thriller', 'Adventure'];

// const screenplayStyle = {
//   marginTop: '20px',
//   border: '1px solid #ccc',
//   padding: '10px',
//   overflowY: 'auto', // Use 'auto' instead of 'scroll'
//   whiteSpace: 'pre-wrap',
//   wordWrap: 'break-word',
// };

// const CreateSection = () => {
//   const [selectedGenre, setSelectedGenre] = useState('Select Genre');
//   const [characters, setCharacters] = useState(['']);
//   const [characterRelation, setCharacterRelation] = useState('');
//   const [fileList, setFileList] = useState([]);
//   const [story, setStory] = useState(null);
//   const [response, setResponse] = useState(null); // Add state for response handling
//   const [screenplay, setScreenplay] = useState(null);
//   const [isStoryGenerated, setIsStoryGenerated] = useState(false);
//   const [storiesWithScreenplay, setStoriesWithScreenplay] = useState([]); // State for stories and their screenplays
//   const [generatedStories, setGeneratedStories] = useState([]);
//   const [generatedScreenplays, setGeneratedScreenplays] = useState([]);
//   const handleGenreSelect = ({ key }) => {
//     setSelectedGenre(key);
//   };

//   const handleAddCharacter = () => {
//     setCharacters([...characters, '']);
//   };

//   const handleRemoveCharacter = (index) => {
//     const updatedCharacters = [...characters];
//     updatedCharacters.splice(index, 1);
//     setCharacters(updatedCharacters);
//   };

//   const handleCharacterChange = (index, value) => {
//     const updatedCharacters = [...characters];
//     updatedCharacters[index] = value;
//     setCharacters(updatedCharacters);
//   };

//   const handleFileChange = ({ fileList }) => {
//     setFileList(fileList);
//   };

//   const handleCreateStory = async () => {
//     try {
//       const givenCharacters = characters.filter(Boolean).join(', ');
//       console.log(`Write a story in ${selectedGenre} with the character names as ${givenCharacters}`);

//       // Make a POST request to your Python backend with the selectedGenre, givenCharacters, and characterRelation
//       const response = await axios.post('http://localhost:5000/generate_story', {
//         genre: selectedGenre,
//         character_name: givenCharacters,
//         character_relation: characterRelation,
//       });

//       // Handle the response from the backend, which contains the generated story
//       const generatedStory = response.data.rough_drafts.map((item) => item.story);
//       setGeneratedStories(generatedStory);

//       // Save the story with its ID in the storiesWithScreenplay array
//       const saveResponse = await axios.post('http://localhost:5002/api/story/save_story', {
//         story: generatedStory,
//       });
//       setStoriesWithScreenplay((prevStories) => [...prevStories, { story: generatedStory, id: saveResponse.data._id }]);

//       setIsStoryGenerated(true);
//     } catch (error) {
//       console.error('Error creating the story:', error);
//     }
//   };

//   const handleCopyScreenplay = () => {
//     if (screenplay) {
//       navigator.clipboard.writeText(screenplay.join('\n\n'));
//       // You can show a notification or feedback to the user if needed
//     }
//   };

//   const handleCopyParagraph = (paragraph) => {
//     if (paragraph) {
//       navigator.clipboard.writeText(paragraph);
//       // You can show a notification or feedback to the user if needed
//     }
//   };

//   const handleShowScreenplay = async (storyId) => {
//     try {
      
//       // Find the story with the given storyId in the storiesWithScreenplay array
//       const selectedStory = storiesWithScreenplay.find((story) => story.id === storyId);
//       if (!selectedStory) {
//         console.error('Selected story not found');
//         return;
//       }

//       // Fetch the screenplay using the story from the selected story object
//       const response = await axios.post('http://localhost:5000/generate_screenplay', {
//         story: selectedStory.story,
//       });

//       const generatedScreenplay = response.data.screenplay;

//       setScreenplay(generatedScreenplay);
//     } catch (error) {
//       console.error('Error generating screenplay:', error);
//     }
//   };

//   const menu = (
//     <Menu onClick={handleGenreSelect}>
//       {genres.map((genre) => (
//         <Menu.Item key={genre}>{genre}</Menu.Item>
//       ))}
//     </Menu>
//   );

//   return (
//     <Row style={{ padding: '0 10%', alignItems: 'center', justifyContent: 'space-between', margin: '0 auto' }}>
//       {!isStoryGenerated ? (
//         <Col span={11} style={{ marginRight: '10px' }} className='boxshadow'>
//           <div style={{ textAlign: 'center' }}>
//             <h1>Create New Story</h1>
//             <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 60px' }}>
//               <p style={{ marginTop: '5px', fontSize: '16px' }}>Select a Genre: </p>
//               <Dropdown overlay={menu}>
//                 <Button>{selectedGenre} <DownOutlined /></Button>
//               </Dropdown>
//             </div>

//             <div>
//               {characters.map((character, index) => (
//                 <div key={index}>
//                   <Space style={{ marginBottom: 8 }}>
//                     <Input
//                       value={character}
//                       onChange={(e) => handleCharacterChange(index, e.target.value)}
//                       placeholder="Enter character name"
//                       style={{ marginRight: 8 }}
//                     />
//                     {index === characters.length - 1 ? (
//                       <Space>
//                         <DeleteOutlined onClick={() => handleRemoveCharacter(index)} style={{ fontSize: 20, cursor: 'pointer' }} />
//                         <Button type="primary" onClick={handleAddCharacter}>
//                           <PlusOutlined /> Add
//                         </Button>
//                       </Space>
//                     ) : (
//                       <DeleteOutlined onClick={() => handleRemoveCharacter(index)} style={{ fontSize: 20, cursor: 'pointer' }} />
//                     )}
//                   </Space>
//                 </div>
//               ))}
//               <div style={{ padding: '0 40px' }}>
//                 <Input
//                   value={characterRelation}
//                   onChange={(e) => setCharacterRelation(e.target.value)}
//                   placeholder="Enter character relation/synopsis"
//                   style={{ marginBottom: 8 }}
//                 />
//               </div>
//             </div>
//             <Button style={{ width: '320px', marginBottom: '30px' }} type="primary" onClick={handleCreateStory}>
//               Create
//             </Button>
//           </div>

//           <div style={{ textAlign: 'center' }}>
//             <h1>Continue with Existing</h1>
//             <Upload fileList={fileList} onChange={handleFileChange} beforeUpload={() => false}>
//               <Button style={{ marginBottom: '30px' }} icon={<UploadOutlined />}>Select Files</Button>
//             </Upload>
//             {/* Your content for continue with existing goes here */}
//           </div>
//         </Col>
//       ) : null}

// {isStoryGenerated ? (
//         <Col span={22} style={{ marginRight: '10px' }} className="boxshadow">
//           <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
//             <h1 style={{ textAlign: 'center' }}>Generated Short Stories</h1>
//             {generatedStories.map((story, index) => (
//               <div key={index}>
//                 <p>{story[0]}</p>
//                 <Button
//                   style={{ marginBottom: '10px' }}
//                   type="primary"
//                   onClick={() => handleShowScreenplay(index)}
//                 >
//                   Show Screenplay
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </Col>
//       ) : null}

//       {screenplay && (
//         <Col span={22} style={{ marginRight: '10px', background: '#f5f5f5' }} className="boxshadow">
//           <div style={screenplayStyle}>
//             <h2>Generated Screenplay</h2>
//             <pre>{screenplay}</pre>
//           </div>
//           <Button
//             style={{ marginTop: '10px' }}
//             type="primary"
//             onClick={handleCopyScreenplay}
//           >
//             Copy Entire Screenplay
//           </Button>
//         </Col>
//       )}
//     </Row>
//   );
// };

// export default CreateSection;
import React, { useState } from 'react';
import { Row, Col, Button, Dropdown, Menu, Input, Space, Upload } from 'antd';
import { DeleteOutlined, PlusOutlined, UploadOutlined, DownOutlined, CopyOutlined } from '@ant-design/icons';
import axios from 'axios';

const genres = ['Select Genre', 'Fantasy', 'Science Fiction', 'Romance', 'Mystery', 'Thriller', 'Adventure'];

const screenplayStyle = {
  marginTop: '20px',
  border: '1px solid #ccc',
  padding: '10px',
  overflowY: 'auto', // Use 'auto' instead of 'scroll'
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
};

const CreateSection = () => {
  const [selectedGenre, setSelectedGenre] = useState('Select Genre');
  const [characters, setCharacters] = useState(['']);
  const [characterRelation, setCharacterRelation] = useState('');
  const [fileList, setFileList] = useState([]);
  const [generatedStories, setGeneratedStories] = useState([]);
  const [screenplay, setScreenplay] = useState(null);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(null);
  const [isStoryGenerated, setIsStoryGenerated] = useState(false);

  const handleGenreSelect = ({ key }) => {
    setSelectedGenre(key);
  };

  const handleAddCharacter = () => {
    setCharacters([...characters, '']);
  };

  const handleRemoveCharacter = (index) => {
    const updatedCharacters = [...characters];
    updatedCharacters.splice(index, 1);
    setCharacters(updatedCharacters);
  };

  const handleCharacterChange = (index, value) => {
    const updatedCharacters = [...characters];
    updatedCharacters[index] = value;
    setCharacters(updatedCharacters);
  };

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleCopyScreenplay = () => {
    if (screenplay) {
      navigator.clipboard.writeText(screenplay);
      // You can show a notification or feedback to the user if needed
    }
  };
  // const handleShowScreenplay = async (index) => {
  //   try {
  //     const selectedStory = generatedStories[index][0];
  //     console.log('Selected Story:', selectedStory);

  //     const response = await axios.post('http://localhost:5000/generate_screenplay', {
  //       story: selectedStory,
  //     });

  //     const generatedScreenplay = response.data.screenplay;
  //     console.log('Generated Screenplay:', generatedScreenplay);

  //     setScreenplay(generatedScreenplay);
  //     setSelectedStoryIndex(index);

  //     // Save the screenplay in MongoDB
  //     const screenplayResponse = await axios.post('http://localhost:5002/api/story/save_screenplay', {
  //       screenplay: generatedScreenplay,
  //     });
  //     console.log('Screenplay saved in MongoDB:', screenplayResponse.data.message);
  //   } catch (error) {
  //     console.error('Error generating screenplay:', error);
  //   }
  // };

  // const handleCreateStory = async () => {
  //   try {
  //     const givenCharacters = characters.filter(Boolean).join(', ');
  //     console.log(`Write a story in ${selectedGenre} with the character names as ${givenCharacters}`);

  //     const response = await axios.post('http://localhost:5000/generate_story', {
  //       genre: selectedGenre,
  //       character_name: givenCharacters,
  //       character_relation: characterRelation,
  //     });

  //     const generatedStory = response.data.rough_drafts.map((item) => item.story);
  //     console.log(generatedStory)
  //     setGeneratedStories(generatedStory);

  //     setIsStoryGenerated(true);
  //   } catch (error) {
  //     console.error('Error creating the story:', error);
  //   }
  // };

  const handleShowScreenplay = async (index) => {
    try {
      const selectedStory = generatedStories[index].story;
      console.log('Selected Story:', selectedStory);

      const response = await axios.post('http://localhost:5000/generate_screenplay', {
        story: selectedStory,
      });

      const generatedScreenplay = response.data.screenplay;
      console.log('Generated Screenplay:', generatedScreenplay);

      setScreenplay(generatedScreenplay);
      setSelectedStoryIndex(index);
      const screenplayResponse = await axios.post('http://localhost:5002/api/story/save_screenplay', {
        screenplay: generatedScreenplay,
      });
      console.log('Screenplay saved in MongoDB:', screenplayResponse.data.message);
    } catch (error) {
      console.error('Error generating screenplay:', error);
    }
  };

  const handleCreateStory = async () => {
    try {
      const givenCharacters = characters.filter(Boolean).join(', ');
      console.log(`Write a story in ${selectedGenre} with the character names as ${givenCharacters}`);

      const response = await axios.post('http://localhost:5000/generate_story', {
        genre: selectedGenre,
        character_name: givenCharacters,
        character_relation: characterRelation,
      });

      const generatedStory = response.data.rough_drafts.map((item) => item.story);
      console.log('Generated Stories:', generatedStory);
      setGeneratedStories(generatedStory.map((story) => ({ story, screenplay: null })));

      setIsStoryGenerated(true);
    } catch (error) {
      console.error('Error creating the story:', error);
    }
  };
  const menu = (
    <Menu onClick={handleGenreSelect}>
      {genres.map((genre) => (
        <Menu.Item key={genre}>{genre}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Row style={{ padding: '0 10%', alignItems: 'center', justifyContent: 'space-between', margin: '0 auto' }}>
     {!isStoryGenerated ? (
        <Col span={11} style={{ marginRight: '10px' }} className="boxshadow">
          <div style={{ textAlign: 'center' }}>
            <h1>Create New Story</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 60px' }}>
              <p style={{ marginTop: '5px', fontSize: '16px' }}>Select a Genre: </p>
              <Dropdown overlay={menu}>
                <Button>
                  {selectedGenre} <DownOutlined />
                </Button>
              </Dropdown>
            </div>

            <div>
              {characters.map((character, index) => (
                <div key={index}>
                  <Space style={{ marginBottom: 8 }}>
                    <Input
                      value={character}
                      onChange={(e) => handleCharacterChange(index, e.target.value)}
                      placeholder="Enter character name"
                      style={{ marginRight: 8 }}
                    />
                    {index === characters.length - 1 ? (
                      <Space>
                        <DeleteOutlined onClick={() => handleRemoveCharacter(index)} style={{ fontSize: 20, cursor: 'pointer' }} />
                        <Button type="primary" onClick={handleAddCharacter}>
                          <PlusOutlined /> Add
                        </Button>
                      </Space>
                    ) : (
                      <DeleteOutlined onClick={() => handleRemoveCharacter(index)} style={{ fontSize: 20, cursor: 'pointer' }} />
                    )}
                  </Space>
                </div>
              ))}
              <div style={{ padding: '0 40px' }}>
                <Input
                  value={characterRelation}
                  onChange={(e) => setCharacterRelation(e.target.value)}
                  placeholder="Enter character relation/synopsis"
                  style={{ marginBottom: 8 }}
                />
              </div>
            </div>
            <Button style={{ width: '320px', marginBottom: '30px' }} type="primary" onClick={handleCreateStory}>
              Create
            </Button>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h1>Continue with Existing</h1>
            <Upload fileList={fileList} onChange={handleFileChange} beforeUpload={() => false}>
              <Button style={{ marginBottom: '30px' }} icon={<UploadOutlined />}>
                Select Files
              </Button>
            </Upload>
            {/* Your content for continue with existing goes here */}
          </div>
        </Col>
    ) : (
      <Col span={22} style={{ marginRight: '10px' }} className="boxshadow">
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        <h1 style={{ textAlign: 'center' }}>Generated Short Stories</h1>
        {generatedStories.map((story, index) => (
          <div key={index}>
            <p>{story.story}</p>
            <Button style={{ marginBottom: '10px' }} type="primary" onClick={() => handleShowScreenplay(index)}>
              Show Screenplay
            </Button>
            {screenplay && index === selectedStoryIndex && (
              <div style={screenplayStyle}>
                <h2>Generated Screenplay</h2>
                <pre>{screenplay}</pre>
                <Button style={{ marginTop: '10px' }} type="primary" onClick={handleCopyScreenplay}>
                  Copy Screenplay
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Col>
  )}
</Row>
  );
};

export default CreateSection;
