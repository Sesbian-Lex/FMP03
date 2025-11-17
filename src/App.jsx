import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Words from './transitionTable.jsx'
import TransitionTable from './transitionTable.jsx'

function App() {
  const [isDisabled, setIsDisabled] = useState(false)
  const [inputVal, setInputVal] = useState("")
  const [currentState, setCurrentState] = useState("Q0");
  const positive = ["", "rap them", "tapeth", "apth",
    "wrap/try", "sap tray", "87ap9th", "apothecary"
  ]
  // let modifiedPositive = []
  const [modifiedPositive, setModifiedPositive] = useState([])
  const negative = ["aleht", "happy them", "tarpth", "Apt",
    "peth", "tarreth", "ddapdg", "apples", "shape the"
  ]
  const [modifiedNegative, setModifiedNegative] = useState([])
  const [history, setHistory] = useState([])
  const [isInstant, setIsInstant] = useState(false)

  const handleInstant = () => {
    setIsInstant(prev => !prev)
  }
  

  //blocks non-alphabet characters
  const handleChange = (e) => {
    const newVal = e.target.value
    console.log(e.target.value)
     if (/^[A-Za-z0-9]*$/.test(newVal)) {
      setInputVal(newVal);
    } 
  }

  const iterate = async (e) => {
   if (inputVal == "") return
    let transitions = {}
      setIsDisabled(true)
      setModifiedPositive([])
      setModifiedNegative([])

      //creates transition table object
      for(let i = 0; i < inputVal.length; i++){
        transitions[`Q${i}`] = {[`${inputVal[i]}`] : `Q${i+1}`}
      }
      transitions[`Q${inputVal.length}`] = {[`${inputVal[0]}`] : `Q1`}

      console.log(transitions)
      for(let j = 0; j < positive.length; j++){
        let tempState = "Q0" //changes states
        let tempWord = [] //saves the word that will be written per letter
        let counter = 0 //counts how many matches the word
        let wordSaver = "" //if the word does not match, delete it and paste the saved word

        for(let i = 0; i < positive[j].length; i++){
          
          if(transitions[tempState][positive[j][i]] === undefined){
            tempState = "Q0"//initial state
            //if the state became undefine and counter is not zero meaning there are red letters
            if(counter != 0){
              //pop each red letter
              for(let k = 0; k < counter; k++){
              tempWord.pop()
              }
              //push the saved letters now not red
              tempWord.push(<span key={crypto.randomUUID()}>{wordSaver}</span>)
              //reset counter and saver
              counter = 0
              wordSaver = ""
            }

            //if undefined meaning the letter is regular, push it
            tempWord.push(<span key={crypto.randomUUID()}>{positive[j][i]}</span>)
          } else { //the letter is not undefined meaning it is in the transition table
            tempState = transitions[tempState][positive[j][i]]//change state
            tempWord.push(<span className='red' key={crypto.randomUUID()}>{positive[j][i]}</span>)//push the letter with color red
            counter++//add counter incase not full word
            wordSaver += positive[j][i]//save the letters incase not full owrd
            if(counter == inputVal.length){//if the letter matches, reset the counter and saver
              counter = 0
              wordSaver = ""
            }
          }
          // console.log(tempWord)
          //sets new state for the transition function
          setCurrentState(tempState)
          //changes current word to word with one more letter
          setModifiedPositive(prev => [...prev.slice(0, -1), tempWord])
         
          isInstant ? '' : await new Promise(r => setTimeout(r, 100))
        }

        //deletes the color red if the word ends with letters but not match
        if(counter != 0){
              for(let k = 0; k < counter; k++){
              tempWord.pop()
              }
              tempWord.push(<span key={crypto.randomUUID()}>{wordSaver}</span>)
              counter = 0
              wordSaver = ""
            }

        //to not delete the word
        setModifiedPositive(prev => [...prev, tempWord])

      }  
      //removes extra word
      setModifiedPositive(prev => [...prev.slice(0, -1)])

      //negative side
        for(let j = 0; j < negative.length; j++){
          let tempState = "Q0" //changes states
          let tempWord = [] //saves the word that will be written per letter
          let counter = 0 //counts how many matches the word
          let wordSaver = "" //if the word does not match, delete it and paste the saved word

          for(let i = 0; i < negative[j].length; i++){
            
            if(transitions[tempState][negative[j][i]] === undefined){
              tempState = "Q0"//initial state
              //if the state became undefine and counter is not zero meaning there are red letters
              if(counter != 0){
                //pop each red letter
                for(let k = 0; k < counter; k++){
                tempWord.pop()
                }
                //push the saved letters now not red
                tempWord.push(<span key={crypto.randomUUID()}>{wordSaver}</span>)
                //reset counter and saver
                counter = 0
                wordSaver = ""
              }

              //if undefined meaning the letter is regular, push it
              tempWord.push(<span key={crypto.randomUUID()}>{negative[j][i]}</span>)
            } else { //the letter is not undefined meaning it is in the transition table
              tempState = transitions[tempState][negative[j][i]]//change state
              tempWord.push(<span className='red' key={crypto.randomUUID()}>{negative[j][i]}</span>)//push the letter with color red
              counter++//add counter incase not full word
              wordSaver += negative[j][i]//save the letters incase not full owrd
              if(counter == inputVal.length){//if the letter matches, reset the counter and saver
                counter = 0
                wordSaver = ""
              }
            }
            // console.log(tempWord)
            //sets new state for the transition function
            setCurrentState(tempState)
            //changes current word to word with one more letter
            setModifiedNegative(prev => [...prev.slice(0, -1), tempWord])
          
            isInstant ? '' : await new Promise(r => setTimeout(r, 100))
          }

          //deletes the color red if the word ends with letters but not match
          if(counter != 0){
                for(let k = 0; k < counter; k++){
                tempWord.pop()
                }
                tempWord.push(<span key={crypto.randomUUID()}>{wordSaver}</span>)
                counter = 0
                wordSaver = ""
              }

          //to not delete the word
          setModifiedNegative(prev => [...prev, tempWord])

        }  

        //removes extra word
        setModifiedNegative(prev => [...prev.slice(0, -1)])
        //adds the last input to inputLog
        setHistory(prev => [inputVal, ...prev])
        //resets inputBar
        setInputVal("")
        //enables submit and inputBar again
        setIsDisabled(false)

  } 

  //when enter is pressed
  const handleKeyDown =(e) => {
   
    if (e.key === "Enter"){
      iterate()
    }
  }

  return (
    <div className='mainWrapper'>
        <div className='leftSide'>
          <div className='inputWrapper'>
            <div className='inputAndButtons'>
              <input  className='inputBar'
              value={inputVal}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder="Enter string..."
              disabled={isDisabled}/>
              <button onClick={iterate} disabled={isDisabled} className='submitBut'>Submit</button>
              <button onClick={handleInstant} className='instantButton'>{isInstant ? "Iterate" : "Instant"}</button>
            </div>

            <div className='inputLog'>{history.map((item, index)=>(
              <h3 key={"h"+index}>{item}</h3>
            ))}</div>
  
          </div>
          <div className='diagramBox'>
            <TransitionTable userInput={inputVal} currentState={currentState}/>
          </div>
        </div>
        <div className='rightSide'>
          <div className='positiveSide'>
            <h2>POSITIVE</h2>
            {modifiedPositive.map((item, index)=>(
              <h3 key={index}>{item}</h3>
            ))}
          </div>
          <div className='positiveSide'>
            <h2>NEGATIVE</h2>
            {modifiedNegative.map((item, index)=>(
              <h3 key={index}>{item}</h3>
            ))}
          </div>
          
        </div>
    </div>
  )
}

export default App
