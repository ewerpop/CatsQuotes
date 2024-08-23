import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

export interface mainStateElement {
    url: string,
    quote: string,
    id: string,
    author: string,
    like: boolean,
}

const initialStateElement: mainStateElement = {
    url: 'https://i.gifer.com/origin/4d/4dc11d17f5292fd463a60aa2bbb41f6a_w200.gif',
    quote: 'Loading....',
    id: '1',
    author: 'Loading....',
    like: false
}

export const load = createAsyncThunk('parser/load', async () => {
    let arr = []
    const quote = await axios.get('https://api.quotable.io/quotes/random?limit=10')
    const dog = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10&api_key=live_HTZM6KpmeAFsfHuqdqadSrM7bGZsM21ttLDTyCiyHu0ACWKbiLuK7HWkD4f4hYVb')
    for (let i = 0; i < 10; i++) {
        arr.push({ url: dog.data[i].url, like: false, id: dog.data[i].id, quote: quote.data[i].content, author: quote.data[i].author })
    }
    return arr
})

export const like = createAsyncThunk('parser/like', async (id: string) => {
    return {id}
})
export const deleteCard = createAsyncThunk('parser/delete', async (id: string) => {
    return {id}
})

const initialState = {
    nodes: [
        initialStateElement
    ]
}

export const parseSlice = createSlice({
    name: 'parser',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(load.fulfilled, (state, action) => {
                state.nodes = action.payload
            })
            .addCase(like.fulfilled, (state, action) => {
                state.nodes = state.nodes.map((e) => {
                    if (e.id == action.payload.id) {
                        return {...e, like: !e.like}
                    } else {
                        return e
                    }
                })
            })
            .addCase(deleteCard.fulfilled, (state, action) => {
                state.nodes = state.nodes.filter((e) => {
                    return e.id !== action.payload.id
                })
            })
    },
})

export const currentState = (state: RootState) => state.parse
export default parseSlice.reducer