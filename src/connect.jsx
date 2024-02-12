import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home.jsx'
import SubmitProposal from './pages/SubmitProposal'
import ProcessProposal from './pages/ProcessProposal'
import CheckVotes from './pages/CheckVotes.jsx'


export default function connect({instance , balance, address}) {
    return (
        <div>
            <Router>
                <NavBar />
                <Routes>
                    <Route path='/' element={<Home balance={balance} address={address} aeSdk={instance} />} />
                    <Route path='/Submit' element={<SubmitProposal aeSdk={instance} />} />
                    <Route path='/Process' element={<ProcessProposal aeSdk={instance}/>} />
                    <Route path='/votes' element={<CheckVotes aeSdk={instance} />} />
                </Routes>
            </Router>
        </div>
    )
}
