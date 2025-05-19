import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const Body = lazy(() => import("./pages/Body"))
const Projects = lazy(() => import("./pages/Projects"))
const AddProject = lazy(() => import("./pages/AddProject"))

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>

          <Route path="/" element={<Projects />} />
          <Route path="/addProject" element={<AddProject />} />


        </Route>
      </Routes>
    </>
  )
}

export default App
