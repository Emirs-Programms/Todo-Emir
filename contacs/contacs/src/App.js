import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dob, izm, udalit } from './contactsSlice';
import './index.css';

function App() {
  const contacts = useSelector((state) => state.contacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [change, setChange] = useState(null);
  const [important, setImportant] = useState(null);
  const [deletedContact, setDeletedContact] = useState(null);
  const [fadeOut, setFadeOut] = useState(null);

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (change) {
      dispatch(izm({ id: change, name }));
    } else {
      dispatch(dob({ id: Date.now(), name }));
    }
    setName('');
    setChange(null);
  };

  const handleEdit = (contact) => {
    setChange(contact.id);
    setName(contact.name);
  };

  const handleDelete = (contactId) => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить это задание?");
    if (confirmDelete) {
      setDeletedContact(contactId);
      setFadeOut(contactId);
      setTimeout(() => {
        dispatch(udalit(contactId));
        setDeletedContact(null);
      }, 500); // Время должно соответствовать длительности анимации
    }
  };

  const toggleImportant = (contactId) => {
    setImportant(important === contactId ? null : contactId);
  };

  return (
    <div className="App">
      <div className="form">
        <h1 className='title'>Я эмир</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите задание"
        />
        <button onClick={handleSubmit}>
          {change ? 'Изменить' : 'Добавить'}
        </button>
      </div>

      <ul className="contact-list">
        {contacts.map((contact) => (
          <li
            key={contact.id}
            className={`${contact.id === important ? 'important' : ''} ${fadeOut === contact.id ? 'fade-out' : ''}`}
          >
            <span style={{ color: contact.id === important ? '#e65100' : 'black' }}>
              {contact.name} {important === contact.id && '❗️'}
            </span>
            <div className="button-group">
              <button onClick={() => handleEdit(contact)}>ИЗМЕНИТЬ</button>
              <button 
                className="delete-button" 
                onClick={() => handleDelete(contact.id)}
                title="Удалить контакт"
              >
                🗑
              </button>
              <button onClick={() => toggleImportant(contact.id)}>
                {important === contact.id ? 'НЕ ВАЖНАЯ' : 'ВАЖНАЯ'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
