import { Route, Routes } from 'react-router-dom'
import { DefaultLaytour } from './layouts/DefaultLayout'

import { History } from './pages/History'
import { Home } from './pages/Home'

export const Router = () => (
  <Routes>
    <Route path="" element={<DefaultLaytour />}>
      <Route path="" element={<Home />} />
      <Route path="history" element={<History />} />
    </Route>
  </Routes>
)
