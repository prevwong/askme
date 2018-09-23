import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Form, Item, Input, Title, Text, Body, Container, Content} from "native-base";
import { connect } from 'react-redux'
import Selection from '../../../../components/Selection'
import FillInTheBlank from '../../../../components/FileInTheBlank'
import questions from "../../../../api/routes/questions"

const TIME = 15
const WARNING_TIME = 3
class Question extends Component {
    constructor() {
        super()
        this.submitAnswer  = this.submitAnswer.bind(this)
        this.state = {
            questions: [
            ],
            currentQuestion: 0,
            timer: TIME,
            gameStart: false,
            userAnswers: [],
        }
    }
    submitAnswer(ans) {
        const cur = this.state.currentQuestion
        const problem = this.state.questions[cur]
        let answer
        let choice

        if (problem.type == "mcq"){
            answer = problem.choices[problem.correct]
            choice = problem.choices[ans]
        } else {
            answer = problem.correct
            choice = ans
        }
        if (ans == null) {
            choice = "None"
        }
        this.setState({
            userAnswers: [...this.state.userAnswers, {
                question: problem.title,
                answer,
                choice,
            }]
        })
        // console.log(this.state.userAnswers)
        if (this.state.currentQuestion != 9){
            this.setState({
                currentQuestion: this.state.currentQuestion + 1
            })
            // console.log("Adding question")
            // console.log(this.state.currentQuestion)
        } else {
            alert("You have finished the quiz!")
            clearInterval(this.currentTimer)
            this.redirectToResult()
        }
        this.setState({
            timer: TIME
        })

    }
    redirectToResult() {
        this.props.navigation.navigate("QuizResult", {
            result: this.state.userAnswers
        })
    }
    decreaseTimer() {
        // console.log(this.state.timer)
        if (this.state.timer == 0) {
            this.submitAnswer(null)
        }
        this.setState({
            timer: this.state.timer - 1
        })
    }

    componentDidMount() {
        questions.getQuestions().then(questions => {
            let tempQuestions = []
            questions.forEach(question => {
                tempQuestions.push(question.data())
            })
            this.setState({
                questions: tempQuestions,
                gameStart: true,
            })
            // console.log(this.state)
            this.currentTimer = setInterval(() => {
                this.decreaseTimer()
                // alert("Decreased timer")
            }, 1000)
        }).catch(err => {
            alert(err)
        })  
    }

    componentWillUnmount() {
        clearInterval(this.currentTimer)
    }

    renderGame() {
        const cur = this.state.currentQuestion
        const problem = this.state.questions[cur]
        const question = problem.title
        const timerColor = this.state.timer <= WARNING_TIME? "red" : "green"
        let selection = {}
        if (problem.type == "mcq") {
            selection = problem.choices
        }
        const styles = StyleSheet.create({
            timer: {
                borderRadius: 50,
                width: 80,
                height: 80,
            },
            red: {
                borderColor: 'red',
                borderWidth: 2,
            },
            green: {
                borderColor: 'green',
                borderWidth: 2,
            },
            timerText: {
                textAlign: 'center',
                paddingTop: 20,
                fontSize: 30,
            },
            question: {
                marginTop: 20,
            },
            inputBox: {
                alignSelf: "stretch",
            },

        })
        const timerStyle = [styles.timer, styles[timerColor]]
        return (
            
            <Container>
                <Content contentContainerStyle={{ flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                    <View style={timerStyle}><Text style={styles.timerText}>{ this.state.timer }</Text></View>
                    <View style={styles.question}><Text>{ question }</Text></View>
                    
                        {
                            problem.type == "mcq" ? <Selection selection={selection} onclick={this.submitAnswer}></Selection> : 
                            <FillInTheBlank submit={this.submitAnswer}></FillInTheBlank>
                        }   
                    
                </Content>
            </Container>
        );
    }

    renderEmpty() {
        return (
            <Container>
                <Content contentContainerStyle={{ flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
                    <View><Text>Fetching questions</Text></View>
                </Content>
            </Container>
        )
    }



    render() {

        return this.state.gameStart? this.renderGame() : this.renderEmpty()
        // const {email, password} = this.state;
        // alert(this.state.questions)
        
        
    }
}


const mapDispatchToProps = {
    // dispatchAuthenticate: (email, password) => authenticate(email, password),
    // dispatchSocialAuthenticate: (email, password) => socialAuthenticate(email, password),
    // dispatchLogInCancel: () => {
    //     return ((dispatch) => {
    //         dispatch(logInCancel())
    //     });
    // },
    // dispatchLogInSuccess: () => {
    //     return ((dispatch) => {
    //         dispatch(logInSuccess());
    //     })
    // }
}

const mapStateToProps = state => ({
    // auth: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Question)
