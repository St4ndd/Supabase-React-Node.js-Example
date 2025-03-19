import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../helper/supabaseClient";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(new Date());
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    fetchFiles();
    return () => clearInterval(timer);
  }, []);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('files')
        .list();
      if (error) throw error;
      setFiles(data || []);
    } catch (error) {
      console.error('Error fetching files:', error.message);
    }
  };

  const uploadFile = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;


      const { error } = await supabase.storage
        .from('files')
        .upload(fileName, file);

      if (error) throw error;
      fetchFiles();
    } catch (error) {
      console.error('Error uploading file:', error.message);
    } finally {
      setUploading(false);
    }
  };

  const downloadFile = async (fileName) => {
    try {
      const { data, error } = await supabase.storage
        .from('files')
        .download(fileName);
      
      if (error) throw error;

      // Create URL for downloaded file
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error.message);
    }
  };

  const deleteFile = async (fileName) => {
    try {
      const { error } = await supabase.storage
        .from('files')
        .remove([fileName]);
      
      if (error) throw error;
      fetchFiles();
    } catch (error) {
      console.error('Error deleting file:', error.message);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    navigate("/login");
  };

  const menuItems = [
    { icon: "dashboard", text: "Dashboard", active: true },
    { icon: "folder", text: "Storage", route: "/storage" },
    { icon: "group", text: "Benutzer" },
    { icon: "settings", text: "Einstellungen" },
    { icon: "message", text: "Nachrichten" },
  ];

  const [selectedPage, setSelectedPage] = useState('dashboard');

  const renderContent = () => {
    switch(selectedPage) {
      case 'storage':
        return (
          <div className="storage-container">
            <div className="storage-header">
              <h2>Storage</h2>
              <label className="upload-btn">
                <span className="material-icons">upload</span>
                <span>Upload File</span>
                <input
                  type="file"
                  onChange={uploadFile}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
            <div className="files-grid">
              {files.map((file) => (
                <div key={file.name} className="file-card">
                  <div className="file-icon">
                    <span className="material-icons">
                      {file.name.match(/\.(jpg|jpeg|png|gif)$/i) ? 'image' : 
                       file.name.match(/\.(pdf)$/i) ? 'picture_as_pdf' : 
                       file.name.match(/\.(doc|docx)$/i) ? 'description' : 
                       'insert_drive_file'}
                    </span>
                  </div>
                  <div className="file-info">
                    <p className="file-name">{file.name}</p>
                    <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <div className="file-actions">
                    <button onClick={() => downloadFile(file.name)}>
                      <span className="material-icons">download</span>
                    </button>
                    <button onClick={() => deleteFile(file.name)}>
                      <span className="material-icons">delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <>
            <div className="welcome-card">
              <div>
                <h1>Willkommen zurück</h1>
                <p className="datetime">
                  {time.toLocaleDateString()} - {time.toLocaleTimeString()}
                </p>
              </div>
              <button className="new-project-btn">
                <span className="material-icons">add</span>
                Neues Projekt
              </button>
            </div>

            <div className="dashboard-grid">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="dashboard-card">
                  <div className="card-header">
                    <div className="card-icon">
                      <span className="material-icons">pie_chart</span>
                    </div>
                    <button className="card-menu">
                      <span className="material-icons">more_vert</span>
                    </button>
                  </div>
                  <h3>Widget {item}</h3>
                  <p>Hier steht eine Beschreibung für Widget {item}</p>
                </div>
              ))}
            </div>
          </>
        );
    }
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-header">
            <div className="logo-container">
              <div className="logo">
                <span className="material-icons">view_in_ar</span>
              </div>
              <span className="logo-text">Dashboard</span>
            </div>
          </div>

          <nav className="sidebar-nav">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`nav-item ${selectedPage === item.text.toLowerCase() ? "active" : ""}`}
                onClick={() => setSelectedPage(item.text.toLowerCase())}
              >
                <span className="material-icons">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
            <div className="nav-item logout" onClick={signOut}>
              <span className="material-icons">logout</span>
              <span>Abmelden</span>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="main-content">
          <header className="main-header">
            <div className="header-left">
              <div className="search-container">
                <span className="material-icons">search</span>
                <input type="search" placeholder="Suchen..." />
              </div>
            </div>

            <div className="header-right">
              <button
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
              >
                <span className="material-icons">
                  {darkMode ? "light_mode" : "dark_mode"}
                </span>
              </button>
              <div className="notifications">
                <span className="material-icons">notifications</span>
                <span className="notification-badge"></span>
              </div>
              <div className="user-profile">
                <span className="material-icons">person</span>
              </div>
            </div>
          </header>

          <div className="breadcrumb">
            <span>Dashboard</span>
            <span className="material-icons">chevron_right</span>
            <span>{selectedPage.charAt(0).toUpperCase() + selectedPage.slice(1)}</span>
          </div>

          <div className="dashboard-content">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;