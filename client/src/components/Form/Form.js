// template form for newUploadForm, newUserForm
// redux
import React from "react";
import styles from "./Form.module.css";

export const Form = ({
  notes,
  onUpdateInput,
  folders,
  isEdit = false,
  isEditTranscript
}) => {
  const noteText = notes.text || notes.notes;
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
        {!isEdit && (
          <label>
            Add to folder:
            <select
              placeholder="Add To Folder:"
              value={notes.folder_id}
              name="folder_id"
              onChange={onUpdateInput}
            >
              <option value={0} disabled>
                choose folder
              </option>
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
        )}

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
          <textarea value={noteText} name="text" onChange={onUpdateInput} />
        </label>
      </span>
    </div>
  );
};
