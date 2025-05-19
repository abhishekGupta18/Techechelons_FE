import { lazy } from "react"
import { Route, Routes } from "react-router-dom"

const Body = lazy(() => import("./pages/Body"))
const Projects = lazy(() => import("./pages/Projects"))

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>

          <Route path="/" element={<Projects />} />

        </Route>
      </Routes>
    </>
  )
}

export default App
