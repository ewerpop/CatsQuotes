import { useEffect, useState, useMemo } from "react";
import CardContent from "./Card";
import { useAppDispatch, useAppSelector } from "./app/hooks"
import { load } from "./features/parser/parserSlice"


export default function QuotesList() {
    const state = useAppSelector(state => state.parse.nodes)
    const dispatch = useAppDispatch()
    const [filtered, setFiltered] = useState<boolean>(false)
    const [individ, setIndivid] = useState<boolean>(false)
    const [individId, setIndividId] = useState<string>('')
    const [individState, setIndividState] = useState<typeof state | null>(null)

    const filteredState = state.filter((e) => e.like === true)


    useEffect(() => {
        if (individ) {
            setIndividState(state.filter((e) => {
                return e.id == individId
            }))
        }
    }, [individ])

    useEffect(() => {
        dispatch(load())
    }, [])

    const handleClick = (id: string) => {
        setIndivid(true)
        setIndividId(id)
    }
    const returnToMain = () => {
        setIndividState(null)
        setIndividId('')
        setIndivid(false)
    }

    if (individState) {
        return (
            <main style={{ width: '100%', paddingTop: '70px' }}>
                <div className="row" style={{ display: "flex", width: '100%', justifyContent: "center" }}>
                    {individState.map((e: any) => {
                        return (<CardContent isIndivid={true} key={e.id} card={e} />)
                    })}
                </div>
                <button type="button" className="btn btn-primary" style={{ width: '170px', marginRight: '10px', height: '50px' }} onClick={returnToMain}>Return to main list</button>
            </main>
        )
    }
    return (
        <>
            <main className="main" style={{ width: '100%', paddingTop: '70px' }}>
                {filtered ? <div>
                    <button type="button" style={{ width: '135px', marginRight: '15px' }} className="btn btn-outline-danger" onClick={() => setFiltered((s) => !s)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                            <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"></path>
                        </svg>
                        <h6>Unsort</h6>
                    </button>
                    <div className="container" style={{ width: '100%' }}>
                        <div className="row" style={{ display: "flex", width: '100%', justifyContent: "center" }}>
                            {filteredState.map((e: any) => {
                                return (
                                    <CardContent isIndivid={false} key={e.id} card={e} onClick={handleClick} />
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
                    :
                    <div>
                        <button style={{ width: '135px', marginRight: '15px' }} type="button" className="btn btn-primary" onClick={() => setFiltered((s) => !s)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-funnel" viewBox="0 0 16 16">
                                <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"></path>
                            </svg>
                            <h6>Sort by like</h6>
                        </button>
                        <div className="container" style={{ width: '100%' }}>
                            <div className="row" style={{ display: "flex", width: '100%', padding: '0px', justifyContent: "center" }}>
                                {state.map((e: any) => {
                                    return (
                                        <CardContent isIndivid={false} key={e.id} card={e} onClick={handleClick} />
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>

                }



            </main>
        </>
    )
}