import React, { useState,useCallback ,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [story, setStory] = useState(null);
  const [response, setResponse] = useState(null); // Add state for response handling
  const [screenplay, setScreenplay] = useState(null);
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

  const handleCreateStory = async () => {
    try {
      const givenCharacters = characters.filter(Boolean).join(', ');
      console.log(`Write a story in ${selectedGenre} with the character names as ${givenCharacters}`);
      
      
      const response = await axios.post('http://localhost:5000/generate_story', {
        genre: selectedGenre,
        character_name: givenCharacters,
        character_relation: characterRelation, // Include character relation/synopsis in the request
      });
  
      const generatedStory = response.data.rough_drafts.map((item) => item.story);
      setResponse(generatedStory);
  
      setStory(generatedStory);

      const saveResponse = await axios.post('http://localhost:5002/api/story/save_story', {
        story: generatedStory,
      });
  
      console.log('Story saved in MongoDB:', saveResponse.data.message);
      setIsStoryGenerated(true);
    } catch (error) {
      console.error('Error creating the story:', error);
    }
  };
  const handleCopyScreenplay = useCallback(() => {
    if (screenplay) {
      navigator.clipboard.writeText(screenplay.join('\n\n'));
      // You can show a notification or feedback to the user if needed
    }
  }, [screenplay]);
  const handleCopyParagraph = useCallback((paragraph) => {
    if (paragraph) {
      navigator.clipboard.writeText(paragraph);
      // You can show a notification or feedback to the user if needed
    }
  }, []);
  const handleShowScreenplay = async (index) => {
    try {
      const selectedStory = story[index];
      console.log('Selected Story:', selectedStory);
  
      
      const response = await axios.post('http://127.0.0.1:5000/generate_screenplay', {
        story: selectedStory,
      });
  
      const generatedScreenplay = response.data.screenplay;
      console.log('Generated Screenplay:', generatedScreenplay);
  
     
      setScreenplay(generatedScreenplay);
      const screenplayResponse =  await axios.post('http://localhost:5002/api/story/save_screenplay', {
      screenplay: generatedScreenplay,
    });
    console.log('Story saved in MongoDB:', screenplayResponse.data.message);
    } catch (error) {
      console.error('Error generating screenplay:', error);
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
    {!isStoryGenerated ?
     ( 
       <Col span={11} style={{ marginRight: '10px' }} className='boxshadow'>
        <div style={{ textAlign: 'center' }}>
          <h1>Create New Story</h1>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 60px' }}>
            <p style={{ marginTop: '5px', fontSize: '16px' }}>Select a Genre: </p>
            <Dropdown overlay={menu}>
              <Button >{selectedGenre} <DownOutlined /></Button>
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
            <div style={{padding:'0 40px'}}>
               <Input
                value={characterRelation}
                onChange={(e) => setCharacterRelation(e.target.value)}
                placeholder="Enter character relation/synopsis"
                style={{ marginBottom: 8 }}
              />
            </div>
            
          </div>
          <Button style={{width:'320px' , marginBottom:'30px'}}  type="primary" onClick={handleCreateStory}>
          Create
        </Button>

       
     
        </div>
       
        <div style={{ textAlign: 'center' }}>
          <h1>Continue with Existing</h1>
          <Upload fileList={fileList} onChange={handleFileChange} beforeUpload={() => false}>
            <Button style={{ marginBottom:'30px'}} icon={<UploadOutlined />}>Select Files</Button>
          </Upload>
          {/* Your content for continue with existing goes here */}
        </div>
      </Col>
      ) : null}
      {/* <Col span={11} style={{ marginRight: '10px' }} className='boxshadow'>
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        <h1 style={{ textAlign: 'center' }}>Generated Short Story</h1>
        {story && (
          <ol style={{ textAlign: 'initial' }}>
           
            {story.map((paragraph, index) => (
              <li key={index}>
                <div >
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                     {paragraph}
                  <Button
                    icon={<CopyOutlined />}
                    onClick={() => handleCopyParagraph(paragraph)}
                    style={{ marginTop: '10px' }}
                  >
                    Copy Text
                  </Button>
                  </div>
                  <Button
              style={{ marginBottom: '10px' }}
              type="primary"
              onClick={() => handleShowScreenplay(story.story)}
            >
              Show Screenplay
            </Button>
                 
                </div>
              </li>
            ))}
          </ol>
          
        )}
        
      </div>
    </Col> */}
  {isStoryGenerated ? (
     <Col span={22} style={{ marginRight: '10px' }} className="boxshadow">
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
        <h1 style={{ textAlign: 'center' }}>Generated Short Story</h1>
        {story && (
          <ol style={{ textAlign: 'initial' }}>
            {/* Map through the generated story array and render each element as a list item */}
            {story.map((paragraph, index) => (
              <li key={index}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {paragraph}
                    <Button
                      icon={<CopyOutlined />}
                      onClick={() => handleCopyParagraph(paragraph)}
                      style={{ marginTop: '10px' }}
                    >
                      Copy Text
                    </Button>
                  </div>
                  <Button
                    style={{ marginBottom: '10px' }}
                    type="primary"
                    onClick={() => handleShowScreenplay(index)}
                  >
                    Show Screenplay
                  </Button>
                </div>
              </li>
            ))}
          </ol>
        )}



{screenplay && (
              <Col span={22} style={{ marginRight: '10px', background: '#f5f5f5' }} className="boxshadow">
                <div style={screenplayStyle}>
                  <h2>Generated Screenplay</h2>
                  <pre>{screenplay}</pre>
                  
                </div>
                <Button
                style={{ marginTop: '10px' }}
                type="primary"
                onClick={handleCopyScreenplay}
              >
                Copy Entire Screenplay
              </Button>
              </Col>
            )}
          </div>
        </Col>
      ) : null}
    </Row>
  );
};



export default CreateSection;
