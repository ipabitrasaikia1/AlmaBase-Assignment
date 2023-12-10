import { useState, useRef } from 'react';
import '../App.css'
import PageElement from './PageElement';

const Page = ({ elements, onSelect, onDelete, setElements, setElementCounter, elementCounter, setShowModal, showModal}) => {
  const pageRef = useRef()

  const [borderindex, setBorderindex] = useState(null)
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    const droppedElementId = event.dataTransfer.getData('text/plain');
    const droppedElement = elements.find((element) => element.id.toString() === droppedElementId);

    if (droppedElement) {
      const { clientX, clientY } = event;
      const rect = pageRef.current.getBoundingClientRect();
      let x = clientX - rect.left ;
      let y = clientY - rect.top;
      onSelect({ ...droppedElement, x, y });
      setShowModal(true)
    } else {
      const { clientX, clientY } = event;
      const rect = pageRef.current.getBoundingClientRect();
      let x = clientX - rect.left;
      let y = clientY - rect.top;

      const newElement = {
        id: Math.floor(Math.random()*1000),
        type: droppedElementId,
        x: x,
        y: y,
      };
      setElements( (pre ) => [...pre, newElement]);
      setElementCounter(elementCounter + 1);
      onSelect(newElement)
      setShowModal(true)
    }
    setBorderindex(null)
  };
 
  return (
    <div className="page" ref={pageRef} onDragOver={handleDragOver} onDrop={handleDrop}>
      {elements.map((element) => (
        <PageElement
          key={element.id}
          index={element.id}
          showBorder={element.id === borderindex ? true : false}
          setBorderindex={(e) =>  setBorderindex(e)}
          element={element}
          onSelect={onSelect}
          onDelete={onDelete}
          setShowModal={setShowModal}
          showModal={showModal}
        />
      ))}
    </div>
  );
};

export default Page;
