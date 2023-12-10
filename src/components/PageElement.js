import '../App.css'
import { useState } from 'react';
const PageElement = ({index, showBorder, setBorderindex, element, onSelect,onDelete, setShowModal}) => {
 const [text, setText] = useState(() => element.text)
  const handleDragStart = (event) => {
    event.dataTransfer.setData('text/plain', element.id.toString());
  };

  const handleElementClick = () => {
    setBorderindex(index)
  };

  const handleContextMenu = () => {
    onSelect(element);
    setShowModal(true)
  };


  const style = {
    left: element.x,
    top: element.y,
    fontSize: element.fontSize,
    fontWeight: element.fontWeight,
  };
  const indicatorStyle = {
    left: element.x,
    top: element.y - 50,
    fontSize: element.fontSize,
    fontWeight: element.fontWeight,
  }

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      setBorderindex(null)
      handleContextMenu()
    } else if (e.key === "Delete") {
      onSelect(element);
      setShowModal(false)
      onDelete(element)
    }
  }


  return <div>
    <div className= {`page-element  ${showBorder ? 'selected' : 'hidden'} indicator `}   style={indicatorStyle}>
      This is a {element.type}
    </div>
  {element.type === 'input' ?  <element.type
  className={`page-element ${showBorder ? 'selected' : ''} input-element`}
  style={style}
  draggable
  onDragStart={handleDragStart}
  onClick={handleElementClick}
  onContextMenu={handleContextMenu}
  onKeyDown={handleEnterKey}
  tabIndex="0"
  value={text}
  onChange={(e) => setText(e.target.value) }
  />
 : ( 
    <element.type
      className={`page-element ${showBorder ? 'selected' : ''} ${element.type=== 'button' ? 'btn' : ''}`}
      style={style}
      draggable
      onDragStart={handleDragStart}
      onClick={handleElementClick}
      onContextMenu={handleContextMenu}
      onKeyDown={handleEnterKey}
      tabIndex="0"
    >
      {element.text}
    </element.type>
  )} 
  </div> 
};

export default PageElement;
