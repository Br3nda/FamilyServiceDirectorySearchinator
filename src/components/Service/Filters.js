import React from 'react';
import '../../styles/Form.css';
import { Route } from 'react-router-dom';

class Filters extends React.Component {

  constructor() {
    super();

    this.categoryChange = this.categoryChange.bind(this);
  }


  componentDidMount(){
    if(this.props.searchVars.category){
      this.categoryChange(this.props.searchVars.category);
    }
  }


  handleChange(event) {
    this.categoryChange(this.props.searchVars.category === event.target.value ? '' : event.target.value);
  }

  categoryChange(category){
    const clone = {...this.props.searchVars};
    clone.category = category;
    this.props.loadResults(clone);
  }

  render(){
    return (
      <div className={'filters'+(this.props.filters.length === 0 ? ' loading' : '') }>
        <nav className="nav">
          {this.props.filters.map((data,index) => {
            return (<Route key={index} render={({ history}) => (
              <button className={this.props.searchVars.category === data.name ? 'selected'  : ''} key={data.num}
                onClick={()=> {
                  history.push((this.props.searchVars.category === data.name ? '' : '/category/'+encodeURIComponent(data.name)));
                  this.categoryChange((this.props.searchVars.category === data.name ? '' : data.name));
                }}>{data.name}</button>)} />
            );
          })}
        </nav>
        <Route render={({history}) => (
          <select value={this.props.searchVars.category} onChange={(event)=> {
            history.push(((this.props.searchVars.category === event.target.value || event.target.value === '') ? '' : '/category/'+encodeURIComponent(event.target.value)));
            this.categoryChange(this.props.searchVars.category === event.target.value ? '' : event.target.value);
          }}>
            <option name="filters" value="" defaultValue>-- Select Category --</option>
            {this.props.filters.map(data => {
              return (<option key={data.num} name="filters">{data.name}</option>);
            })}</select>)} />
      </div>
    );
  }
}

export default Filters;
