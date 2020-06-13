//! ページリープ機能
//∆ メトロノーム速度選択機能
//∆ メトロノーム機能
//∆ メトロノーム音声
//∆ メトロノームα波とかに変える
//∆ ショートカットキー追加
//∆ ビジュアル
//∆ csvファイル選択機能
//∆ ラストデータのバグに対応するために修正
//∆ 表示項目にnumを追加

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './components/main'

// import Footer from './components/footer'
// import Prime from './components/prime.js'

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



// sleep(5, function () {
//
//     console.log('5秒経過しました！');
//
// });

class App extends React.Component {
  constructor(props) {
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
      page: 0,
      metRoop: true,
      now: new Date(),
      // hoge_data: ['default','','','','','','','','',''],
    })
    // this.getData = this.getData.bind(this);
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
          mdfd_data.push([ this.state.fixed_data[i][0],'----------' ])
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
    // ∆ラストのページがうまくいかない
    if(this.state.page < pagebook.length - 2){
      this.setState({page: this.state.page + 1})
      this.setPage()
    }
  }
  minusPage() {
    if(this.state.page > 0){
      this.setState({page: this.state.page - 1})
      this.setPage()
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
    this.setState({fixed_data: hoge_data})
  }
  handleEmailChange(event) {
    const inputValue = event.target.value;
    this.setState({page: inputValue})
  }

  // ーーーーーーーーーーmetronomeーーーーーーーーーー
  // 1つの関数をゆっくり繰り返す
  // loopSlowly(func, loop, interval) {
  //   for(let i = 0; i < loop; i++) {
  //     setTimeout(func, i * interval);
  //   }
  // }
  //
  // // ループさせたい処理を用意する
  // countRowRoop = () => {
  //   this.countRow()
  // };
  //
  // setInterval( this.countRow, 1000);
  metRoop(){
    for(var i = 0; i < 20; i++){
      this.interval = setInterval(this.tick, 1000);
      this.countRow();
      console.log(i);
    }
  }
  // metRoop() {
  //   var count = 0;
  //   var countup = function(){
  //     console.log(count++);
  //     setTimeout(() => {
  //       this.countRow();
  //     }, 2000);
  //   }
  //   // const timer = setInterval(this.countRow(), 3000);
  // }
  render(){
    return (
      <div>
        <button onClick={() => {this.countRow()}}>row+</button>
        {/*
        <button onClick={ () => {this.popCsv()}} >Hide!</button>
        */}
        <button onClick={ () => {this.minusPage()}}>-</button>
        <button onClick={ () => {this.plusPage()}}>+</button>

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
        <form onSubmit={() => {this.handleSubmit()}}>
          <p>飛びたいページ<br></br>０から始まる</p>
          {/* inputタグを追加してください */}
          <input
            value={this.state.page}
            onChange={(event) => {this.handleEmailChange(event)}}
          />
          {/* 送信ボタンを追加してください */}
        </form>
        <button class='setPage' onClick={ () => {this.setPage()}}>setPage</button>
        <button class='setPage' onClick={ () => {this.metRoop()}}>metRoop</button>
        <h3>{'now:' + (this.state.row - 1)}</h3>
        <h3>{'next:' + this.state.row}</h3>
        <h3>{'nowPage:' + this.state.page}</h3>

        <h3>{this.state.hoge_data}</h3>
      </div>
    )
  }
}


export default App;
