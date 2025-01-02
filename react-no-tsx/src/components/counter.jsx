import React, { Component } from 'react'

class Counter extends Component {
    componentDidUpdate(prevProps, prevState) {
        console.log('prevProps', prevProps) 
        console.log('prevState', prevState);
        if (prevProps.counter.value !== this.props.counter.value) {
            // then make Aajax call and get new data from the server 
    
        }
    }
    componentWillUnmount() {
        console.log('Counter - Unmount');
    }

    // object that includes any data that this component needs
    state = { 
        value: this.props.counter.value,
        tags: []
        
        // imageUrl: "https://picsum.photos/199"
    }; 

    //instead of adding a constructor, the other method is to turn the
    // handleincrement to an arrow function. then you wont have to write every eventhandler manually
    
    // constructor() {
        //     super();
        //     this.handleIncrement = this.handleIncrement.bind(this);
        //     console.log('Constructor', this);
        // }
        
        
        getBadgeClasses() {
            // styles = {
                //     fontSize: '10px',
                //     fontWeight: 'bold'
                // };
                let classes = "bade m-2 badge-";
                classes += this.props.counter.value === 0 ? "warning" : "primary";
                return classes;
            }
            
            formatCount() {
                const { value } = this.props.counter;
                return value === 0 ? "Zero" : value;
            }
            
            renderTags() {
                if (this.state.tags.length === 0) return <p>There is no tag</p>;
                
                return  <ul>{ this.state.tags.map(tag => <li key={tag}>{ tag }</li>) }</ul>;
            }

//     //try to combine the two renders
// render() {
    //     return <div>
    //         { this.state.tags.length === 0 && 'Please create a new tag!' }
    //         {this.renderTags()}
    //     </div>;
    // };
    
    
    render() { 
        console.log('Counter - Rendered');
        return (
            // how to render a list of item in react with the map and <li> element
            <div>
        <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
         <button onClick={() => this.props.onIncrement(this.props.counter)} className='btn btn-secondary btn-sm'>Increment</button>
         <button onClick={() => this.props.onDelete(this.props.counter.id)} className='btn btn-danger btn-sm m-2'>Delete</button>
         <ul>
             { this.state.tags.map(tag => <li key={tag}>{ tag }</li>) }
         </ul>
        </div>
    );
}
}




export default Counter;