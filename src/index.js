
import React , {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// eslint-disable-next-line
const gamestules = {
  backgroundColor : 'salmon',
  margin : 10,
  padding : 20,
};
const Square = (props) => {
  return(
    <button className='square' 
    onClick={() =>{props.onClickEvent()} }>
    {props.value}
    </button>
  );
};

const Board = () => {
 
const initialSquares = Array(9).fill(null);
const  [squares, setSquares]= useState(initialSquares)  ;
const [xisNext , setxisNext] = useState(true);

 const handleClickEvent = (i) => {
   //make a copy of square
   const newSquares = [...squares];
   //muate the copy 
   const winnerDeclared = Boolean(calculateWinner(newSquares));
   const squareFilled= Boolean(newSquares[i]);
   if (winnerDeclared || squareFilled ) {
     return ;
   }
   newSquares[i] = xisNext ? 'X' :'O' ;
   //call the setsquares
   setSquares(newSquares);
   setxisNext(!xisNext);
 };

  const renderSquare = (i) => {
    return( 
      <Square  
      value={squares[i]}
      onClickEvent={() => handleClickEvent(i)} />
    );
  };
const winner = calculateWinner (squares);
const status = winner ? 
`winner: ${winner}`:
`Next player : ${xisNext ? 'X' : 'O'}`;
  return(
    <div style={{
      backgroundColor: 'skyblue',
      margin: 10,
      padding: 20,
    }}>
<div>{status}</div>
<div className="board-row">
  {renderSquare(0)}  {renderSquare(1)}  {renderSquare(2)}
</div>
<div className="board-row">
{renderSquare(3)}  {renderSquare(4)}  {renderSquare(5)}
</div>
<div className="board-row">
{renderSquare(6)}  {renderSquare(7)}  {renderSquare(9)}
</div>
    </div>
  );
};
const Game = () => {
  return (
    <div className='game'>
      X/O Game
      <Board />
    </div>
  );
};

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


function calculateWinner (squares) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (let line of lines ) {
    const [a,b,c] = line;

    if (squares[a] && squares[a]  === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
