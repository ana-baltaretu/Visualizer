import React from 'react';
import '../css/App.css';
import '../css/Search-bar.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {
          link: '/board',
          title: 'Matrix',
        }, 
        {
          link: '/stack',
          title: 'Stack',
        },
        {
          link: '/graph',
          title: 'Graph',
        },
        ]};
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <div className="container">
              <section className="section">
                            <List items={this.state.list} delete={this.removeItem} />
              </section>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filtered: []
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    componentDidMount() {
    this.setState({
      filtered: this.props.items
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    });
  }
    
    handleChange(e) {
    let currentList = []; // Variable to hold the original version of the list
    let newList = []; // Variable to hold the filtered list before putting into state

    if (e.target.value !== "") { // If the search bar isn't empty
      currentList = this.props.items; // Assign the original list to currentList
      newList = currentList.filter(item => {  // Use .filter() to determine which items should be displayed, based on the search terms
        const lc = item.title.toLowerCase(); // change current item to lowercase
        const filter = e.target.value.toLowerCase(); // change search term to lowercase
        return lc.includes(filter); // check to see if the current list item includes the search term
      });
    } else { // If the search bar is empty, set newList to original task list
      newList = this.props.items; 
    }
        
    this.setState({ // Set the filtered state based on what our rules added to newList
      filtered: newList
    });
  }
    
    render() {
        return (
          <div>
            <form action="" className="search-bar">
              <input type="text" name="search" autoComplete="off" onChange={this.handleChange} placeholder="Search..."/>
              <button className="search-btn" disabled>
                <span>Search</span>
              </button>
            </form>
            {/* <input type="text" className="input" name="search" onChange={this.handleChange} placeholder="Search..." /> */}
              <ul>
                  {this.state.filtered.map(item => (
                    < a href={item.link} className="active" key={item.title}> 
                      <button className = "button">{item.title} &nbsp;</button>
                    </a>
                  ))}
            </ul>
          </div>
        )
    }
}
export default App;
