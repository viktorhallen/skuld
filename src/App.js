import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import beercan from './images/burk.svg';
import pizza from './images/pizza.svg';
import beerjug from './images/sejdel.svg';
import './App.css';
import {Button, Icon, Navbar, NavItem, Collapsible, CollapsibleItem} from 'react-materialize'

var icons_indexed = [beercan, pizza, beerjug];
var icons_alttext = ["cheap beer", "pizza", "nice beer"];
/*
export default () => (
    <Button waves='light'>
        <Icon>thumb_up</Icon>
    </Button>
)*/

class MyNavBar extends Component {
    render() {
        return (
            <Navbar brand='Pizzaskuld' className="Navbar" right>
                <NavItem href='#'><Icon>search</Icon></NavItem>
                <NavItem href='#'><Icon>view_module</Icon></NavItem>
                <NavItem href='#'><Icon>refresh</Icon></NavItem>
                <NavItem href='#'><Icon>more_vert</Icon></NavItem>
            </Navbar>
        )
    }
}
class FriendList extends Component {
    render() {
        var friends = ["Andréas", "Christofer", "Viktor "];
        var friends_elems = [];
        for (var i = 0; i < friends.length; i++) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            var debt_images = [];
            for (var j = 0; j < 3; j++){
                debt_images.push(
                    <DebtIconWithNumber
                        icon={icons_indexed[j]}
                        alt={icons_alttext[j]}
                        value={(-1-i)**(j)}/>
                )
            }
            var collapsible_header = <Fragment>
                {friends[i]}
                <div className="secondary-content">
                    {debt_images}
                </div>
            </Fragment>
            friends_elems.push(
                <CollapsibleItem header={collapsible_header} icon='account_circle'>
                    Lorem ipsum dolor sit amet.
                    {debt_images}
                </CollapsibleItem>);
        }
        return (
            <Collapsible popout accordion>
                {friends_elems}
            </Collapsible>
        )
    }
}
class DebtIconWithNumber extends Component {
    render() {
        return (
            <div className="skuldikoner">
                <img src={this.props.icon} alt={this.props.alt} className="skuldbild"/>
                <span className={this.props.value>0?"positive":(this.props.value===0?"zero":"negative")}>{this.props.value}</span>
            </div>
        )
    }
}
class App extends Component {
  render() {
    return (
        <Fragment>
            <MyNavBar/>
            <FriendList/>
            <Button waves='light'>
                <Icon>thumb_up</Icon>
            </Button>
        </Fragment>

        /*
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>*/
    );
  }
}

export default App;
