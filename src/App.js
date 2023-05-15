// import logo from './logo.svg';
import { useState,useEffect,useRef } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import EditIcon from '@mui/icons-material/Edit';

function App() {
  const [item,setItem]=useState('');
  const [listData, setListData] = useState(JSON.parse(localStorage.getItem('todolist'))||[]);

  const [editIndex,setEditIndex]=useState(null);
  const [editText,setEditText]=useState('');
const inputRef =useRef();
// !ADD ITEM
  const addItem = (e)=>{
    e.preventDefault();
    setListData((listData)=>{
    const updatedList = [...listData,item]
    setItem('');
    console.log(updatedList);
    localStorage.setItem('todolist', JSON.stringify(updatedList));
    return updatedList;
    })
    
  }

  // !REMOVE ITEM

  const removeItem = (i)=>{
    const updatedList = listData.filter((ele,j)=>{
      return i!==j;
    });
    localStorage.setItem('todolist', JSON.stringify(updatedList));
    setListData(updatedList);
  }

  // !UPDATE ITEM 

  const updateItem = (e,i)=>{
    e.preventDefault();
    const updatedList = [...listData];
    updatedList[i] = editText;
    setListData(updatedList);
    setEditIndex(null);
    localStorage.setItem('todolist', JSON.stringify(updatedList));
    
  }

  // !LOAD DATA FROM THE LOCAL STORAGE

  useEffect(() => {
  const LocalStorageStoredData = localStorage.getItem('todolist');
  if(LocalStorageStoredData){
    setListData(JSON.parse(LocalStorageStoredData));
  }
  setItem(''); // Initialize item to empty string
}, []);

  // ! SAVE DATA IN LOCAL STORAGE
// *WHENEVER THE LISTDATA WILL CHANGE IT WILL UDPATED IN LOCAL STORAGE
// useEffect(() => {
//   const localStorageData = localStorage.getItem('todolist');

//   if(localStorageData){

//     localStorage.setItem('todolist', JSON.stringify(listData));
//   }else{
//     localStorage.setItem('todolist', []);
//   }
// }, [listData]);

  // !RETURN COMPONENT
  return (
    <div className="todo_list_main_container">
      <h1 className="todo_list_header">Todo List Application</h1>
      <form method='POST' className='input_form' onSubmit={addItem}>
        <input required autoFocus type="text" ref={inputRef} name="item_input" value={item} id="item_input" placeholder='Add Item' onChange={(e)=>setItem(e.target.value)} />
        <button type="submit" onClick={()=>{inputRef.current.focus()}}>Add Item <AddOutlinedIcon/></button>
      </form>
      <ul className="list_container">
      {
        listData.map((data,i)=>{
          return(
            <li key={i} className="list">
              {editIndex ===i?(
              <form  method='POST' className='edit_form' onSubmit={(e)=>{updateItem(e,i,editText)}}>
                <input type="text" autoFocus name="edit_input" id="edit_input" value={editText} onChange={(e)=>{setEditText(e.target.value)}} onBlur={(e)=>{updateItem(e,i,editText)}} />
              </form>
              ):(data)}
              <div className="button_container">
                <button onClick={()=>{removeItem(i)}}>
              <DeleteForeverIcon />
              </button> 
              {!editIndex && (
              <button onClick={() => {setEditIndex(i); setEditText(listData[i])}}><EditIcon/></button>
            )}
              </div>
            </li>)
        })
      }
      </ul>
    </div>
  );
}

export default App;
