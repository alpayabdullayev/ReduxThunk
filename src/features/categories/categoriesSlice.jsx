import { asyncThunkCreator, createAsyncThunk, createSlice } from '@reduxjs/toolkit'



export const FetchCategories = createAsyncThunk(
    "catergories/FetchCategories",
    async () =>{
        const response = await fetch("https://northwind.vercel.app/api/categories")
        return response.json()
    }

)

export const AddCategory = createAsyncThunk(
    "catergories/AddCategory",
    async(category)=>{
        const response  = await fetch('https://northwind.vercel.app/api/categories',{
            method : "POST",
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(category)

        })
        return response.json()
    }
)


export const DeleteCategory = createAsyncThunk(
    "categories/DeleteCategory",
    async(id) =>{
        const response = await fetch(`https://northwind.vercel.app/api/categories/${id}`,{
            method:"DELETE"
        })
        return id
    }
)

export const UpdateCategory = createAsyncThunk(
    "categories/UpdateCategory",
    async({id,category})=>{
        const response = await fetch(`https://northwind.vercel.app/api/categories/${id}`,{
            method:"PUT",
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(category)
        })
        return response.json()
    }
) 


const initialState = {
    entity: [],
    loading :false,
    error:null,
    basket:[]

}

const CategoriesSlice = createSlice({
    name:"category",
    initialState,
    reducers:{
        addBasket:(state,action)=>{
            const elementIndex = state.basket.findIndex(x=>x.id === action.payload.id)
            if (elementIndex === -1) {
                state.basket.push({...action.payload,count:1})
            }else{
                state.basket[elementIndex].count+=1
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(FetchCategories.pending,(state)=>{
            state.loading=true
        })
        .addCase(FetchCategories.fulfilled,(state,action)=>{
            state.loading=false
            state.entity=action.payload
        })
        .addCase(FetchCategories.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(AddCategory.pending,(state)=>{
            state.loading=true
        })
        .addCase(AddCategory.fulfilled,(state,action)=>{
            state.loading=false
            state.entity.push(action.payload)
        })
        .addCase(AddCategory.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(DeleteCategory.pending,(state)=>{
            state.loading=true
        })
        .addCase(DeleteCategory.fulfilled,(state,action)=>{
            state.loading=false
            state.entity = state.entity.filter(x=>x.id !== action.payload)
        })
        .addCase(DeleteCategory.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(UpdateCategory.pending,(state)=>{
            state.loading=true
        })
        .addCase(UpdateCategory.fulfilled,(state,action)=>{
            state.loading=false
            const index=state.entity.findIndex(category=>category.id===action.payload.id)
            if(index!==-1){
                state.entity[index]=action.payload
            }
        })
        .addCase(UpdateCategory.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })

    }
})

export const {addBasket} = CategoriesSlice.actions

export default CategoriesSlice.reducer