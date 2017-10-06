import React, { Component } from 'react';
import './App.css';
import TeacherList from './teachers.js';
import { CSSCourses, HTMLCourses, JSCourses } from './courses.js';
class Home extends Component {
	render() {
		return (
			<div className="main-content home">
				<h2>Front End Course Directory</h2>
				<p>This fun directory is a project for the <em>React Router Basics</em> course on Treehouse.</p>
				<p>Learn front end web development and much more! This simple directory app offers a preview of our course
					library. Choose from many hours of content, from HTML to CSS to JavaScript. Learn to code and get the
					skills you need to launch a new career in front end web development.</p>
				<p>We have thousands of videos created by expert teachers on web design and front end development. Our
					library is continually refreshed with the latest on web technology so you will never fall behind.</p>
				<hr />
			</div>
		);
	}
}
class About extends Component {
	render() {
		return (
			<div className="main-content about">
				<h2>About</h2>
				<p>The front end course directory lists many of the courses we teach on HTML, CSS, JavaScript and more! Be sure to
					visit the Teachers section to view a list of our talented teachers. Or visit the Courses section and select a
					topic -- HTML, CSS, or JavaScript -- to see a list of our courses.</p>
			</div>
		);
	}
}
class Teachers extends Component {
	render() {
		return (
			<div className="main-content">
				<h2>Teachers</h2>
				<ul className="group">
					{
						TeacherList.map((item, index) => {
							return (
								<li className="teacher" key={index}>
									<img className="teacher-img" src={item.img_src} alt="teacher" />
									<h3>{item.name}</h3>
									<p>{item.bio}</p>
								</li>
							)
						})
					}
				</ul>
			</div>
		)
	}
}
class Courses extends Component {
	render() {
		const { route } = this.props;
		let CurrentList = null;
		switch (route) {
			case 'css':
				CurrentList = ['How to Make a CSS', 'HTML CSS'].map((item, index) => {
					return (
						CSSCourses.map((item, index) => {
							return (
								<li className="course media group" key={index}>
									<img className="course-img" src={item.img_src} alt="course" />
									<div>
										<h3>{item.title}</h3>
										<p>{item.description}</p>
									</div>
								</li>
							)
						})
					)
				});
				break;
			case 'javascript':
				CurrentList = ['How to Make a JS', 'HTML JS'].map((item, index) => {
					return (
						JSCourses.map((item, index) => {
							return (
								<li className="course media group" key={index}>
									<img className="course-img" src={item.img_src} alt="course" />
									<div>
										<h3>{item.title}</h3>
										<p>{item.description}</p>
									</div>
								</li>
							)
						})
					)
				});
				break;
			default: //'html'
				CurrentList = ['How to Make a Website', 'HTML Forms'].map((item, index) => {
					return (
						HTMLCourses.map((item, index) => {
							return (
								<li className="course media group" key={index}>
									<img className="course-img" src={item.img_src} alt="course" />
									<div>
										<h3>{item.title}</h3>
										<p>{item.description}</p>
									</div>
								</li>
							)
						})
					)
				});
				break;
		}
		return (
			<div className="main-content courses">
				<div className="course-header group">
					<h2>COURSES</h2>
					<ul className="course-nav">
						<li><a href='#/courses/html' >HTML</a></li>
						<li><a href='#/courses/css'>CSS</a></li>
						<li><a aria-current="false" href='#/courses/javascript'>JavaScript</a></li>
					</ul>
				</div>
				<div>
					<ul>
						{CurrentList}
					</ul>
				</div>
				{/* Write routes here... */}
			</div>
		);
	}
}

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			route: window.location.hash.substr(1)
		};
	}
	componentDidMount() {
		window.addEventListener('hashchange', () => {
			console.log(window.location.hash.substr(1));
			this.setState({
				route: window.location.hash.substr(1)
			});
		});
	}
	render() {
		let Child;
		let propsForCourses = null;
		switch (this.state.route) {
			case '/about':
				Child = About;
				break;
			case '/teachers':
				Child = Teachers;
				break;
			case '/courses':
				Child = Courses;
				break;
			case '/courses/html':
				Child = Courses;
				propsForCourses = 'html';
				break;
			case '/courses/css':
				Child = Courses;
				propsForCourses = 'css';
				break;
			case '/courses/javascript':
				Child = Courses;
				propsForCourses = 'javascript';
				break;
			default:
				Child = Home;
		}
		return (
			<div data-reactor className="container">
				<header>
					<span className="icn-logo">
						<i className="material-icons">code</i>
					</span>
					<ul className="main-nav">
						<li ><a aria-current="false" href="/">Home</a></li>
						<li ><a aria-current="false" href="#/about">About</a></li>
						<li ><a aria-current="false" href="#/teachers">Teachers</a></li>
						<li ><a aria-current="false" href="#/courses">Courses</a></li>
					</ul>
				</header>{' '}
				{
					propsForCourses ?
						<Child route={propsForCourses} />
						:
						<Child />
				}
			</div>
		);
	}
}
export default App;
