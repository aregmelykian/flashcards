import React from "react";


export const DeckForm = ({ formData, handleChange, handleSubmit, onCancel, cancelButtonName }) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="front" className="form-label">Front</label>
                <textarea 
                    className="form-control" 
                    id="front" 
                    name="front" 
                    rows="3" 
                    placeholder="Front side of the card" 
                    required={true}
                    onChange={handleChange} 
                    value={formData.front} 
                />
            </div>
            <div className="mb-3">
                <label htmlFor="back" className="form-label">Back</label>
                <textarea 
                    className="form-control" 
                    id="back" 
                    name="back" 
                    rows="3" 
                    placeholder="Back side of the card" 
                    required={true}
                    onChange={handleChange} 
                    value={formData.back} 
                />
            </div>
            <div>
                <button type="button" onClick={onCancel} className="btn btn-secondary  mb-3">{cancelButtonName}</button>
                <button type="submit" className="btn btn-primary  mb-3" style={{marginLeft: "10px"}}>Save</button>
            </div>
        </form>
    );
};

export default DeckForm;
