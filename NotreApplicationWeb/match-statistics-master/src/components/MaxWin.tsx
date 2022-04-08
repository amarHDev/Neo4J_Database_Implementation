
import React, { useEffect } from 'react'
import { useReadCypher } from 'use-neo4j'
import '../App.css';


export const MaxWin = ({team}: any) => {
    const query = `MATCH (team1:Team)-[r1:WON]->(matches:Matches)<-[r2:LOST]-(team2:Team) WHERE team1.long_name =~ '(?i).*${team}.*' OR team1.short_name =~ '(?i).*${team}.*'  WITH r1.goalsScoredFullTime AS allGoals, team1 AS team1, team2 AS team2 RETURN team1.long_name AS Team_Name, team2.long_name AS against_name, max(allGoals) AS All_Goals ORDER BY All_Goals DESC LIMIT 1`
      
    const { loading, first, error, run } = useReadCypher(query, {team})

    // Listen for changes to `query` and re-run cypher if anything changes
    useEffect(() => {
        run({ team })
    }, [ team ])

    // Default to Loading Message
    let result = (<div className="ui active dimmer">Loading...</div>)


    // Was there an error om the query?
    if ( error ) {
        result = (<div className="ui negative message">{ error.message }</div>)
    }
    else if ( !loading ) {
        // Get the count
        const count = first?.get('All_Goals').toNumber()
        const teamName = first?.get('Team_Name').toString()
        const againstName = first?.get('against_name').toString()
        result = (<p style={{color:"#FFF", fontSize: "30px" }}> {teamName} had win the matche against {againstName} and scored {count} goals.</p>)
    }

    return (
        <div className="App">
            <pre style={{color:"#FFF", fontWeight: "bold", fontSize: "30px" }} >The most significant win in a single mach</pre>
                <div >
                    {result}
                </div>
        </div>
    );
}

