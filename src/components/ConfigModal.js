import { useState, useEffect } from 'react';
import '../App.css'

const ConfigModal = ({ element, onUpdate, onDelete, setShowModal }) => {
  const [config, setConfig] = useState({type:null, x: 0, y: 0, text: '', fontSize: '', fontWeight: '' });

  useEffect(() => {
    if (element) {
      setConfig({
        type: element.type,
        x: element.x,
        y: element.y,
        text: element.text || '', // Add text property
        fontSize: element.fontSize || '', // Add fontSize property
        fontWeight: element.fontWeight || '', // Add fontWeight property
      });
    }
  }, [element]);

  const handleSave = () => {
    onUpdate(config);
  };


  return (
    <div className="config-modal">
      {element && (
        <div className='config-modal-input'>
          <div className='edit-lebel'>
             <h1> Edit {element.type}</h1>  <h2 onClick={() => setShowModal(false)}>❌</h2>
          </div>
          <label>Text:</label>
          <input
            type="text"
            value={config.text ?  config.text : setConfig({ ...config, text: "This is a "+element.type  })}
            onChange={(e) => setConfig({ ...config, text: e.target.value  })}
          />
          <label>X:</label>
          <input
            type="number"
            value={config.x}
            onChange={(e) => setConfig({ ...config, x: Number(e.target.value) })}
          />
          <label>Y:</label>
          <input
            type="number"
            value={config.y}
            onChange={(e) => setConfig({ ...config, y: Number(e.target.value) })}
          />
          <label>Font Size:</label>
          <input
            type="text"
            value={config.fontSize}
            onChange={(e) => setConfig({ ...config, fontSize: e.target.value })}
          />
          <label>Font Weight:</label>
          <input
            type="text"
            value={config.fontWeight}
            onChange={(e) => setConfig({ ...config, fontWeight: e.target.value })}
          />
          <button onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default ConfigModal;
