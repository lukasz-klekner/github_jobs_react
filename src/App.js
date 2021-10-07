import { useState } from 'react'
import { Container } from 'react-bootstrap'

import './App.css'
import Job from './components/Job'
import useFetchJobs from './hooks/useFetchJobs'

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { jobs, loading, error } = useFetchJobs(params, page)
  return (
    <div className='App'>
      <Container className='my-4'>
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error</h1>}
        {jobs.map((job) => (
          <Job key={job.id} job={job} />
        ))}
      </Container>
    </div>
  )
}

export default App
