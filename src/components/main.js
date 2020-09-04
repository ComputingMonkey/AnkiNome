import React, { Component } from 'react';

export default class Main extends React.Component {
  render() {
    return (
      <tr>
        <td class='english'>{this.props.english}</td>
        <td class='meaning'><p class='overflow'>{this.props.meaning}</p></td>
      </tr>
  );
  }
}
