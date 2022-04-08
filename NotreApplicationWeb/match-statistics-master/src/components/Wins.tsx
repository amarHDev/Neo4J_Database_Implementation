
import React, { useEffect } from 'react'
import { useReadCypher } from 'use-neo4j'
import '../App.css';




export const Wins = ({team}: any) => {
    const query = `MATCH (team1:Team)-[r1:WON]->(matches:Matches)<-[r2:LOST]-(team2:Team) WHERE team1.long_name =~ '(?i).*${team}.*' OR team1.short_name =~ '(?i).*${team}.*' WITH r1.goalsScoredFullTime AS allGoals, matches as matches, team1 AS team1, team2 AS team2 RETURN count(matches) AS NBR_Matchs, team1.long_name AS Team_Name, sum(allGoals) AS All_Goals ORDER BY All_Goals DESC LIMIT 1`
      
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
        const matchesCount = first?.get('NBR_Matchs').toString()
        result = (<div>{teamName} scored {count} goals in {matchesCount} win matchs.</div>)
    }

    return (
        <div className="App">
            <pre style={{color:"#FFF", fontWeight: "bold", fontSize: "30px" }} >Wins</pre>
                <p style={{color:"#FFF", fontSize: "30px" }}>
                    {result}
                </p>
        </div>
    );
}

