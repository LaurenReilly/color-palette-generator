const {Component} = React;

class Colors extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            colors: [
                {
                    color: "rgb(200,200,200)",
                    isLocked: false
                },
                {
                    color: "rgb(200,200,200)",
                    isLocked: false
                },
                {
                    color: "rgb(200,200,200)",
                    isLocked: false
                },
                {
                    color: "rgb(200,200,200)",
                    isLocked: false
                },
                {
                    color: "rgb(200,200,200)",
                    isLocked: false
                }
            ]
        }
    }
    //generate one random color
    randomColor() {
        return Math.floor(Math.random() * 256);   
    }
    //generate five colors (base them all of of one initial color?)
    generateColors() {
        let r = this.randomColor();
            this.setState({
            colors: this.state.colors.map((color, i) => {
                if (color.isLocked === true) {
                    return color
                } else {
                let g = this.randomColor();
                let b = this.randomColor();
                let newColor = "rgb("+r+","+g+","+b+")";
                return {...color, color: newColor}
                }
            })
        })
    }
    //toggle isLocked on each individual color
    lockColor(index) {
        this.setState({
            colors: this.state.colors.map((color, i) => {
                if(i === index) {
                    return {...color, isLocked : !color.isLocked}

                } else {
                    return color
                }
            })
        })
    }
    //randomize individual color, if it is locked do not change it
    randomize(index) {
        let r = this.randomColor();
        let g = this.randomColor();
        let b = this.randomColor();
        let newColor = "rgb("+r+","+g+","+b+")";
            this.setState({
            colors: this.state.colors.map((color, i) => {
                if(i === index && color.isLocked === false) {
                    return{...color, color: newColor }
                } else {
                    return color;
                }
            })
        })
    }
    //change individual color channels using sliders for r, g, and b
    slider(index) {
        console.log("inside slider fn");
        let colorValue = event.target.value;
        let colorId = event.target.id;
        this.setState({
            colors: this.state.colors.map((color, i) => {
                let string = color.color;
                let p1 = string.indexOf("("); 
                let c1 = string.indexOf(",");
                let c2 = string.lastIndexOf(",")
                let p2 = string.lastIndexOf(")")
                let r = string.slice((p1 +1),c1);
                let g = string.slice((c1 +1),c2);
                let b = string.slice((c2 +1),p2);
                if(i === index && color.isLocked === false) {
                    if (colorId === "redRange") {
                        r = colorValue;
                        let newColor = "rgb("+r+","+g+","+b+")";
                        return {...color, color: newColor }
                    } else if (colorId === "greenRange") {
                        g = colorValue;
                        let newColor = "rgb("+r+","+g+","+b+")";
                        return {...color, color: newColor }   
                    } else if (colorId === "blueRange") {
                        b = colorValue;
                        let newColor = "rgb("+r+","+g+","+b+")";
                        return {...color, color: newColor}
                    }
                } else {
                    return color;
                }
            })
        });
    }
    render() {
        return (
            <div className="mt-3 d-flex flex-column">
                <div className="d-flex">
                   {this.state.colors.map((color, index) => {
                       return <ColorBlock 
                                key={index} 
                                index={index} 
                                color={color.color} 
                                randomize={() => this.randomize(index)} 
                                lockColor={() => this.lockColor(index)} 
                                isLocked={color.isLocked}
                                slider={() => this.slider(index)}/>
                   })}
                </div>
                <button style={{width:"10em"}} 
                        className="btn-lg btn-success m-auto" 
                        onClick={() => {this.generateColors()}}>Generate Colors</button>
                <div className="text-center mt-3">
                    <div className="m-auto d-flex flex-column justify-content-center rounded" 
                         style={{backgroundColor:this.state.colors[0].color, width:"60%", height:"6em", boxShadow: "5px 5px 2px rgb(64,64,64)"}}>
                        <h2 className="text-center" 
                            style={{color: this.state.colors[1].color, textShadow:"2px 2px 2px white", fontSize:"4em"}}>Example</h2>
                    </div>
                    <div className="text-center m-auto rounded" 
                        style={{backgroundColor: this.state.colors[2].color, width:"60%", height:"14em", boxShadow: "5px 5px 2px rgb(64,64,64)"}}>
                        <p className="mt-3 p-4" 
                            style={{color: this.state.colors[3].color, fontSize:"1.2em"}}>You've got it figured out. Aesthetic color schemes are a thing of the past.<br/> Why show them something "beautiful" when you can show them something...</p>
                        <h3 className="text-center" 
                            style={{color: this.state.colors[4].color, fontSize:"4em", textShadow:"2px 2px 2px white", fontFamily: "'Monoton', cursive"}}>REVOLUTIONARY</h3>
                    </div>
                </div>
            </div>
        )
    }
}

let ColorBlock = (props) => {
        return (
            <div style={{backgroundColor: props.color, width:"20%", height:"20em", boxShadow: "5px 5px 2px rgb(64,64,64)"}} className="rounded mx-1 mb-3 d-flex flex-column align-content-between">
                <h3 className="text-center mt-5" style={{color:"white"}}>{props.color}</h3>
                {props.isLocked ? <i className="mb-1 fa fa-lock text-center fa-2x" onClick={() => props.lockColor()}></i> : <i className="mb-1 fa fa-unlock-alt text-center fa-2x" onClick={() => props.lockColor()}></i>}
                <button className="btn rounded btn-large mt-1 mb-5 btn-primary" onClick={() => props.randomize()}>Randomize</button>
                <div className="m-auto" style={{width: "80%"}}>
                    <label htmlFor="redRange" style={{float:"left", color:"white"}}>Red </label>
                    <input style={{float:"right"}} type="range" min="0" max="255" id="redRange" onChange={(event) => props.slider()}/>
                </div>
                <div className="m-auto" style={{width: "80%"}}>
                    <label htmlFor="greenRange" style={{float:"left", color:"white"}}>Green </label>
                    <input style={{float:"right"}} type="range" min="0" max="255" id="greenRange" onChange={(event) => props.slider()}/>
                </div>
                <div className="m-auto" style={{width: "80%"}}>
                    <label htmlFor="blueRange" style={{float:"left", color:"white"}}>Blue </label>
                    <input style={{float:"right"}} type="range" min="0" max="255" id="blueRange" onChange={(event) => props.slider()}/>
                </div>
            </div>
        )
}



ReactDOM.render(<Colors/>, document.getElementById('root'))