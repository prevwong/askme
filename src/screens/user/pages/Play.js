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
import { capitalize } from "utils";

class Play extends Component {
    state = {
        classrooms: [],
        winner: null,
        categories: []
    }
    static navigationOptions = ({ navigation }) => ({
        title: "Start a new game",
        headerStyle: {
            backgroundColor: '#eeer',
        },
    })

    // quiz = firebase.firestore().collection(`quiz`).where(`query.participants.${firebase.auth().currentUser.uid}`, '==', true).where('query.type', '==', 'classroom').orderBy("createdAt", "desc");
    componentDidMount(){
        // this.quizUnsubscribe = this.quiz.onSnapshot(this.quizUpdate.bind(this));
        this.getCategories();
    }
    getCategories() {
        let categories = {
            "science": 18,
            "sports" : 21,
            "art" : 25,
            "animals": 27,
            "geography": 22
        };

        const format = Object.keys(categories).reduce((result, category) => {
            result.push({
                id: categories[category],
                title: capitalize(category),
                results: false
            });
            return result;
        }, [])
        console.log("format", format);
        this.setState({
            categories: format
        })
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
        const { classrooms, categories } = this.state;
        console.log("categories", categories)
        return (
            <Container>
                <Content style={{ backgroundColor: "#eee", padding: 10 }} contentContainerStyle={{ justifyContent:"center", flex: 1 }}>
                    <QuizItem generalKnowledge = {true} {...this.props} />
                    <Content style={{ paddingTop: 20 }} style={{ flex: 1 }}>
                        <Text style={{ marginLeft: 10, paddingVertical: 20 }}>Categories</Text>
                        <Carousel
                            loop={true}
                            data={categories}
                            renderItem={({ item, index }) => {
                                const { id, title, results } = item;
                                return <QuizItem id={id} full={false} title={title} results={results} category={id} {...this.props} />
                            }}
                            sliderWidth={400}
                            itemWidth={200}
                        />
                    </Content>
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
