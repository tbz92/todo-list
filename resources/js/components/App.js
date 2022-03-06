import React from 'react';
import ReactDOM from 'react-dom';
import TodoForm from "./TodoForm";
import "./app.scss";

function App() {
    return (
        <div className="container m-5 p-2 rounded mx-auto bg-light shadow">
            <div className="row m-1 p-4">
                <div className="col">
                    <div className="p-1 h1 text-primary text-center mx-auto display-inline-block">
                        <i className="fa fa-check bg-primary text-white rounded p-2"/>
                        My Todo's
                    </div>
                </div>
            </div>
            <TodoForm/>
        </div>
    );
}

export default App;

if (document.getElementById('root')) {
    ReactDOM.render(<App/>, document.getElementById('root'));
}
