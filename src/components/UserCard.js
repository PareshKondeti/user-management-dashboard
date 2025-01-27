const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    /* Displaying the user details*/
      <div className="user-card">
        <h3>{user.name}</h3>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Website: {user.website}</p>
        <p>Address: {user.address.street}, {user.address.city}</p>
        <p>Company: {user.company.name}</p>
        <div className="card-btns">
          <button className="edit-btn" onClick={onEdit}>Edit</button>
          <button className="delete-btn" onClick={onDelete}>Delete</button>
        </div>
      </div>
    );
  };
  
  export default UserCard;
  