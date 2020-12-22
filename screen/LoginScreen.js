import * as React from 'react';
import {Text,View, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView,
ScrollView, Modal} from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class SignUpLoginScreen extends React.Component {
    constructor(){
        super();
        this.state = {
            emailId: '',
            password: '',
            isModalVisible: false,
            firstName: '',
            lastName: '',
            contatc: '',
            address: '',
            confirmPassword: ''
        }
    }

    login = (emailID,password) =>{
        firebase.auth().signInWithEmailAndPassword(emailID,password)
        .then(()=>{
            return  Alert.alert(
                'Logged In',
                '',
                [
                  {text: 'OK', onPress: () => this.setState({emailId: '', password: ""})},
                ]
            );
        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage);
        })
    }

    userSignUp = (username,password,confirmPassword) =>{
        if(password !== confirmPassword){
            return Alert.alert("The Passwords Don't Match Try Again");
        }
        else {
            firebase.auth().createUserWithEmailAndPassword(username,password)
            .then((response)=>{
                db.collection("Users").add({
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    contact: this.state.contact,
                    address: this.state.address,
                    emailId: this.state.emailId,
                })

                return  Alert.alert(
                    'User Added Successfully',
                    '',
                    [
                      {text: 'OK', onPress: () => this.setState({"isModalVisible" : false})},
                    ]
                );
            })
            .catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage);
            })
        }
    }

    showModal=()=>{
        return(
            <Modal
              animationType="fade"
              transparent={true}
              visible={this.state.isModalVisible}
              >
              <View style={styles.modalContainer}>
                <ScrollView style={{width:'100%'}}>
                  <KeyboardAvoidingView>
                  <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={()=>this.setState({"isModalVisible":false})}
                    >
                    <Text style={styles.cancelButtonText}>X</Text>
                    </TouchableOpacity>
                  <Text style={styles.modalTitle}>Registration</Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder ={"First Name"}
                    maxLength ={8}
                    onChangeText={(text)=>{
                      this.setState({
                        firstName: text
                      })
                    }}
                  />
                  <TextInput
                    style={styles.formTextInput}
                    placeholder ={"Last Name"}
                    maxLength ={8}
                    onChangeText={(text)=>{
                      this.setState({
                        lastName: text
                      })
                    }}
                  />
                  <TextInput
                    style={styles.formTextInput}
                    placeholder ={"Contact"}
                    maxLength ={10}
                    keyboardType={'numeric'}
                    onChangeText={(text)=>{
                      this.setState({
                        contact: text
                      })
                    }}
                  />
                  <TextInput
                    style={styles.formTextInput}
                    placeholder ={"Address"}
                    multiline = {true}
                    onChangeText={(text)=>{
                      this.setState({
                        address: text
                      })
                    }}
                  />
                  <TextInput
                    style={styles.formTextInput}
                    placeholder ={"Email"}
                    keyboardType ={'email-address'}
                    onChangeText={(text)=>{
                      this.setState({
                        emailId: text
                      })
                    }}
                  /><TextInput
                    style={styles.formTextInput}
                    placeholder ={"Password"}
                    secureTextEntry = {true}
                    onChangeText={(text)=>{
                      this.setState({
                        password: text
                      })
                    }}
                  /><TextInput
                    style={styles.formTextInput}
                    placeholder ={"Confrim Password"}
                    secureTextEntry = {true}
                    onChangeText={(text)=>{
                      this.setState({
                        confirmPassword: text
                      })
                    }}
                  />
                  <View>
                    <TouchableOpacity
                      style={styles.registerButton}
                      onPress={()=>{
                        if(this.state.firstName===""){
                              return Alert.alert("Please enter your name!!");
                        }
                        if(this.state.lastName===""){
                            return Alert.alert("Please enter your name!!");
                        } 
                        if(this.state.contact===""){
                            return Alert.alert("Please enter your contact!!");
                        }
                        if(this.state.address===""){
                            return Alert.alert("Please enter your address!!");
                        }
                        if(this.state.confirmPassword===""){
                            return Alert.alert("Please enter all your password!!");
                        }
                        else {
                            this.userSignUp(this.state.emailId, this.state.password, this.state.confirmPassword)
                        }
                      }}
                    >
                    <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>
                  </View>
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            </Modal>
        )
    }

    render(){
        return(
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                {this.showModal()}
                  <Text style={styles.title}>Barter System App</Text>
                <View>
                   <TextInput
                        style={styles.loginBox}
                        placeholder="Email"
                        keyboardType ='email-address'
                        onChangeText={(text)=>{
                        this.setState({
                            emailId: text
                        })
                        }}
                    />

                    <TextInput 
                        style={styles.loginBox}
                        placeholder='Password'
                        secureTextEntry = {true}
                        onChangeText={(text)=>{
                            this.setState({password: text})
                        }}
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            this.login(this.state.emailId,this.state.password);
                            this.setState({emailID: "", password: ""});
                        }}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={()=>{
                            //this.signUp(this.state.emailId,this.state.password);
                            this.setState({emailID: "", password: "", isModalVisible: true});
                        }}
                    >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>
                    <Text style = {{color: '#0000A0', alignSelf: 'center', marginTop: 10}}>No Account</Text>
                    <Text style = {{color: '#0000A0', alignSelf: 'center', marginTop: 1}}>Click Here To Sign In</Text>
                </View>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ADD8E6'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:65,
    marginTop: 30,
    fontWeight:'200',
    paddingBottom:30,
    color : '#0000A0',
    alignSelf: 'center'
  },
  loginBox:{
    width: 300,
    height: 40,
    borderWidth: 1.5,
    borderColor : '#0000A0',
    fontSize: 20,
    margin:10,
    paddingLeft:10,
    alignSelf: 'center'
  },
  button:{
    width:300,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    alignSelf: 'center',
    borderRadius:25,
    backgroundColor:"#0000FF",
    shadowColor: "#000",
    marginTop: 30,
    shadowOffset: {
       width: 0,
       height: 8,
    },
    shadowOpacity: 0.30,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText:{
    color:'#ffff',
    fontWeight:'200',
    fontSize:20
  },
  buttonContainer:{
    flex:1,
    alignItems:'center'
  },
  modalTitle :{
    justifyContent:'center',
    alignSelf:'center',
    fontSize:30,
    color:'#0000A0',
    margin:50
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ffff",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  formTextInput:{
    width:"75%",
    height:45,
    alignSelf:'center',
    borderColor:'#0000FF',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    alignSelf: 'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30,
    marginLeft: 41
  },
  registerButtonText:{
    color:'#0000A0',
    fontSize:15,
    fontWeight:'bold'
  },
  cancelButtonText: {
    color:'black',
    fontSize:25,
    marginRight: 180,
  },
  cancelButton: {
    marginLeft: 10,
    marginTop: 5
  }
 })