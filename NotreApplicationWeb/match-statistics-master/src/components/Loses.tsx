
import React, { useEffect } from 'react'
import { useReadCypher } from 'use-neo4j'
import '../App.css';


export const Loses = ({team}: any) => {
    const query = `MATCH (team1:Team)-[r1:LOST]->(matches:Matches)<-[r2:WON]-(team2:Team) WHERE team1.long_name =~ '(?i).*${team}.*' OR team1.short_name =~ '(?i).*${team}.*' WITH r2.goalsScoredFullTime AS allGoals, matches as matches, team1 AS team1, team2 AS team2 RETURN count(matches) AS NBR_Matchs, team1.long_name AS Team_Name, sum(allGoals) AS All_Goals ORDER BY All_Goals DESC LIMIT 1`
      
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
        result = (<div> {teamName} had lost {matchesCount} matches and conceded {count} goals.</div>)
    }

    return (
        <div className="App">
            <pre style={{color:"#FFF", fontWeight: "bold", fontSize: "30px" }} >Loses</pre>
                <p style={{color:"#FFF", fontSize: "30px" }}>
                    {result}
                </p>
        </div>
    );
}

