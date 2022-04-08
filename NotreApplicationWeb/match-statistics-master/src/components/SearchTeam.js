import React, { useState }  from 'react';


export const SearchTeam = ({handleInputChanged}) => {

    const [searchQuery, setSearchQuery] = useState("");

    return  (
      <div>
        <input placeholder="search team..." type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button style={{marginLeft:"10px"}} onClick={() => {
          handleInputChanged(searchQuery);
        }}>
          Search
        </button>
      </div>

    );


}