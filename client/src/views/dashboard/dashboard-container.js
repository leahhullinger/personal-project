// MAIN DASHBOARD
import React, { Component } from "react";
// import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import FileCard from "../../components/Card/FileCard/FileCard";
import NewFolder from "../../components/Form/NewFolder/NewFolder";
import styles from "./dashboard-container.module.css";
import { authenticateUser } from "../../ducks/actions";

// import { onGetFolders } from "../../ducks/actions";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      folders: []
    };
  }

  componentDidMount() {
    axios.get("/api/folders").then(response => {
      this.setState({ folders: response.data });
    });
  }

  onNewFolderClick = () => {
    axios.post("/api/add/folder", { name: "my test folder" }).then(response => {
      console.log(response);
    });
  };
  render() {
    return (
      <div className={styles.container}>
        <h3>Dashboard</h3>
        <div className={styles.body}>
          <div>
            <h4>Recent Activity</h4>
            <p>5 most recent files </p>
          </div>
          <div>
            <Link to="/upload">
              <h2>+ UPLOAD </h2>
            </Link>
            <NewFolder />
          </div>
        </div>
        <div>
          <h2>Folders</h2>
          {this.state.folders.map(folder => {
            return (
              <div key={folder.id}>
                <Link to={`/folder/${folder.id}`}>{folder.folder_name}</Link>
              </div>
            );
          })}
        </div>
        <div style={{ backgroundColor: "#a87a2f" }}>
          <Link to="/folder">
            <h2>+ UPLOAD </h2>
          </Link>
        </div>
        {/* <UploadDash />
      <FolderDash /> */}
      </div>
    );
  }
}
// const mapStateToProps = state => {
//   return {
//     folders: state.folders,
//     files: state.files
//   };
// };

// export default connect(
//   mapStateToProps,
//   { onGetFolders }
// )(Dashboard);

export default Dashboard;
