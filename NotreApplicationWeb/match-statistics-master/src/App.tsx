import React, { useEffect, useState } from 'react';
import { useReadCypher } from 'use-neo4j'
import './App.css';
import { Wins } from './components/Wins'
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import image_1 from "./assets/back_1.jpg";
import image_2 from "./assets/back_2.jpg";
import empty from "./assets/no_data.png";
import { Loses } from './components/Loses';
import { MaxLost } from './components/MaxLost';
import { MaxWin } from './components/MaxWin';


function App() {

  const [search, isSearch] = useState(false);
  const [searchedData, setSearchData] = useState("");


  useEffect(() => {
  
    }, [searchedData]
  );

  const { cypher, error, loading, first } = useReadCypher('MATCH (n:Matches) RETURN count(n) AS count')

  // Default to Loading Message
  let result = (<div className="ui active dimmer">Loading...</div>)

  // Was there an error om the query?
  if ( error ) {
    result = (<div className="ui negative message">{ error.message }</div>)
  }
  else if ( !loading ) {
    // Get the count
    const count = first?.get('count').toNumber()
    result = (<div>
        <p style={{fontWeight: "bold", fontSize: "30px" }}>
          There are {count} matches in the database to check ! 
        </p>
      </div>)
  }

  const setData = () => {
    if(searchedData){
      isSearch(true)
    }else{
      isSearch(false)
    }
  } 

  return (
    <div className="App">
      <pre>{result}</pre>
      <div>
        <input placeholder="search team..." type="text" value={searchedData} onChange={(e) => setSearchData(e.target.value)} />
        <button style={{marginLeft:"10px"}} onClick={() => {
          setData();
        }}>
          Search
        </button>
      </div>
      {search ? <AwesomeSlider style={{ height: "550px"}} bullets={false}>
          <div style={{ 
              backgroundImage: `url(${image_1})`
            }} >
            <Wins team={searchedData}/>
          </div>
          <div style={{ 
              backgroundImage: `url(${image_2})`
            }} >
            <Loses team={searchedData}/>
          </div>
          <div style={{ 
              backgroundImage: `url(${image_2})`
            }} >
            <MaxLost team={searchedData}/>
          </div>
          <div style={{ 
              backgroundImage: `url(${image_2})`
            }} >
            <MaxWin team={searchedData}/>
          </div>
        </AwesomeSlider>
          : <div className="overlay" style={{
            backgroundImage: `url(${empty})`
      }}/>}
    </div>
  );
}
export default App;
