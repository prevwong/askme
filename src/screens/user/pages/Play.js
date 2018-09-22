import React, {Component} from "react";
import { View, FlatList, ScrollView} from "react-native";
import { Button, Text, Content, Body, Container, Card, CardItem, Title, Icon, Left } from "native-base";
import { signOut } from "store/actions/auth";
import {connect} from "react-redux";
import AppHeader from "components/AppHeader";
import QuizItem from "../../../components/QuizItem";
import firebase from "react-native-firebase";
import Winner from "../../../components/Winner";
import HeaderButtons, { HeaderButton, Item as HeaderItem } from 'react-navigation-header-buttons';
import Carousel from 'react-native-snap-carousel';

class Play extends Component {
    state = {
        classrooms: [],
        winner: null
    }
    static navigationOptions = ({ navigation }) => ({
        title: "Start a new game",
        headerStyle: {
            backgroundColor: '#eeer',
        },
    })

    quiz = firebase.firestore().collection(`quiz`).where(`query.participants.${firebase.auth().currentUser.uid}`, '==', true).where('query.type', '==', 'classroom').orderBy("createdAt", "desc");
    componentDidMount(){
        this.quizUnsubscribe = this.quiz.onSnapshot(this.quizUpdate.bind(this));
    }
    quizUpdate(querySnapshot) {
        const quiz = [];
        querySnapshot.forEach(doc => {
            if (doc.exists) {
                quiz.push({
                    id: doc.id,
                    ...doc.data()
                });
            }
        });
        
        const classroomObjects = quiz.reduce((result, item) => {
            const {classroom, ...data} = item;
            console.log("classroom id", classroom.id)
            if ( !result[classroom.id] ) {
                result[classroom.id] = {
                    title: classroom.name,
                    quizzes: []
                }
            }
            result[classroom.id]["quizzes"].push(item);
            return result;
        }, []);

        const classrooms = Object.keys(classroomObjects).reduce((result, classroomId) => {
            const o = classroomObjects[classroomId];
            result.push({
                classroomId,
                ...o
            });
            return result;
        }, []);

        this.setState({
            classrooms
        });
    }
   
    componentWillUnmount(){
        if ( this.quizUnsubscribe ) this.quizUnsubscribe();
    }

    render() {
        const { classrooms} = this.state;
        return (
            <Container>
                <Content style={{backgroundColor:"#eee", padding: 10}}>
                    <QuizItem generalKnowledge = {true} />
                    <FlatList
                        data={classrooms}
                        keyExtractor={(obj, i) => obj.classroomId}
                        renderItem={({item}) => {
                            const { title, classroomId, quizzes } = item;
                            return (
                                <Content style={{paddingTop:20}} key={classroomId} style={{ flex: 1 }}>
                                    <Text style={{marginLeft: 10, paddingVertical: 20}}>{title}</Text>
                                    <Carousel
                                        loop={true}
                                        data={quizzes}
                                        renderItem={({ item, index }) => {
                                            const { id, title, classroom, createdAt, results } = item;
                                            return <QuizItem id={id} full={false} title={title} results={results} createdAt={createdAt} classroom={classroom} {...this.props} />
                                        }}
                                        sliderWidth={400}
                                        itemWidth={200}
                                    />
                                </Content>
                            )
                        }} 
                    />
                </Content>
            </Container>
        )
    }
}


const mapDispatchToProps = {
    dispatchSignOut: () => signOut(),
}

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Play)
