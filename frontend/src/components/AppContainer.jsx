function AppContainer({ children }) {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {children}
    </div>
  );
}

export default AppContainer;