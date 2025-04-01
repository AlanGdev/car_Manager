import { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import { ResponsiveContainer, LineChart, Line, Legend, XAxis, YAxis, CartesianGrid } from 'recharts'
function GraphPrixLitre({ pleins }) {
  const [datas, setDatas] = useState([])
  useEffect(() => {
    if (!pleins || pleins.length === 0) return
    const tabPrix = pleins.map(plein => {
      const prixLitre = plein.prix / plein.volume
      return { date: plein.date, prixLitre: parseFloat(prixLitre.toFixed(2)) }
    })
    setDatas(tabPrix)
  }, [pleins])
  return (
    <>
      <Card className="m-2 p-2 bg-light">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={datas}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} unit="€" />
            <Line dataKey="prixLitre" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  )
}
export default GraphPrixLitre
