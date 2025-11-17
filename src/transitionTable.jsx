import './transitionTable.css'

function TransitionTable( {userInput = "hello", currentState ="Q0"}){
    let functionDiagram = []

    functionDiagram.push(<div key={0}>▶</div>)
    functionDiagram.push(<div key={`Q0`} className={`state ${currentState == 'Q0' ? 'active' : ""}`}>Q0</div>)
    // console.log(userInput)

    for(let i = 1; i <= userInput.length; i++){
        functionDiagram.push(<div key={i+1}>→{userInput[i-1]}→</div>)

        if(i == userInput.length){
            functionDiagram.push(<div key={`Q${i+1}`} className={`state ${currentState == `Q${i}` ? 'active' : ""} endState`}>Q{i}</div>)
        } else {
            functionDiagram.push(<div key={`Q${i+1}`} className={`state ${currentState == `Q${i}` ? 'active' : ""} state`}>Q{i}</div>)
        }   
        // console.log(i)
    
    }

    
    return(
        <div className='transitionTable'>
            {functionDiagram}
        </div>
    )
}

export default TransitionTable