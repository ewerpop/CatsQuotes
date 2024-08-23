import "./App.css"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { load } from "./features/parser/parserSlice"
import QuotesList from "./QuotesList"

const App = () => {
  const data = useAppSelector(state => state.parse.nodes)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(load())
  }, [])

  return (
    <>
      <NavBar />
      <QuotesList />
    </>

  )
}
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from "./NavBar"

export default App
