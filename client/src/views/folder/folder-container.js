import React, { Component } from "react";
import FileCard from "../../components/Card/FileCard/FileCard";
import styles from "./folder-container.module.css";

class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      files: []
    };
  }

  render() {
    const { folders, match, files } = this.props;
    const folder = folders.find(
      folder => folder.id === Number(match.params.id)
    );
    const folderFiles = files.filter(file => file.folder_id === folder.id);
    return (
      !!folder && (
        <div className={styles.foldercontainer}>
          <h2>{folder.folder_name}</h2>
          <div>
            {folderFiles.map(file => {
              return (
                <FileCard key={file.id} date={file.date} notes={file.notes} />
              );
            })}
          </div>
        </div>
      )
    );
  }
}

export default Folder;
