import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      allCourses: [
        {
          courseId: "cpr", courseTitle: "First Aid and CPR", courseType: "Healthcare",
          price: 100
        },
        {
          courseId: "derivatives", courseTitle: "Basics of Derivatives", courseType: "Finance",
          price: 200
        },
        {
          courseId: "speak-english", courseTitle: "Speak English", courseType: "Soft Skills",
          price: 300
        },
        {
          courseId: "test", courseTitle: "Derivatives Test", courseType: "Finance", price: 400
        },
        {
          courseId: "test2", courseTitle: "English 2", courseType: "Soft Skills", price: 200
        },
      ],
      filteredObjects: [
        {
          courseId: "cpr", courseTitle: "First Aid and CPR", courseType: "Healthcare",
          price: 100
        },
        {
          courseId: "derivatives", courseTitle: "Basics of Derivatives", courseType: "Finance",
          price: 200
        },
        {
          courseId: "speak-english", courseTitle: "Speak English", courseType: "Soft Skills",
          price: 300
        },
        {
          courseId: "test", courseTitle: "Derivatives Test", courseType: "Finance", price: 400
        },
        {
          courseId: "test2", courseTitle: "English 2", courseType: "Soft Skills", price: 200
        },
      ],
      original: ["First Aid and CPR", "Basics of Derivatives", "Speak English", "Derivatives Test"],
      filtered: ["First Aid and CPR", "Basics of Derivatives", "Speak English", "Derivatives Test"],
      currentCourseType: "",
      anchorEl: null,
      anchorEl1: null,
    }
  }

  filterByCourseType = (name, data) => {
    let result = data.filter(x => x.courseType.includes(name)) || []
    return result
  };

  filterByPriceLessThan = (name, data) => {
    let result = data.filter( x => x.price < (name)) || []
    return result
  };


  filterByPriceGreaterThan = (name, data) => {
    let result = data.filter(x => x.price > (name)) || []
    return result
  };

  filterLowPrices = () => {
    this.setState({
      filteredObjects: this.filterByPriceLessThan(250, this.state.filteredObjects)
    })
  };

  filterHighPrices = () => {
    this.setState({
      filteredObjects: this.filterByPriceGreaterThan(250, this.state.filteredObjects)
    })
  };

  filterCoursesFinance = () => {
    this.setState({
      filteredObjects: this.filterByCourseType("Finance", this.state.filteredObjects)
    })
  };

  filterCoursesSS = () => {
    this.setState({
      filteredObjects: this.filterByCourseType("Soft Skills", this.state.filteredObjects)
    })
  };

  filterCoursesHealth = () => {
    this.setState ({
      filteredObjects: this.filterByCourseType("Healthcare", this.state.filteredObjects)
    })
  };


  handleClick = (event) =>  {
    this.setState({
      anchorEl: event.currentTarget
    })
  };

  handleClickPrice = (event) =>  {
    this.setState({
      anchorEl1: event.currentTarget
    })
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  };

  handleClosePrice = () => {
    this.setState({
      anchorEl1: null
    })
  };

  resetToOriginal = () => {
    this.setState({
      filteredObjects: this.state.allCourses
    })
  };

  render(){


    const {allCourses, filtered, filteredObjects, original, anchorEl, anchorEl1} = this.state

    const listItems = this.state.filtered.map(course => {
      return (
        <li key = {course.courseTitle}> {course} </li>
      )
    });

    const getCourseTitles = this.state.filteredObjects.map(title => {
      return (
        <li key = {title.courseTitle}> {title.courseTitle} </li>
      )
    });

    const menuItems = [
      {
        key: "1",
        caption: "Finance",
        onClick: () => this.filterCoursesFinance
      },
      {
        key:"2",
        caption: "Soft Skills",
        onClick: () => this.filterCoursesSS
      },
      {
        key: "3",
        caption: "Healthcare",
        onClick: () => this.filterCoursesHealth
      }
    ];

    console.log(getCourseTitles);

    console.log("Testing multiple filters")
    console.log(this.state.filteredObjects);

    console.log(this.filterByCourseType("Finance", this.state.allCourses));
    console.log(this.filterByCourseType("Healthcare", this.state.allCourses));
    console.log(this.filterByCourseType("Soft Skills", this.state.allCourses));
    console.log(this.filterByCourseType("Fidjb", this.state.allCourses));

    return (
    <div className="App">

    <div>
    <Button
      aria-controls = "customized-menu"
      aria-haspopup = "true"
      variant = "contained"
      color = "primary"
      onClick = {this.handleClick}
      >
      Filter By Course Type
    </Button>


  <Menu id = "customized-menu"
          anchorEl = {this.state.anchorEl}
          keepMounted
          open = {Boolean(anchorEl)}
          onClose = {this.handleClose}>

        <MenuItem button onClick = {this.filterCoursesFinance}>
            <ListItemText primary = "Finance" />
        </MenuItem>
        <MenuItem button onClick = {this.filterCoursesSS}>
            <ListItemText primary = "Soft Skills" />
        </MenuItem>
        <MenuItem button onClick = {this.filterCoursesHealth}>
            <ListItemText primary = "Healthcare" />
        </MenuItem>
    </Menu>

    <Button  color = "primary"
              variant = "contained"
              onClick = {this.handleClickPrice}
    >
          Filter By Price
    </Button>

    <Menu anchorEl = {this.state.anchorEl1}
          keepMounted
          open = {Boolean(anchorEl1)}
          onClose = {this.handleClosePrice}>
        <MenuItem button onClick = {this.filterLowPrices}>
            <ListItemText primary = "Prices Lower Than 250" />
        </MenuItem>
        <MenuItem button onClick = {this.filterHighPrices}>
            <ListItemText primary = "Price Higher Than 250" />
        </MenuItem>
    </Menu>

    <Button
        color = "secondary"
        variant = "contained"
        onClick = {this.resetToOriginal}>
    Reset Filters
    </Button>


    </div>
      <div>

      <div>
      {/*<Chip variant = "outlined"
            label = "Finance"
            size = "medium"
            onClick = {this.filterCoursesFinance}/>
      <Chip variant = "outlined"
            color = "primary"
            onClick = {this.filterCoursesHealth}
            label = "Healthcare" />
      <Chip variant = "outlined"
            color = "secondary"
            onClick = {this.filterCoursesSS}
            label = "Soft Skills" />
      <Chip variant = "outlined"
            color = "primary"
            onClick = {this.resetToOriginal}
            label = "Reset"/>

      <Chip onClick = {this.filterLowPrices}
            label = "Price less than 250" />

      <Chip onClick = {this.filterHighPrices}
            label = "Price greater than 250" />
            */}
      </div>
      <div>
        {getCourseTitles}
      </div>
      </div>

    </div>
  );
}
}

export default App;
