import React, {useState} from 'react';
import Navigation from './Navigation'; 
import {Link} from 'react-router-dom';
import { isAuthenticated, createCategory } from './apiCore';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const {user, token} = isAuthenticated();

  const handleChange = (event) => {
    setError('');
    setName(event.target.value);
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    // make api call to end-point
    createCategory(user._id, token, {name})
    .then(data => {
      if(data.error) {
        setError(true)
      } else {
        setError('');
        setSuccess(true);
      }
    })
  }

  const showSuccess = () => {
    if(success) {
      return <h3 className="text-success">La categoria "{name}" ah sido creada</h3>
    }
  }

  const showError = () => {
    if (error) {
      return <h3 className="text-danger">"{name}" debería ser único, prueba con otro</h3>
    }
  }

  const newCategoryFrom = () => (
    <div>
      <h2>Agregar nueva Categoriay</h2>
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Nombre</label>
          <input type="text" className="form-control"
            onChange={handleChange} value={name} required autoFocus/>
        </div>
        <button className="btn btn-outline-success">
          Crear Categoria
        </button>
      </form>
    </div>
  )

  const goBack = () => (
    <div className="mt-5">
      <Link to="/" className="text-warning">
        Volver atras
      </Link>
    </div>
  );

  return (
    <>
      <Navigation/>
      <div className="mt-5 container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {newCategoryFrom()}
            {goBack()}
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCategory;