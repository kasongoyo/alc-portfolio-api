class Home extends React.Component {
    state = { data: [], portfolio: { name: '', about: '', reactjs: false, php: false, photoshop: false } }
    componentDidMount() {
        fetch('http://localhost:8080/portfolio')
            .then(response => response.json())
            .then(data => {
                this.setState({ data });
            });
    }

    handleChangeValue = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(state => ({ portfolio: { ...state.portfolio, [name]: value } }));
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        const { portfolio } = this.state;
        const payload = { name: portfolio.name, about: portfolio.about, skills: [] };
        if (portfolio.reactjs) {
            payload.skills.push('reactjs');
        }
        if (portfolio.php) {
            payload.skills.push('php');
        }
        if (portfolio.photoshop) {
            payload.skills.push('photoshop');
        }
        fetch('http://localhost:8080/portfolio', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => response.json())
            .then(result => {
                this.setState(state => ({ data: [...state.data, result] }));
            });
    }

    render() {
        const { data, portfolio } = this.state;
        return (
            <div style={{ width: '70%', padding: '30px', }}>
                {
                    data.map((item, index) => (<div key={index} className="card" style={{ width: '18rem', margin: '10px', display: 'inline-block' }}>
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.about}</p>
                            <p>{item.skills.join(',')}</p>
                        </div>
                    </div>))
                }

                <form onSubmit={this.handleFormSubmit}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control" placeholder="Enter Name" value={portfolio.name} name='name' onChange={this.handleChangeValue} />
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">About</label>
                        <textarea className="form-control" name='about' value={portfolio.about} onChange={this.handleChangeValue} rows="3"></textarea>
                    </div>
                    <fieldset className="form-group">
                        <legend className="col-form-label pt-0">Skills</legend>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name='reactjs' checked={portfolio.reactjs} onChange={this.handleChangeValue} />
                            <label className="form-check-label" for="inlineCheckbox1">ReactJs</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name='php' checked={portfolio.php} onChange={this.handleChangeValue} />
                            <label className="form-check-label" for="inlineCheckbox2">Php</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" name='photoshop' checked={portfolio.photoshop} onChange={this.handleChangeValue} />
                            <label className="form-check-label" for="inlineCheckbox3">Photoshop</label>
                        </div>
                    </fieldset>
                    <div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>

                </form>
            </div>
        );

    }
}
ReactDOM.render(
    <Home />,
    document.getElementById('root')
);