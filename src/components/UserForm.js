import React, { useState } from 'react';

const UserForm = ({ initialData, onSubmit, onCancel }) => {
  // Initialize the form with the provided initial data or an empty values
  const [formData, setFormData] = useState(
      initialData || {
        name: '',
        username: '',
        email: '',
        phone: '',
        website: '',
        address: {
          street: '',
          city: '',
        },
        company: {
          name: '',
        },
      }
    );
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      // Here it checks nested fields and sets the form data
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        setFormData({
          ...formData,
          [parent]: { ...formData[parent], [child]: value },
        });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <form className="user-form" onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required />
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
        <input name="website" value={formData.website} onChange={handleChange} placeholder="Website" required />
        <input name="address.street" value={formData.address.street} onChange={handleChange} placeholder="Street" />
        <input name="address.city" value={formData.address.city} onChange={handleChange} placeholder="City" />
        <input name="company.name" value={formData.company.name} onChange={handleChange} placeholder="Company Name" />
        <div className="form-btns">
          <button type="submit" className="save-btn">Save</button>
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    );
  };
  
  export default UserForm;
  