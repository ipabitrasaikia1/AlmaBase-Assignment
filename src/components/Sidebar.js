import '../App.css'

const Sidebar = () => {
  const handleDragStart = (event, elementType) => {
    event.dataTransfer.setData('text/plain', elementType);
  };

  return (
    <div className="sidebar">
      <div
        className="sidebar-element"
        draggable
        onDragStart={(e) => handleDragStart(e, 'label')}
      >
        Label
      </div>
      <div
        className="sidebar-element"
        draggable
        onDragStart={(e) => handleDragStart(e, 'input')}
      >
        Input
      </div>
      <div
        className="sidebar-element"
        draggable
        onDragStart={(e) => handleDragStart(e, 'button')}
      >
        Button
      </div>
    </div>
  );
};

export default Sidebar;
