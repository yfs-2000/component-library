import React, { useEffect, useState } from "react";

const App = () => {
  const [state, setState] = useState<boolean>(false);
  useEffect(() => {
    console.log(state);
  }, []);
  return <div>123456678</div>;
};

export default App;
