import React from "react";

export default function NotFound() {
  document.title = "Page Not Found";

  return (
    <div className="app " style={{ display: "flex", justifyContent: "center", padding: "0.5em" }}>
      <div
        style={{
          padding: "2em",
          width: "100%",
          maxWidth: "640px",
          backgroundColor: "#fff",
          borderRadius: "4px",
          marginTop: "4em",
          fontSize: "1.2em"
        }}
      >
        <div style={styles.logo}>
          <span style={styles.logoSmall}>ATM</span>
          <span style={styles.logoBig}>All Test Maker</span>
        </div>
        <h3 className="mb-3" style={{letterSpacing: "1px"}}>Error 404: Page Not Found</h3>
        <p className="text-gray">The page you are looking for does not exist or moved somewhere else. You can either return to the previous page or visit our homepage.</p>
        
      </div>
    </div>
  );
}


const styles = {
  logo: {
    display: "flex", 
    cursor: "default", 
    alignItems: "center", 
    lineHeight: 1, 
    fontSize: "20px", 
    marginBottom: "1em", 
    paddingBottom: "0.6em"
  },
  logoSmall: {
    color: "#06f",
    fontWeight: 700,
    borderRight: "2px solid",
    paddingRight: "0.5em"
  },
  logoBig: {
    paddingLeft: "0.6em",
    color: "#555",
    fontWeight: 500,
    fontSize: "18px",
    letterSpacing: "1px"
  }
};
