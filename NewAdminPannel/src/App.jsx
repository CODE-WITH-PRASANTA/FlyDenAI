import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './Layout/MainLayout/MainLayout'
import Dashboard from './Pages/Dashboard/Dashboard'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Dashboard />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App