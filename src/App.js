import { useState } from 'react'
import { Container } from 'react-bootstrap'

import './App.css'
import Job from './components/Job'
import JobsPagination from './components/JobsPagination'
import useFetchJobs from './hooks/useFetchJobs'

function App() {
  const [params, setParams] = useState({})
  const [page, setPage] = useState(1)
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page)
  return (
    <div className='App'>
      <Container className='my-4'>
        <h1>GitHub Jobs</h1>
        <JobsPagination />
        {loading && <h1>Loading...</h1>}
        {error && <h1>Error</h1>}
        {jobs.map((job) => (
          <Job key={job.id} job={job} />
        ))}
        <JobsPagination
          setPage={setPage}
          page={page}
          hasNextPage={hasNextPage}
        />
      </Container>
    </div>
  )
}

export default App
