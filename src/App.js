import React from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
    state = {
        quote: "",
        author: ""
    }

    componentDidMount() {
        this.fetchAdvice();
        this.getRandomColor()
        
    }

    getRandomColor() {
        const red = Math.floor(Math.random() * 128);
        const green = Math.floor(Math.random() * 128);
        const blue = Math.floor(Math.random() * 128);

        return `rgba(${red}, ${green}, ${blue}, 0.5)`
    }

    fetchAdvice = () => {
        axios.get(
            "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        ).then((response) => {
            const {quote, author} = response.data.quotes[Math.floor(Math.random() * 102)]
            console.log(quote)
            this.setState({
                quote,
                author
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    
    render() {
        const quote = this.state.quote;
        const author = this.state.author;
        const randomColor = this.getRandomColor();
        const transition = "all 1s";

        return (
            <div className="App" style={{backgroundColor: randomColor, transition}}>
                <div id="quote-box">
                    <h1 id="text" style={{color: randomColor, transition}}>
                        <FontAwesomeIcon icon={faQuoteLeft} size="1x" />
                        {quote}
                        <FontAwesomeIcon icon={faQuoteRight} size="1x" />
                    </h1>
                    <div className="author-container">
                        <h3 id="author" style={{color: randomColor, transition}}>- {author}</h3>
                    </div>
                    <div className="buttons">
                        <a id="tweet-quote" 
                            target="_blank" 
                            href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote}`}
                            style={{backgroundColor: randomColor, transition}}
                            >
                            <FontAwesomeIcon icon={faTwitter} size="2x" opacity="0.6" />
                        </a>
                        <button id="new-quote" onClick={this.fetchAdvice} style={{backgroundColor: randomColor}}>NEW QUOTE</button>
                    </div>
                </div>
            
            </div>
    
        )
    }
}

export default App;