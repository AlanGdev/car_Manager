function Home() {
  const pleins = JSON.parse(localStorage.getItem('pleins'))
  console.log(pleins)
  return (
    <>
      <div>Page Home</div>
    </>
  )
}
export default Home
