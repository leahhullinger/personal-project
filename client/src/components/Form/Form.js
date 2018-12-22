// template form for newUploadForm, newUserForm
// redux
import React from "react";
import styles from "./Form.module.css";

export const Form = ({ notes, onUpdateInput, folders }) => {
  return (
    <div className={styles.form}>
      <span className={styles.row}>
        <label>
          Title
          <input
            type="text"
            name="title"
            value={notes.title}
            onChange={onUpdateInput}
          />
        </label>
      </span>
      <span className={styles.row}>
        <label>
          Add to folder:
          <select
            placeholder="Add To Folder:"
            value={notes.folder || ""}
            name="folder"
            onChange={onUpdateInput}
          >
            {folders &&
              folders.length < 1 && (
                <option key={0 + "add_folder"} value={0}>
                  + add folder
                </option>
              )}
            {folders &&
              folders.map(folder => (
                <option
                  key={folder.id}
                  value={folder.id}
                  onClick={() => console.log(folder.id)}
                >
                  {folder.folder_name}
                </option>
              ))}
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
