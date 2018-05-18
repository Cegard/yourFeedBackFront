import React,{Component} from 'react'
import axios from 'axios';
import {Table } from 'semantic-ui-react'
import { template } from 'handlebars';
import {Bar} from 'react-chartjs-2';



class ReporEvent extends Component{

    constructor(props){
        super(props)
        this.state={
            evaluatedUser:"",
            event:"",
            userApp:"",
            headersAnswer:["#","Question","Average","Percentage"],
            headersGroup:["#","Group","Average","Percentage"],
            headersGroupComments:["#","Comments"],
            groups:[],
            firstTable:[0],
            groupAverege:[],
            commentsEvaluation:[],
            
        }
    }

    getUserEventId() {
        axios.get(`http://localhost:9090/getEvaluatedUserById/${this.props.match.params.id}`)
          .then(res => {
            this.setState({ evaluatedUser :  res.data }); 
            this.setState({ event :  res.data.event }); 
            this.setState({ userApp :  res.data.userApp }); 
            this.getGroup();
            
        })
    }

    async getGroup() { 
        console.log(this.state.event.id)
        const newGroups = [];
        await axios.get(`http://localhost:9090/getQuestionsGroups/${this.state.event.id}`)
          .then(res => {
            res.data.map((item, index) => {
                const group =
                    {
                        id: item.id,
                        name: item.name,
                        description: item.description,
                        questions: [],
                        comments:[],
                    };
                this.getQuestion(item.id, index);
                this.getComments(item.id, index);
                newGroups.push(group);
                
            });

        })
        console.log('AAA', newGroups);
        this.setState({ groups : newGroups }); 
        this.getGroupAverege();
        this.getCommentsEvaluation();
        
    }

    async getQuestion(id, index) {
        console.log('getQuestion', id, index);
        let questions = [];
        await axios.get(`http://localhost:9090/getAverageForQuestion?idEvent=${this.state.event.id}&idUser=${this.state.userApp.id}&idGroup=${id}`)
            .then(res => {
                questions = res.data;
        });
        console.log("acacaxdcas",questions);
        const newGroups = this.state.groups;
        newGroups[index].questions = questions;
        this.setState({ groups : newGroups }); 
    }

    async getComments(id, index) {
        console.log('getQuestion', id, index);
        let comments = [];
        await axios.get(`http://localhost:9090/getGroupCommentByGroupAppIdAndEvaluatedUser?idGroupApp=${id}&idEvaluatedUser=${this.state.evaluatedUser.id}`)
            .then(res => {
                comments = res.data;
        });
        console.log("comments",comments);
        const newGroups = this.state.groups;
        newGroups[index].comments = comments;
        this.setState({ groups : newGroups }); 
    }

    async getCommentsEvaluation() {
        await axios.get(`http://localhost:9090/getEvaluationsByEvaluatedUser?idEvaluatedUser=${this.state.evaluatedUser.id}`)
            .then(res => {
                 this.setState({ commentsEvaluation : res.data }); 
        });

    }

    async getGroupAverege() {
        await axios.get(`http://localhost:9090/getScore?idEvent=${this.state.event.id}&idUser=${this.state.userApp.id}`)
            .then(res => {
                 this.setState({ groupAverege : res.data }); 
        });

    }

    componentDidMount(){
        this.getUserEventId();
    }

    transform(num){
        return Math.round(num*100)/100
    }

    convertPercentage(num){
        return this.transform((num*100)/4)
    }

    colorBackGround(num){
        if (num <= 1){
            return "#ffe0e6"
        }else if(num <= 2){
            return "#ffecd9"
        }else{
            return "#dbf2f2"            
        }
    }

    colorBorder(num){
        if (num <= 1){
            return "#ffbbbb"
        }else if(num <= 2){
            return "#f9d8b6"
        }else{
            return "#d1efef"            
        }
    }

