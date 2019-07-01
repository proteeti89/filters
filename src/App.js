import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

/*import Chip from '@material-ui/core/Chip';*/
import { DropdownMenu, MenuItem } from 'react-bootstrap-dropdown-menu';
import Grow from '@material-ui/core/Grow';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/core/styles';

const defaultSearchStyles = theme => ({
  main: {
    display: 'flex',
    flex: '1 0 auto',
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    marginTop: '10px',
    marginRight: '8px',
  },
  searchText: {
    flex: '0.8 0',
  },
  clearIcon: {
    '&:hover': {
      color: theme.palette.error.main,
    },
  },
});

class App extends Component {

  state = {
    allCourses: [
      {
        courseId: "cpr", courseTitle: "First Aid and CPR", courseType: "Healthcare"
      },
      {
        courseId: "derivatives", courseTitle: "Basics of Derivatives", courseType: "Finance"
      },
      {
        courseId: "speak-english", courseTitle: "Speak English", courseType: "Soft Skills"
      },
      {
        courseId: "test", courseTitle: "Derivatives Test", courseType: "Finance"
      },
    ],
    filtered: ["First Aid and CPR", "Basics of Derivatives", "Speak English", "Derivatives Test"],
    currentCourseType: "",
  }

  filterByCourseType = (name, data) => {
    let result = data.filter(x => x.courseType.includes(name)) || []
    if (result.length) {
      result = Array.from(result.reduce((r, {courseTitle}) => r.add(courseTitle), new Set()))
    }
    return result
  };

  filterCoursesFinance = () => {
    this.setState({
      filtered: this.filterByCourseType("Finance", this.state.allCourses)
    })
  };

  filterCoursesSS = () => {
    this.setState({
      filtered: this.filterByCourseType("Soft Skills", this.state.allCourses)
    })
  };

  filterCoursesHealth = () => {
    this.setState ({
      filtered: this.filterByCourseType("Healthcare", this.state.allCourses)
    })
  };


  render(){
    const { classes, options, onHide, searchText } = this.props;

    const {allCourses, filtered} = this.state

    const listItems = this.state.filtered.map(course => {
      return (
        <li key = {course.courseTitle}> {course} </li>
      )
    });

    const courses = [
      {
        courseId: "cpr", courseTitle: "First Aid and CPR", courseType: "Healthcare"
      },
      {
        courseId: "derivatives", courseTitle: "Basics of Derivatives", courseType: "Finance"
      },
      {
        courseId: "speak-english", courseTitle: "Speak English", courseType: "Soft Skills"
      },
      {
        courseId: "test", courseTitle: "Derivatives Test", courseType: "Finance"
      },
    ];

    const courseValues = [];
    for (let i = 0; i < courses.length; i++){
      courseValues[i] = Object.values(courses[i]);
    }

    const final = [];
    for (let j = 0; j < courseValues.length; j++){
      final[j] = courseValues[j].slice(1);
    }


    console.log(this.filterByCourseType("Finance", this.state.allCourses));
    console.log(this.filterByCourseType("Healthcare", this.state.allCourses));
    console.log(this.filterByCourseType("Soft Skills", this.state.allCourses));
    console.log(this.filterByCourseType("Fidjb", this.state.allCourses));

    return (
    <div className="App">

      <DropdownMenu triggerType = "text" trigger = "Filter by Course Type">
        <MenuItem text = "Finance" onClick = {this.filterCoursesFinance} />
        <MenuItem text = "Healthcare" onClick = {this.filterCoursesHealth} />
        <MenuItem text = "Soft Skills" onClick = {this.filterCoursesSS} />
      </DropdownMenu>
  
      <div>

        {listItems}

      </div>

    </div>
  );
}
}

export default withStyles(defaultSearchStyles)(App);
