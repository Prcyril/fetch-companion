import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import NavBar from './components/NavBar'
import MobileShell from './components/MobileShell'
import HomeScreen from './screens/HomeScreen'
import TimelineScreen from './screens/TimelineScreen'
import EventDetailScreen from './screens/EventDetailScreen'
import AddEventScreen from './screens/AddEventScreen'
import ProfileScreen from './screens/ProfileScreen'

function AppRoutes() {
  const location = useLocation()
  const isDetail = location.pathname.startsWith('/event/')
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/timeline" element={<TimelineScreen />} />
        <Route path="/event/:id" element={<EventDetailScreen />} />
        <Route path="/add" element={<AddEventScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <MobileShell>
        <AppRoutes />
        <NavBar />
      </MobileShell>
    </BrowserRouter>
  )
}
