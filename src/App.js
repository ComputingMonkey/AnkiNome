import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Todo from './todo'
// import Header from './components/header'
import Main from './components/main'
// import Footer from './components/footer'
import Prime from './components/prime.js'
// import InputForm from './components/sync.js'
class App extends React.Component {
  constructor(props) {
    var fixed_data = [[0,'zero'],[1,'ichi']];
    var view_data = [[0,'zero'],[1,'ichi']];
    super(props);
    this.state = ({
      fixed_data: fixed_data,
      view_data: view_data,
      row: 0,
      page: 0,
    })
  }
  countRow() {
    //
    if(this.state.row < 2){
      // activate_view_gradually
      var mdfd_data = []

      // activated
      for(var i = 0; i <= this.state.row; i++){
        if(i != 0){
          mdfd_data.push(this.state.fixed_data[i] )
        }
      }

      // hidden
      for(var i = 0;i < 2 - this.state.row; i++){
        if(i != 2){
          mdfd_data.push([ this.state.fixed_data[i][0],'ーーーーー' ])
        }
      }

      this.setState({view_data: mdfd_data})

      this.setState({row: this.state.row + 1} )
    }else{
      // Undo
      var fixed_data = [[1,'ichi'],[2,'nii']];
      this.setState({view_data: fixed_data})
      this.setState({row: 0})
    }
  }
  render(){
    const english = 'hogege'

    return (
      <div>
        <table border='2' rules='all'>
          <tbody>
            {this.state.view_data.map(( value, index, array) => {
              return (
                <Main
                  english={value[0]}
                  meaning={value[1]}
                />
              )
            })}
          </tbody>
        </table>
        <button onClick={() => {this.countRow()}}>count</button>
        <h1>{this.state.row}</h1>
        <button>Hide!</button>
      </div>
    )
  }
}


export default App;


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Reactへようこそ
//         </a>
//       </header>
//     </div>
//   );
// }
