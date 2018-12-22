import React, { Component } from "react";
import FileCard from "../../components/Card/FileCard/FileCard";
import { Thumbnail } from "react-bootstrap";
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
    const fileContent = folderFiles.find(f => f.id === this.state.activeFile);
    return (
      !!folder && (
        <div className={styles.foldercontainer}>
          <div className={styles.wrapper}>
            <div className={styles.filesList}>
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
            <div className={styles.fileContent}>
              {fileContent && (
                <React.Fragment>
                  <div className={styles.contentInner}>
                    <Thumbnail
                      src={fileContent.s3_url}
                      className={styles.thumb}
                    />
                    <div className={styles.notes}>
                      <dl>
                        <span className={styles.row}>
                          <dt>File title:</dt>
                          <dd>{fileContent.title}</dd>
                        </span>
                        <dt>Image Transcript</dt>
                        <dd>{fileContent.transcript}</dd>
                        <dt>Date</dt>
                        <dd>{fileContent.date}</dd>
                        <dt>Notes</dt>
                        <dd>{fileContent.notes}</dd>
                      </dl>
                    </div>
                  </div>
                </React.Fragment>
              )}
            </div>
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
