import React, { Component } from "react";
import FileCard from "../../components/Card/FileCard/FileCard";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import styles from "./folder-container.module.css";

class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFile: ""
    };
  }

  render() {
    const { folders, match, files } = this.props;
    const folder =
      folders && folders.find(folder => folder.id === Number(match.params.id));
    const folderFiles =
      files && files.filter(file => file.folder_id === folder.id);
    return (
      !!folder && (
        <div className={styles.foldercontainer}>
          <div className={styles.wrapper}>
            <h2>{folder.folder_name}</h2>
            <h4 className={styles.subhead}>Uploads</h4>
            {folderFiles.map(file => {
              return (
                <p
                  className={styles.link}
                  key={file.id}
                  onClick={() => this.setState({ activeFile: file.id })}
                >
                  {file.title}
                </p>
              );
            })}
          </div>
          <div className={styles.footer}>
            <Link to="/dash">
              <Button>Back</Button>
            </Link>
          </div>
        </div>
      )
    );
  }
}

export default Folder;
