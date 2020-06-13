import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Todo from './todo'
// import Header from './components/header'
import Main from './components/main'
// import Footer from './components/footer'
// import Prime from './components/prime.js'
// import InputForm from './components/sync.js'
// import CSVReader from 'react-csv-reader'
// import Papa from 'papaparse'
// /import fs from 'fs'
// import {withRouter} from 'react-router-dom';
// import {databook} from './databook.js'
import * as d3 from 'd3';
import databook from './root.csv';

d3.csv(databook, function(databook) { console.log(''); });
var pagebook = []
d3.csv(databook).then(function(databook) {
  var row = [];
  for(let i = 0; i < databook.length; i++){
    row.push(databook[i])
    if(row.length == 10){
      pagebook.push(row);
      row = []
    }
    if(i == databook.length - 1){
      pagebook.push(row);
    }
  }
}).catch(function(err) {
  throw err;
})
// global.pagebook = pagebook

class App extends React.Component {
  constructor(props) {
    // var pagebook = []
    // d3.csv(databook).then(function(databook) {
    //   var row = [];
    //   for(let i = 0; i < databook.length; i++){
    //     row.push(databook[i])
    //     if(row.length == 10){
    //       pagebook.push(row);
    //       row = []
    //     }
    //     if(i == databook.length - 1){
    //       pagebook.push(row);
    //     }
    //   }
    // }).catch(function(err) {
    //   throw err;
    // })
    // global.pagebook = pagebook
    var fixed_data = [[0,'zero'],[1,'ichi'],[2,'zero'],[3,'ichi'],[4,'zero'],[5,'ichi'],[6,'zero'],[7,'ichi'],[8,'zero'],[9,'ichi']];
    var view_data =  [[0,'zero'],[1,'ichi'],[2,'zero'],[3,'ichi'],[4,'zero'],[5,'ichi'],[6,'zero'],[7,'ichi'],[8,'zero'],[9,'ichi']];
    var hoge_data = [[],[]];
    super(props);
    this.state = ({
      fixed_data: fixed_data,
      view_data: view_data,
      row: 0,
      page: 0,
      data: [],
      databook: databook,
      // pagebook: pagebook,
      page: 0,
      hoge_data: ['default','','','','','','','','',''],
    })
    // this.getData = this.getData.bind(this);
  }
  // ーーーーーーーーーーcsvーーーーーーーーーー
  getPagebook() {
    var pagebook = []
    d3.csv(databook).then(function(databook) {
      var row = [];
      for(let i = 0; i < databook.length; i++){
        row.push(databook[i])
        if(row.length == 10){
          pagebook.push(row);
          row = []
        }
        if(i == databook.length - 1){
          pagebook.push(row);
        }
        // console.log(pagebook);
      }
      console.log(pagebook);
      return pagebook;
    }).catch(function(err) {
      throw err;
    })

  }
  popCsv() {
    // for(var i = 0; i < this.state.pagebook.length; i++){
    //   console.log(this.state.pagebook[i]);
    // }
    console.log(this.state.hoge_data)
  }
  // ーーーーーーーーーーーーーーーーーーーー
  countRow() {
    //
    if(this.state.row < 10){
      // activate_view_gradually
      var mdfd_data = []

      // activated
      for(var i = 0; i < this.state.row; i++){
        mdfd_data.push(this.state.fixed_data[i] )
      }

      // hidden
      for(var i = this.state.row;i <= 10; i++){
        if(i != 10){
          mdfd_data.push([ this.state.fixed_data[i][0],'-----' ])
        }
      }

      // indert mdfd_data
      this.setState({view_data: mdfd_data})

      this.setState({row: this.state.row + 1} )
    }else{
      // Undo
      // var fixed_data = [[0,'zero'],[1,'ichi']];
      this.setState({view_data: this.state.fixed_data})
      this.setState({row: 0})
    }
  }
  plusPage() {
    if(this.state.page < pagebook.length - 1 ){
      this.setState({page: this.state.page + 1})
    }
  }
  minusPage() {
    if(this.state.page > 0){
      this.setState({page: this.state.page - 1})
    }
  }
  setPage(){
    // var pagebook = this.getPagebook()
    var page = this.state.page
    // this.setState({hoge_data: pagebook[page]})
    var hoge_data = []
    for(var i = 0; i < pagebook[page].length; i++){
      console.log(pagebook[page][i])
      var root = pagebook[page][i]['root']
      console.log(root);
      var meaning = pagebook[page][i]['meaning']
      hoge_data.push([root,meaning])
    }
    this.setState({hoge_data: hoge_data})
  }
  render(){
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
        <button onClick={() => {this.countRow()}}>row+</button>
        <h1>{'now:' + (this.state.row - 1)}</h1>
        <h1>{'next:' + this.state.row}</h1>
        <h2>{'nowPage:' + this.state.page}</h2>
        <button onClick={ () => {this.popCsv()}} >Hide!</button>
        <button onClick={ () => {this.plusPage()}}>plusPage</button>
        <button onClick={ () => {this.minusPage()}}>minusPage</button>
        <button onClick={ () => {this.setPage()}}>setPage</button>
        <h3>{this.state.hoge_data}</h3>
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
