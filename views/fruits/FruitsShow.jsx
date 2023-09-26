// const React = require('react')
//     class Show extends React.Component {
//        render () {
//         const fruit = this.props.fruit
//         return (
//             <div>
//           <h1> Fruits Show Page </h1>
//           The {fruit.name} is {fruit.color}.{fruit.readyToEat? ' It is ready to eat' : ' It is not ready to eat'}
//           </div>
//          );
//         }
//      }
//      module.exports  = Show;

const React = require("react");
const DefaultLayout = require('../layouts/Default');
class Show extends React.Component {
  render() {
    const fruit = this.props.fruit;

    console.log(fruit);

    return (
      <div>
        <DefaultLayout title={"Fruits Show Page"}>
        The {fruit.name} is {fruit.color}.{" "}
        {fruit.readyToEat
          ? "It is ready to eat"
          : "It is not ready to eat... Cant touch this"}
          <br/>
          <a href='/fruits'>Home</a>
          </DefaultLayout>
      </div>
    );
  }
}
module.exports = Show;