// template form for newUploadForm, newUserForm
// redux
import React from "react";
import styles from "./Form.module.css";

export const Form = ({ notes, onUpdateInput }) => {
  return (
    <div className={styles.form}>
      <span className={styles.row}>
        <label>
          Add to folder:
          <select
            placeholder="Add To Folder:"
            value={notes.folder || ""}
            name="folder"
            onChange={onUpdateInput}
          >
            <option value="default">default</option>
          </select>
        </label>

        <label>
          Add date:
          <input
            type="date"
            name="date"
            value={notes.date}
            placeholder="Date"
            onChange={onUpdateInput}
          />
        </label>
      </span>

      <span className={styles.row}>
        <label>
          Add notes:
          <textarea value={notes.text} name="text" onChange={onUpdateInput} />
        </label>
      </span>
    </div>
  );
};
