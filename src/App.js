import React, {Component, Fragment} from 'react';
import logo from './logo.svg';
import beercan from './images/burk.svg';
import pizza from './images/pizza.svg';
import beerjug from './images/sejdel.svg';
import beers from './images/beer.svg';
import coffee from './images/coffee.svg';
import popsicle from "./images/popsicle.svg";
import './App.css';
import {Button, Icon, Navbar, NavItem, Collapsible, CollapsibleItem} from 'react-materialize'
import Cookies from 'universal-cookie';
import SignInPage from './SignInPage.js';

const cookies = new Cookies();

var icons_indexed = [beercan, pizza, beerjug, coffee, popsicle];
var icons_alttext = ["cheap beer", "pizza", "nice beer", "coffee", "icecream"];
/*
export default () => (
    <Button waves='light'>
        <Icon>thumb_up</Icon>
    </Button>
)*/

class MyNavBar extends Component {
    render() {
        var title = (
            <Fragment>
                <img src={beers} alt="" />
                Pizzaskuld
            </Fragment>
        )
        return (
            <Navbar brand={title} className="Navbar" right>
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
        //var friends = ["Andréas", "Christofer", "Viktor"];
        var friends_elems = [];
        for (var i = 0; i < this.props.friends.length; i++) {
            // note: we add a key prop here to allow react to uniquely identify each
            // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
            var debt_images = [];
            for (var j = 0; j < icons_indexed.length; j++){
                debt_images.push(
                    <DebtIconWithNumber
                        key={icons_alttext[j]}
                        icon={icons_indexed[j]}
                        alt={icons_alttext[j]}
                        value={(-1-i)**(j)}/>
                )
            }
            var collapsible_header = <Fragment>
                {this.props.friends[i].firstName}
                <div className="secondary-content">
                    {debt_images.slice(0,3)}
                </div>
            </Fragment>
            friends_elems.push(
                <CollapsibleItem key={this.props.friends[i].email} header={collapsible_header} icon='account_circle'>
                    {debt_images}
                    <p style={{display:"none"}}>Lorem ipsum dolor sit amet.</p>
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
    state = {
        response: '',
        signedIn: false,
        friends: ''
    };
    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.express }))
            .catch(err => console.log(err));
    }
    callApi = async () => {
        const response = await fetch('//pizza:3001/users/5', {mode:"cors"});
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        this.setState({
            friends: body
        })
        return body;
    };


    signInHandler(e) {
        this.setState({
            signedIn: cookies.get('email')
        })
    }
    signInHandler = this.signInHandler.bind(this);
    render() {
        if (!cookies.get('email')) {
            return <SignInPage signInHandler={this.signInHandler}/>
        } else {
            return (
                <Fragment>
                    <MyNavBar/>
                    <FriendList friends={this.state.friends}/>
                    <Button waves='light'>
                        <Icon>thumb_up</Icon>
                    </Button>
                    <p className="App-intro">{this.state.response}</p>
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
}

export default App;
