import './app.css';
import { Component } from 'react';


class App extends Component {
  state = {
    error: null,
    message: null,
    results: [],
    search: null,
    loader: null,
  }

  offset = 0;
  limit = 50;

  handleObserver = e => {
    if(this.state.results.length > 0) {
      this.getApi();
    }
  }

  componentDidMount() {
    this.observer = new IntersectionObserver(this.handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    });

    this.observer.observe(document.querySelector('.ends'));
  }

  change = el => {
    this.setState({
      search: el.target.value
    })
  }

  async getApi() {
    try {
      var request = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=Rl3uE3PVH5DQoGUV9BPiC4EZs52g2zc0&offset=${this.offset}&q=${this.state.search}`);
      if(request.ok) {
        var results = await request.json();
        
        this.setState({
          results:  this.state.results.concat(results.data)
        })

        this.offset += this.limit;

      } else {
        throw new Error(`Error ${request.code }`)
      }
    } catch (err) {
      console.log(err)
    }
  }

  submit = e => {
    e.preventDefault();

    this.setState({
      results: []
    })

    this.offset = 0;

    this.getApi();
  }

  render(){
    return (
      <div className="container">
        <h1>Gyphy api</h1>

        <form action="" onSubmit={this.submit}>
          <input type="text" onChange={this.change}/>
          <input type="submit"/>
        </form>

        { this.state.results.length > 0 && this.state.results.map((e, i) => <img key={i} className="photo" src={e.images.downsized.url} alt=""/> )}
        <div className="ends"> { this.state.results.length > 0 && <span>Loading...</span> }</div>
      </div>
    )
  }
}

export default App;
