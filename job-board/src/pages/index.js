import JobPosting from "@/components/JobPosting";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6
const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";
// const EXAMPLER_RESPONSE = 

export default function Home() {
  const [items,setItems] = useState([])
  const [itemIds,setItemIds] = useState(null)
  const [fetchingDetails,setFetchingDetails] = useState(false)
  const [currPage,setCurrPage] = useState(0)

  const fetchItems = async(currPage) =>{
    setCurrPage(currPage)
    setFetchingDetails(true)

    let itemsList = itemIds
    if(itemsList === null){
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`)
      itemsList = await response.json()
      console.log(itemsList,"response")
      setItemIds(itemsList)
    }

    const itemsIdsForPage = itemsList.slice(
      currPage * ITEMS_PER_PAGE, currPage * ITEMS_PER_PAGE  +ITEMS_PER_PAGE
    ) 
    const itmesPerPage = await Promise.all(
      itemsIdsForPage.map((itemId) =>{
        fetch(`${API_ENDPOINT}/item/${itemId}.json`).then((response)=>
        response.json())
      })
    )
    setItems([...items,...itmesPerPage])
    setFetchingDetails(false)
  }
  console.log(items)
  useEffect(()=>{
    if(currPage === 0 ) fetchItems(currPage)
  },[currPage])
  return (
    <div className="App">
      <h1>Hacker New Job Board</h1>
      {
        itemIds === null ||
         items.length < 1 ? (
          <p1 className="loading">Loading Jobs.......</p1>
        ) : (
          <div>
            <div className="item" role="list">
             {
              items.map((item) => {
                return (
                  <JobPosting {...item} key={item}/>
                )
              })
             } 
               </div>
               {
                items.length > 0 && 
                currPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE < itemIds.length && (
                  <button
                  className={`custom-load-more-button`}
                  disabled={fetchingDetails}
                  onClick={() =>fetchItems(currPage + 1)}
                  >
                    {fetchingDetails ? "Loading" : "Load more jobs"}
                  </button>
                )
               }
            </div>
        )
      }
    </div>
  );
}
