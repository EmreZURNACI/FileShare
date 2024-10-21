import FileForm from "./Components/Files/FileForm";
import GetFiles from "./Components/Files/GetFiles";
import Files from "./Components/Files/Files";

import Auth from "./Components/Auth/Auth";

import NotFound from "./Components/Utils/NotFound";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const { isAuth } = useSelector((state) => state.FormReducer);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" replace />} />
        <Route
          path="/auth"
          element={isAuth ? <Navigate to="/files" /> : <Auth />}
        />
        <Route path="/files" element={<Files />}>
          <Route path="uploadfiles" index element={<FileForm />} />
          <Route path="getfiles" element={<GetFiles />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
