



import React, { useState } from 'react';
import { DesktopOutlined, FileOutlined, BookTwoTone, TeamOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import CreateSection from './Createstory';
import StoryHistory from './Storyhistory';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Create', '1', <BookTwoTone />),
  getItem('Continue', '2', <DesktopOutlined />),
  getItem('History', 'sub1', <UserOutlined />, [
    getItem('Story', '3'),
    getItem('Screenplay', '4'),
    getItem('favourite', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];
const HomePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1');
  const [response, setResponse] = useState(null); // State for the generated story

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleMenuClick = ({ key }) => {
    setSelectedMenuKey(key);
  };

  const handleCreateStory = async (selectedGenre, characters) => {
    try {
      const givenCharacters = characters.filter(Boolean).join(', ');
      console.log(`Write a story in ${selectedGenre} with the character names as ${givenCharacters}`);

      // Make a POST request to your Python backend with the selectedGenre and givenCharacters
      const response = await axios.post('http://127.0.0.1:5000/generate_story', {
        genre: selectedGenre,
        character_name: givenCharacters,
      });

      // Handle the response from the backend, which contains the generated story
      const generatedStory = response.data.story;
      setResponse(generatedStory); // Update the state with the generated story
    } catch (error) {
      // Handle any errors that may occur during the API call or response handling
      console.error('Error creating the story:', error);
      // You can also display an error message to the user if needed
    }
  };

  const getContentForMenuKey = (key) => {
    // You can define the content for each menu key here
    switch (key) {
      case '1':
        return <CreateSection response={response} handleCreateStory={handleCreateStory} />;
      case '2':
        return <div>
          <h1>computer</h1>
        </div>;
      case '3':
        return <StoryHistory key="story-history" />; // Display the StoryHistory component
      case '4':
        return 'Bill content goes here';
      case '5':
        return 'Alex content goes here';
      case '6':
        return 'Team 1 content goes here';
      case '8':
        return 'Team 2 content goes here';
      case '9':
        return 'Files content goes here';
      default:
        return 'Default content goes here';
    }
  };
  

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" selectedKeys={[selectedMenuKey]} mode="inline" onClick={handleMenuClick} items={items} />
      </Sider>
      <Layout>
      <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedMenuKey}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            {/* Render the content dynamically based on the selected menu key */}
            {getContentForMenuKey(selectedMenuKey)}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Digisailor ©2023 Created by Manoj Prabhakar</Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;


