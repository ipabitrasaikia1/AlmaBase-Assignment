import  { useState, useEffect } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Page from "./components/Page";
import ConfigModal from "./components/ConfigModal";

const App = () => {
  const [elements, setElements] = useState(
    () => JSON.parse(localStorage.getItem("elements")) || []
  );
  const [selectedElement, setSelectedElement] = useState(null);
  const [elementCounter, setElementCounter] = useState(() => {
    if (JSON.parse(localStorage.getItem("elements")))
      return JSON.parse(localStorage.getItem("elements")).length;
    else return 0;
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("elements", JSON.stringify(elements));
  }, [elements]);

  const handleElementSelect = (element) => {
    setSelectedElement(element);
  };

  const handleElementUpdate = (config) => {
    const updatedElements = elements.map((el) =>
      el.id === selectedElement.id ? { ...el, ...config } : el
    );

    setElements(updatedElements);

    setSelectedElement(null);
    setShowModal(false);
  };

  const handleElementDelete = (item = selectedElement) => {
    const updatedElements = elements.filter((el) => el.id !== item.id);
    setElements(updatedElements);
    setSelectedElement(null);
  };

  return (
    <div>
      {selectedElement && showModal && (
        <div className="backDrop">
          <ConfigModal
            element={selectedElement}
            onUpdate={handleElementUpdate}
            onDelete={handleElementDelete}
            setShowModal={setShowModal}
          />
        </div>
      )}
      <div className="app-container">
        <Page
          elements={elements}
          onSelect={handleElementSelect}
          onDelete={handleElementDelete}
          setElements={setElements}
          elementCounter={elementCounter}
          setElementCounter={setElementCounter}
          setShowModal={setShowModal}
          showModal={showModal}
        />
        <Sidebar />
      </div>
    </div>
  );
};

export default App;
