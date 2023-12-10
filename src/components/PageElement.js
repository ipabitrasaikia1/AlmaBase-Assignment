import '../App.css'

const PageElement = ({index, showBorder, setBorderindex, element, onSelect,onDelete, setShowModal, showModal}) => {
 
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


  return element.type === 'input' ?  <element.type
  className={`page-element ${showBorder ? 'selected' : ''} input-element`}
  style={style}
  draggable
  onDragStart={handleDragStart}
  onClick={handleElementClick}
  onContextMenu={handleContextMenu}
  onKeyDown={handleEnterKey}
  tabIndex="0"
  value={element.text}
  onChange={(e) => e.target.value }
  />
 : ( 
    <element.type
      className={`page-element ${showBorder ? 'selected' : ''}`}
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
  );
};

export default PageElement;