    render(){
        const  colspanheader= this.state.headersAnswer.length
        
        const headersAnswer = this.state.headersAnswer.map((header, index) => 
            <Table.HeaderCell key = {header}>{header}</Table.HeaderCell> 
        );
        const headersGroup = this.state.headersGroup.map((header, index) => 
            <Table.HeaderCell key = {header}>{header}</Table.HeaderCell> 
        );
        const headersGroupComments = this.state.headersGroupComments.map((header, index) => 
            <Table.HeaderCell key = {header}>{header}</Table.HeaderCell> 
        );
        

          const optionChar = {
            maintainAspectRatio: false,
            scales:{
                yAxes: [{
                    display: true,
                    ticks: {
                        beginAtZero: true,
                        max: 100
                    }
                }]
            }
        }
        const tableAnswer = this.state.groups.map( (group,index) =>{
            const dataXQuestions = group.questions.map(value => this.convertPercentage(value[2]))
            const backGroundQuestions = group.questions.map(value => this.colorBackGround(value[2]))
            const borderQuestions = group.questions.map(value => this.colorBorder(value[2]))
            const labelQuestions = group.questions.map((value,index) => index+1)
            const dataQuestions = {
                labels: labelQuestions,
                datasets: [
                {
                    label: `${group.name}`,
                    backgroundColor: backGroundQuestions,
                    borderColor: borderQuestions,
                    borderWidth: 1,
                    hoverBackgroundColor: borderQuestions,
                    hoverBorderColor: borderQuestions,
                    data: dataXQuestions
                }
                ]
            };
            console.log("dataQuestion",dataQuestions)
            return(
            <div key = {`groupAns_${index}`}>
                <Table celled >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan={colspanheader}>{group.name}</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Header>
                            <Table.Row>
                                {headersAnswer}
                            </Table.Row>
                            
                        </Table.Header>
                        
                        {group.questions.map((question,index)=>
                            

                        <Table.Body key={`ques_${index}`}>
                            { question[2] <= 1 ?(
                                <Table.Row negative>
                                    <Table.Cell className="celda1">{index+1}</Table.Cell>                            
                                    <Table.Cell className="celda2">{question[1]}</Table.Cell> 
                                    <Table.Cell className="celda3">{this.transform(question[2])}</Table.Cell>
                                    <Table.Cell className="celda4">{this.transform((question[2]*100)/4)}%</Table.Cell>
                                </Table.Row>
                            ):(
                                question[2] <= 2 ?(
                                    <Table.Row warning>
                                        <Table.Cell className="celda1">{index+1}</Table.Cell>                            
                                        <Table.Cell className="celda2">{question[1]}</Table.Cell> 
                                        <Table.Cell className="celda3">{this.transform(question[2])}</Table.Cell>
                                        <Table.Cell className="celda4">{this.transform((question[2]*100)/4)}%</Table.Cell>
                                    </Table.Row>
                                ):(
                                    <Table.Row positive>
                                        <Table.Cell className="celda1">{index+1}</Table.Cell>                            
                                        <Table.Cell className="celda2">{question[1]}</Table.Cell> 
                                        <Table.Cell className="celda3">{this.transform(question[2])}</Table.Cell>
                                        <Table.Cell className="celda4">{this.transform((question[2]*100)/4)}%</Table.Cell>
                                    </Table.Row>

                                )
                                
                            )}
                        
                        </Table.Body>
                        
                        )}
                        
                    
                    </Table>
                    <div className="chart">
                        <Bar
                            data={dataQuestions}
                            width={100}
                            height={50}
                            options={optionChar}
                        />
                    </div>
                </div>
                )
        }
                
        )

        const tableCommentsGroup = this.state.groups.map( (group,index) =>
            <Table celled key = {`groupAns_${index}`}>
                     <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={2}>{group.name}</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Header>
                        <Table.Row>
                            {headersGroupComments}
                        </Table.Row>
                        
                    </Table.Header>
                    
                    {group.comments.map((comment,index)=>
                        

                    <Table.Body key={`ques_${index}`}>
                            <Table.Row >
                                <Table.Cell className="celda1">{index+1}</Table.Cell>                            
                                <Table.Cell className="celda2">{comment.note}</Table.Cell> 
                            </Table.Row>
                    </Table.Body>
                    
                    )}
                    
                   
                </Table>
           
                
        )

        const groupAveregeTr = this.state.groupAverege.map((group,index) =>
                <Table.Body key={`graverage_${index}`}>
                        { group[3] <= 1 ?(
                            <Table.Row negative>
                                <Table.Cell className="celda1">{index+1}</Table.Cell>                            
                                <Table.Cell className="celda2"><b>{group[1]}</b> : {group[2]}</Table.Cell> 
                                <Table.Cell className="celda3">{this.transform(group[3])}</Table.Cell>
                                <Table.Cell className="celda4">{this.transform((group[3]*100)/4)}%</Table.Cell>
                            </Table.Row>
                        ):(
                            group[3] <= 2 ?(
                                <Table.Row warning>
                                    <Table.Cell className="celda1">{index+1}</Table.Cell>                            
                                    <Table.Cell className="celda2"><b>{group[1]}</b> : {group[2]}</Table.Cell> 
                                    <Table.Cell className="celda3">{this.transform(group[3])}</Table.Cell>
                                    <Table.Cell className="celda4">{this.transform((group[3]*100)/4)}%</Table.Cell>
                                </Table.Row>
                            ):(
                                <Table.Row positive>
                                    <Table.Cell className="celda1">{index+1}</Table.Cell>                            
                                    <Table.Cell className="celda2"><b>{group[1]}</b>: {group[2]}</Table.Cell> 
                                    <Table.Cell className="celda3">{this.transform(group[3])}</Table.Cell>
                                    <Table.Cell className="celda4">{this.transform((group[3]*100)/4)}%</Table.Cell>
                                </Table.Row>

                            )
                            
                        )}
                       
                    </Table.Body>
        )

        const evaluationComments = this.state.commentsEvaluation.map((commentsEvaluation,index) =>
                <Table.Body key={`graverage_${index}`}>
                            <Table.Row >
                                <Table.Cell className="celda1">{index+1}</Table.Cell>                            
                                <Table.Cell className="celda2">{commentsEvaluation.note}</Table.Cell> 
                            </Table.Row>
                    </Table.Body>
        )

        const dataX = this.state.groupAverege.map(value => this.convertPercentage(value[3]))
        const backGround = this.state.groupAverege.map(value => this.colorBackGround(value[3]))
        const border = this.state.groupAverege.map(value => this.colorBorder(value[3]))
        const label = this.state.groupAverege.map(value => value[1])
        const data = {
            labels: label,
            datasets: [
              {
                label: 'Group Result',
                backgroundColor: backGround,
                borderColor: border,
                borderWidth: 1,
                hoverBackgroundColor: border,
                hoverBorderColor: border,
                data: dataX
              }
            ]
          };



        return(
            <div className="center">
                <h1>Answers Result</h1>
                {tableAnswer}
                <h1>Groups Result</h1>
                
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={colspanheader}>Group Result</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Header>
                        <Table.Row>
                            {headersGroup}
                        </Table.Row>
                        
                    </Table.Header>

                    {groupAveregeTr}
                </Table>
                <div className="chart">
                    <Bar
                        data={data}
                        width={100}
                        height={50}
                        options={optionChar}
                    />
                </div>
                
                <h1>Groups Comments</h1>
                {tableCommentsGroup}
                <h1>Evaluations Comments</h1>                
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={2}>Evaluations Comments</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Header>
                        <Table.Row>
                            {headersGroupComments}
                        </Table.Row>
                        
                    </Table.Header>

                    {evaluationComments}
                </Table>
                <br />
                <br />
                <br />
                <br />
                <br />
                </div>
            
                
        );
    }
}

export default ReporEvent
