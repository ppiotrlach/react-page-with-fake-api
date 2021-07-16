import './App.css';
import GetAllPostsView from './GetAllPostsView'
import CreatePostView from './CreatePostView'
import {useState} from 'react'
import { Button } from 'antd'

function App() {

  const [isViewOnGet, setIsViewOnGet] = useState(true);

  const handleChangeToGet = () => setIsViewOnGet(true);
  const handleChangeToCreate = () => setIsViewOnGet(false);


  return (
    <div className="App">
      <br></br>
      <Button onClick={handleChangeToGet}>show posts</Button>
      <Button onClick={handleChangeToCreate}>add post</Button>
      <br></br>
      <br></br>
      <br></br>
      {isViewOnGet ? <GetAllPostsView /> : <CreatePostView />}
    </div>
  );
}

export default App;
