import React from "react";


export const DeckForm = ({ formData, handleChange, handleSubmit, onCancel }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name="name" 
                    placeholder="Deck Name" 
                    required={true}
                    onChange={handleChange} 
                    value={formData.name} 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea 
                    className="form-control" 
                    id="description" 
                    name="description" 
                    rows="3" 
                    placeholder="Brief description of the deck" 
                    required={true}
                    onChange={handleChange} 
                    value={formData.description} 
                />
            </div>
            <div>
                <button type="button" onClick={onCancel} className="btn btn-secondary  mb-3">Cancel</button>
                <button type="submit" className="btn btn-primary  mb-3" style={{marginLeft: "10px"}}>Submit</button>
            </div>
        </form>
    );
};

export default DeckForm;
