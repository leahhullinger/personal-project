import React, { Component } from "react";
import FileCard from "../../components/Card/FileCard/FileCard";
import { Thumbnail } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { axiosDeleteFile, axiosUpdateFile } from "../../ducks/actions";
import { EditFileForm } from "./file-edit";
import styles from "./folder-container.module.css";

class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFile: "",
      isEditId: "",
      notes: {
        title: "",
        date: "",
        notes: "",
        transcript: ""
      }
    };
  }

  onDeletFile = id => {
    axiosDeleteFile(id)
      .then(res => {
        this.props.dispatchDeleteFile(id);
      })
      .catch(err => console.log({ err }));
  };

  onInitiateEdit = file =>
    this.setState({
      isEditId: file.id,
      notes: {
        title: file.title,
        date: file.date,
        notes: file.notes,
        transcript: file.transcript
      }
    });

  onUpdateFile = id => {
    axiosUpdateFile(id, this.state.notes)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  handleInputUpdate = e =>
    this.setState({
      notes: { ...this.state.notes, [e.target.name]: e.target.value }
    });

  render() {
    const { folders, match, files, dispatchUpdateFile } = this.props;
    const folder =
      folders && folders.find(folder => folder.id === Number(match.params.id));
    const folderFiles =
      files && files.filter(file => file.folder_id === folder.id);
    const fileContent = folderFiles.find(f => f.id === this.state.activeFile);
    console.log(this.state);
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
                  <span className={styles.actionBar}>
                    <button
                      className={styles.actionLink}
                      onClick={() => this.onInitiateEdit(fileContent)}
                    >
                      edit
                    </button>
                    <button
                      className={styles.actionLink}
                      onClick={() => this.onDeletFile(fileContent.id)}
                    >
                      delete
                    </button>
                  </span>
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
          {fileContent && (
            <EditFileForm
              isOpen={this.state.isEditId === fileContent.id}
              handleClose={() => this.setState({ isEditId: "" })}
              onClick={() => this.onUpdateFile(this.state.isEditId)}
              notes={this.state.notes}
              onUpdateInput={this.handleInputUpdate}
            />
          )}
        </div>
      )
    );
  }
}

export default Folder;
