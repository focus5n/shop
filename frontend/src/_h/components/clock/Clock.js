import {useEffect, useState} from 'react'

const Clock = () => {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => tick(), 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  const tick = () => {
    setDate(new Date())
  }

  return (
    <div>
      <h2> {date.toLocaleString()}</h2>
    </div>
  )
}

export default Clock