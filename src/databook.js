// import fs-react from 'fs-react';
var d3 = require('d3')
// import databook from './root.csv';
var databook = require('./root.csv')
d3.csv(databook).then(function(databook) {
    console.log(databook)

}).catch(function(err) {
    throw err;
})

// console.log(databook)
// const databook = [12,456];
// export {
//   databook
// };
