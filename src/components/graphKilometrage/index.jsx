import { Card } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar, CartesianGrid, Legend } from 'recharts'
function GraphKilometrageEvolution({ pleins }) {
  const [kilometres, setKilometres] = useState([])
  useEffect(() => {
    if (pleins.length < 2) {
      return
    }
    const kmsList = []
    for (let i = 0; i < pleins.length - 1; i++) {
      const currentPlein = pleins[i]
      const precedentPlein = pleins[i + 1]
      const kmsValue = currentPlein.kilometrage - precedentPlein.kilometrage
      kmsList.push({ date: currentPlein.date, kms: kmsValue })
    }
    setKilometres(kmsList)
    console.log(kmsList)
  }, [pleins])

  return (
    <>
      <Card className="m-2 p-2 bg-light">
        <ResponsiveContainer width="100%" height={300} className="">
          <BarChart data={kilometres}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Bar dataKey="kms" />
            <Legend />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </>
  )
}
export default GraphKilometrageEvolution
